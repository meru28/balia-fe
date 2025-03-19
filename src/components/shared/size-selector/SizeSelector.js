import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"

const SizeSelector = ({
                        control,
                        name
                      }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="tw-space-y-3">
          <FormLabel>Pilih Ukuran</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="tw-grid tw-grid-cols-4 tw-gap-2 sm:tw-gap-3 md:tw-gap-4"
            >
              {['S', 'M', 'L', 'XL'].map((size) => (
                <div
                  key={size}
                  className="tw-flex tw-items-center"
                >
                  <RadioGroupItem
                    value={size}
                    id={`size-${size}`}
                    className="peer tw-sr-only"
                  />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`
                      tw-block tw-w-full tw-text-center tw-py-2 tw-px-3 
                      tw-border tw-rounded-md tw-cursor-pointer 
                      tw-transition-all tw-duration-300 
                      tw-text-sm 
                      
                      ${field.value === size
                      ? 'tw-bg-primary tw-text-white tw-border-primary tw-ring-primary tw-ring-offset-2'
                      : 'tw-bg-white tw-text-gray-700 tw-border-gray-300 hover:tw-border-primary'}
                    `}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SizeSelector