import type { NGOLookup } from '@api/data-contracts'
import type { ComboboxProps } from '@mantine/core'
import { Combobox, Input, InputBase, useCombobox } from '@mantine/core'

import { SelectOption } from './select-option.component'
import { elementIds } from '@shared/lib/enums'

interface INgoDropdownProperties extends ComboboxProps {
  data: NGOLookup[]
  value: string | null
  setValue: (value: string) => void
  error?: string
  label?: string
  id?: string
}

export const NgoDropdown = ({
  data,
  value,
  setValue,
  error,
  label = 'Social impact',
  id,
  ...props
}: INgoDropdownProperties) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })
  const selectedOption = data.find((item) => Number(item.id) === Number(value))

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
              input: `${elementIds.INPUT_NGO} bg-[#eee] border-none text-base text-black font-semibold rounded-xl h-auto font-jakarta py-3 px-4 mt-2 max-md:p-3 max-md:text-sm`,
              error: 'text-warning',
            }}
            error={error}
          >
            {selectedOption ? (
              <SelectOption
                name={selectedOption.name}
                image={selectedOption.imageLink}
                link={selectedOption.link}
              />
            ) : (
              <Input.Placeholder className="text-black">
                Choose your social impact
              </Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {data.map((item, ind) => (
              <Combobox.Option value={item.id.toString()} key={item.id}>
                <SelectOption
                  name={item.name}
                  image={item.imageLink}
                  link={item.link}
                  ind={ind + 1}
                />
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
