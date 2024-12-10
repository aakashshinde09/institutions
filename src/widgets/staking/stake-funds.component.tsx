import { SectionCover } from "@entities/staking";
import { ConnectWalletButton } from "@features/connect-wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  KEYS,
  useGetAverageAprQuery,
  useGetNgoListQuery,
  useGetUserDepositsInfoQuery,
  userController,
} from "@shared/api";
import {
  useApprove,
  useGetEstimatedStakeFundsFee,
  useStakeFunds,
  useStakeStEth,
  useStakeWStEth,
} from "@shared/lib/blockchain";
import { elementIds } from "@shared/lib/enums";
import { TickerEnum } from "@shared/lib/enums/ticker.enum";
import { useGetWalletBalance } from "@shared/lib/hooks";
import { useGetStEthBalance } from "@shared/lib/hooks/use-get-st-eth-balance.hook";
import { useGetWStEthBalance } from "@shared/lib/hooks/use-get-w-st-eth-balance.hook";
import { useAuthStore } from "@shared/lib/stores";
import {
  calculateMonthlyReceive,
  formatNumber,
  waitForTransaction,
} from "@shared/lib/utils";
import { Button } from "@shared/ui/button";
import { FormInput, LabelWithAllButton } from "@shared/ui/input";
import { Tabs } from "@shared/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { Chain, ContractFunctionExecutionErrorType } from "viem";
import { parseEther } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { z } from "zod";

import { StakeInfo } from "./stake-info.component";

interface IStakeFundsProperties {
  onShow?: () => void;
  style?: React.CSSProperties;
}

function getStakeFundsSchema(maxAmount: number) {
  return z.object({
    socialImpactId: z.string(),
    amount: z.coerce.number().positive().max(maxAmount),
    percentage: z.coerce.number().max(100).min(1),
  });
}

type StakingView = TickerEnum;
type FormFields = z.infer<ReturnType<typeof getStakeFundsSchema>>;

