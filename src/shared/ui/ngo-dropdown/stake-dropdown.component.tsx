import type { Stakes } from '@api/data-contracts'
import type { ComboboxProps } from '@mantine/core'
import { Combobox, Input, InputBase, useCombobox } from '@mantine/core'
import { elementIds } from '@shared/lib/enums'
import { useState } from 'react'

interface INgoDropdownProperties extends ComboboxProps {
  data: Stakes[]
  value: string | null
  setValue: (value: string) => void
  error?: string
  label?: string
}

export const StakeDropdown = ({
  data,
  value,
  setValue,
  error,
  label = 'Social impact',
  ...props
}: INgoDropdownProperties) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })
  const selectedOption = data?.find(
    (item) => Number(item.customStakeId) === Number(value),
  )
  const [index, setIndex] = useState(0)
  return (
    <div>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(value_) => {
          setValue(value_)
          combobox.closeDropdown()
        }}
        classNames={{
          dropdown: 'bg-white rounded-xl',
          option: 'text-base text-black font-semibold py-2 px-4 max-md:text-sm',
        }}
        {...props}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            onClick={() => combobox.toggleDropdown()}
            multiline
            label={label}
            classNames={{
              label: 'text-base text-black font-semibold max-md:text-sm',
              input: `${elementIds.INPUT_STAKE} bg-[#eee] border-none text-base text-black font-semibold rounded-xl h-auto font-jakarta py-3 px-4 mt-2 max-md:p-3 max-md:text-sm`,
              error: 'text-warning',
            }}
            error={error}
          >
            {selectedOption ? (
              <div>Stake #{index}</div>
            ) : (
              <Input.Placeholder className="text-black">
                Choose your stake
              </Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown className="pr-2">
          <Combobox.Options className="max-h-48 overflow-auto scroll">
            {data.map((item, i) => (
              <Combobox.Option
                value={item?.customStakeId?.toString()}
                key={item.customStakeId}
                onClick={() => setIndex(i + 1)}
              >
                <div className="flex items-center" id={elementIds.STAKE + (i + 1)}>
                  <p className="truncate text-base font-semibold">Stake #{i + 1}</p>
                </div>
              </Combobox.Option>
            ))}

            {data.length === 0 && (
              <Combobox.Option value="no-results" key="no-results" disabled>
                No results
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  )
}
