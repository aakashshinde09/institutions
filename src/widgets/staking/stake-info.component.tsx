import type { NGOLookup } from "@api/data-contracts";
import { useGetAverageAprQuery } from "@shared/api";
import { useHasMounted, useScreenWidth, ViewWidth } from "@shared/lib/hooks";
import { formatNumber } from "@shared/lib/utils";
import { DescriptionItem } from "@shared/ui/description-item";

interface IStakeInfoProperties {
  selectedNgo?: NGOLookup;
  estGasUsd?: number;
}

export const StakeInfo = ({ selectedNgo, estGasUsd }: IStakeInfoProperties) => {
  const screen = useScreenWidth();
  const mounted = useHasMounted();
  const { data: averageAprData, isLoading: isAprLoading } =
    useGetAverageAprQuery();

  return (
    <div
      className="w-1/2 px-12 py-6 max-md:w-full max-md:rounded-t-3xl max-md:bg-[#ededed] max-md:p-4 max-md:pb-14"
      id="stake-info"
    >
      <h3 className="h3 max-md:text-2xl">Info</h3>

      <div className="mt-9 space-y-8 max-md:mt-6 max-md:flex max-md:flex-wrap max-md:justify-between max-md:gap-6 max-md:space-y-0">
        <DescriptionItem
          title="APR"
          value={
            averageAprData?.data
              ? `${formatNumber(averageAprData?.data?.SmaArp)}%`
              : "-"
          }
          showSkeleton={isAprLoading}
        />
        <DescriptionItem
          title="ETH Staked"
          value={
            selectedNgo
              ? `${formatNumber(selectedNgo?.totalStacked)} stETH`
              : "-"
          }
          className="max-md:order-1"
        />
        <DescriptionItem
          title={
            mounted && screen === ViewWidth.MOBILE
              ? "Impact Stakers"
              : `Impact Stakers`
          }
          value={selectedNgo ? selectedNgo.totalUserStaked.toString() : "-"}
        />
        <DescriptionItem
          title="Maximum transaction cost"
          value={mounted && estGasUsd ? `${formatNumber(estGasUsd)}$` : "-"}
        />
      </div>
      {/* 
      <p className="mt-8 text-base max-md:mt-6 max-md:text-sm">
        {selectedNgo?.description ?? ''}
      </p> */}
    </div>
  );
};
