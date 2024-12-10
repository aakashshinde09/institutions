import { UnstyledButton } from '@mantine/core'

interface ILabelWithAllButtonProperties {
  amount: number | string
  onClick: () => void
}

export const LabelWithAllButton = ({
  amount,
  onClick,
}: ILabelWithAllButtonProperties) => {
  return (
    <div className="flex items-center text-base max-md:text-sm">
      <span className="ml-1 font-semibold text-black">{amount}</span>
      <UnstyledButton
        className="ml-2 cursor-pointer font-semibold uppercase text-primary max-md:text-sm"
        onClick={onClick}
      >
        max
      </UnstyledButton>
    </div>
  )
}
