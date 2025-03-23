import { Input } from "@/components/ui/input";
import { useCurrencyInput } from '@/libs/CurrencyInputHook';
import {cn} from "@/lib/utils";

const PriceInput = ({ value, onChange, onBlur, name, placeholder = "0.00", currencySymbol = '' }) => {
  const { displayValue, handleInputChange } = useCurrencyInput(value, onChange);

  return (
    <div className="tw-relative">
      {currencySymbol && (
        <span className="tw-absolute tw-left-0 tw-h-full tw-rounded-l-lg tw-border-r tw-border-gray-200 tw-px-2 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-bg-gray-100 tw-flex tw-items-center">
           {currencySymbol}
        </span>
      )}
      <Input
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onBlur={onBlur}
        name={name}
        placeholder="0.00"
        className={cn("!tw-mb-0 !tw-border !tw-rounded-lg !tw-py-0 !tw-h-10 placeholder:!tw-text-gray-400", currencySymbol ? "!tw-pl-14" : "")}
      />
    </div>
  );
};

export default PriceInput;