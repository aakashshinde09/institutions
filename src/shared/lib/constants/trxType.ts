import { TransactionTypeEnum } from '../enums'

export const trxType = new Map<TransactionTypeEnum | string, string>([
  [TransactionTypeEnum.Stake, 'Stake'],
  [TransactionTypeEnum.StakeStEth, 'Stake stEth'],
  [TransactionTypeEnum.StakeWstEth, 'Stake wStEth'],

  [TransactionTypeEnum.Withdraw, 'Withdraw'],
  [TransactionTypeEnum.WithdrawStEth, 'Withdraw stEth'],
  [TransactionTypeEnum.WithdrawWstEth, 'Withdraw wStEth'],
])