export const StakeFunds = ({ onShow, style }: IStakeFundsProperties) => {
  const [isStakePendindg, setIsStakePendindg] = useState(false);
  const [stakingTab, setStakingTab] = useState<StakingView>(TickerEnum.ETH);

  const searchParameters = useSearchParams();
  const ngoQuery = searchParameters?.get("ngo");

  const accountBalance = useGetWalletBalance();
  const stEthBalance = useGetStEthBalance();
  const wStEthBalance = useGetWStEthBalance();

  const { isLoggedIn } = useAuthStore();
  const { data: ngoList } = useGetNgoListQuery();
  const { data: depositInfo } = useGetUserDepositsInfoQuery(isLoggedIn);

  const getBalance = () => {
    if (stakingTab === TickerEnum.ETH) return accountBalance;
    if (stakingTab === TickerEnum.ST_ETH) return stEthBalance;
    return wStEthBalance;
  };

  const { handleSubmit, formState, control, setValue, trigger, reset, watch } =
    useForm<FormFields>({
      resolver: zodResolver(getStakeFundsSchema(getBalance())),
      defaultValues: {
        socialImpactId: process.env.NEXT_PUBLIC_NGO_ADDRESS,
        amount: "" as any,
        percentage: "" as any,
      },
    });

  const selectedNgo = ngoList?.data?.items?.find(
    (item) => item.ngoAddress === process.env.NEXT_PUBLIC_NGO_ADDRESS
  );
  const ngoAddress = process.env.NEXT_PUBLIC_NGO_ADDRESS ?? "";

  // ============ Native ETH ============
  const { stake, isPending: isStakePending } = useStakeFunds(ngoAddress);
  const { estimatedStakeGasUsd } = useGetEstimatedStakeFundsFee(ngoAddress, {
    percentage: watch("percentage") * 100,
    value: parseEther(watch("amount").toString()),
  });

  // ============ stETH ============
  const { approve: approveStEth } = useApprove(
    process.env.NEXT_PUBLIC_LIDO_SC_ADDRESS ?? ""
  );
  const { stakeStEth } = useStakeStEth(ngoAddress);

  // ============ wStEth ============
  const { approve: approveWStEth } = useApprove(
    "0x8d09a4502cc8cf1547ad300e066060d043f6982d"
  );
  // TODO: Add this to env
  const { stakeWStEth } = useStakeWStEth(ngoAddress);

  const { data: averageAprData } = useGetAverageAprQuery();
  const { chain } = useAccount();

  const monthlyReceive = useMemo(() => {
    const percent = watch("percentage");
    const amount = watch("amount");

    let calculated;
    if (averageAprData?.data?.SmaArp)
      calculated = calculateMonthlyReceive(
        amount,
        percent,
        averageAprData?.data?.SmaArp
      );

    return formatNumber(calculated);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("percentage"), watch("amount")]);

  const dailyReceive = useMemo(() => {
    // Average count of days in month
    const daysInMonth = 29.8;
    const percent = watch("percentage");

    return formatNumber((+monthlyReceive / daysInMonth) * (percent / 100));
  }, [monthlyReceive, watch("percentage")]);

  // ============ For backend updating ============

  const queryClient = useQueryClient();
  const publicClient = usePublicClient();

  const awaitForBackendUpdate = (oldBalance: number) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        const { data } =
          await userController.userControllerGeCurrentUserDepositsInformation();

        const { balanceWithoutProfit } = data.data;

        if (oldBalance !== balanceWithoutProfit) {
          resolve();
          return;
        }
        reject();
      } catch (error) {
        console.log(error);
      }
    });

  const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  };

  const checkForBackendUpdate = async () => {
    try {
      const { balanceWithoutProfit } = depositInfo.data;
      await awaitForBackendUpdate(balanceWithoutProfit);
      await queryClient.invalidateQueries({ queryKey: KEYS.DEPOSITS_INFO() });
    } catch {
      await delay(5000);
      await checkForBackendUpdate();
    }
  };

  // ==============================

  const onSubmit = async (data: FormFields) => {
    const percent = data.percentage * 100;

    try {
      let hash: `0x${string}` | undefined;

      if (stakingTab === TickerEnum.ETH) {
        hash = await stake(parseEther(data.amount.toString()), percent);
      } else if (stakingTab === TickerEnum.ST_ETH) {
        setIsStakePendindg(true);
        hash = await approveStEth(
          ngoAddress,
          parseEther(data.amount.toString())
        );

        await waitForTransaction(hash, chain as Chain);

        hash = await stakeStEth(BigInt(data.amount * 10 ** 18), percent);
      } else {
        setIsStakePendindg(true);
        hash = await approveWStEth(
          ngoAddress,
          parseEther(data.amount.toString())
        );

        await waitForTransaction(hash, chain as Chain);

        hash = await stakeWStEth(BigInt(data.amount * 10 ** 18), percent);
      }

      const txToastId = toast.loading("Transaction in progress");
      await publicClient?.waitForTransactionReceipt({ hash });
      toast.success("Transaction completed", { id: txToastId });

      reset();
    } catch (error) {
      console.log(error);

      const STAKE_LIMIT = "STAKE_LIMIT";

      const knownError = error as ContractFunctionExecutionErrorType;
      const errorMessage = knownError.shortMessage;

      const reason = errorMessage?.split(":\n")[1];

      if (reason === STAKE_LIMIT) {
        toast.error("Amount of stake is higher than Stake Limit");
      } else toast.error("Error while staking funds");
    } finally {
      setIsStakePendindg(false);
    }
  };

  // Preselect social impact from query parameter
  useEffect(() => {
    if (ngoList?.data?.items?.length && ngoQuery) {
      const preSelectedNgo = ngoList.data.items.find(
        (item) => item.id === +ngoQuery
      );
      if (preSelectedNgo) {
        setValue("socialImpactId", preSelectedNgo.id.toString());
        trigger("socialImpactId");
      }
    }
  }, [ngoQuery, ngoList, setValue, trigger]);
  return (
    <motion.div
      id="stake-container"
      layout
      transition={{ duration: 0.25 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex rounded-4xl bg-[#ededed] max-md:mt-8 max-md:flex-col max-md:items-center max-md:rounded-3xl max-md:bg-white"
      style={style}
    >
      <SectionCover
        id="stake-cover"
        title="Impact stake for GiveDirectly"
        onClick={() => onShow?.()}
        className="hidden"
      />
      <form
        className="space-y-9 rounded-4xl bg-white p-6 max-md:mx-auto max-md:w-full max-md:space-y-6 max-md:p-4 max-md:pb-8 md:w-3/4"
        onSubmit={handleSubmit(onSubmit)}
        id="stake-form"
      >
        <div className="flex items-center justify-between max-md:flex-col max-md:items-center">
          <h3 className="h3 max-md:text-2xl">Stake for GiveDirectly</h3>

          <Tabs
            values={[TickerEnum.ETH, TickerEnum.ST_ETH, TickerEnum.W_ST_ETH]}
            activeTab={stakingTab}
            type="button"
            setActiveTab={(tab) => setStakingTab(tab as any)}
            layoutId="staking-ETH-tabs"
            id={[elementIds.ETH_TAB, elementIds.ST_ETH_TAB]}
          />
        </div>

        <div className="space-y-8 max-md:space-y-6">
          <FormInput
            id={elementIds.INPUT_AMOUNT}
            name="amount"
            control={control}
            type="number"
            label={`${stakingTab} Amount`}
            placeholder="0"
            rightSection={
              <div className="flex items-center gap-1 text-base text-black max-md:text-sm">
                <span className="text-gray">Monthly receive:</span>
                <span className="font-semibold">~{monthlyReceive} stETH</span>
              </div>
            }
            rightLabel={
              <LabelWithAllButton
                amount={formatNumber(getBalance())}
                onClick={() => {
                  setValue("amount", getBalance());
                  trigger("amount");
                }}
              />
            }
            error={formState.errors.amount?.message}
          />

          <FormInput
            id={elementIds.INPUT_PERCENT}
            name="percentage"
            control={control}
            type="number"
            label="Percentage of staking rewards to be donated"
            placeholder="25%"
            rightSection={
              <div className="flex items-center gap-1 text-base text-black max-md:text-sm">
                <span className="text-gray">Daily social impact:</span>
                <span className="font-semibold">~{dailyReceive} stETH</span>
              </div>
            }
            error={formState.errors.percentage?.message}
          />
        </div>
        {isLoggedIn ? (
          <Button
            id={elementIds.STAKE_BTN}
            type="submit"
            className="w-full"
            disabled={isStakePending || isStakePendindg}
          >
            Stake funds
          </Button>
        ) : (
          <ConnectWalletButton className="[&>button]:w-full" />
        )}
      </form>

      <StakeInfo selectedNgo={selectedNgo} estGasUsd={estimatedStakeGasUsd} />
    </motion.div>
  );
};
