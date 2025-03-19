import React from 'react';
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Input untuk angka dengan kemampuan menampilkan leading zero
 * @param field - prop react-hook-form field
 * @param digits - jumlah digit yang diinginkan (untuk leading zero)
 * @param className - class tambahan untuk styling
 * @param placeholder - placeholder untuk input
 * @param minVal - nilai minimum (opsional)
 * @param maxVal - nilai maksimum (opsional)
 */
const NumberWithLeadingZeroInput = ({
                                      field,
                                      digits = 2,
                                      className = "",
                                      placeholder = "00",
                                      minVal = 0,
                                      maxVal = null,
                                      useThousandSeparator = false,
                                      thousandSeparator = '.'
                                    }) => {
  const [displayValue, setDisplayValue] = useState('');

  // Format angka dengan leading zero
  const formatWithLeadingZeros = (value) => {
    if (value === undefined || value === null || value === '' || isNaN(value)) return '';

    // Konversi ke string tanpa desimal
    const stringValue = typeof value === 'number'
      ? Math.floor(value).toString()
      : value.toString().replace(/[^\d]/g, '');

    if (useThousandSeparator && stringValue.length > 3) {
      return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    }

    return stringValue;
  };

  const removeSeparator = (value) => {
    if (!value) return '';
    return value.replace(new RegExp(`\\${thousandSeparator}`, 'g'), '');
  };

  // Handler untuk perubahan input
  const handleInputChange = (e) => {
    const rawValue = e.target.value;

    // Hapus semua karakter non-numerik
    const cleanValue = useThousandSeparator
      ? removeSeparator(rawValue)
      : rawValue.replace(/[^\d]/g, '');

    // Konversi ke number
    let numberValue = cleanValue === '' ? '' : parseInt(cleanValue, 10);

    // Terapkan batasan nilai min/max jika ada
    if (numberValue !== '' && maxVal !== null && numberValue > maxVal) {
      numberValue = maxVal;
    }

    // Format nilai untuk tampilan dengan leading zero
    const formattedValue = formatWithLeadingZeros(numberValue);
    setDisplayValue(formattedValue);

    // Kirim nilai ke form
    field.onChange(numberValue === '' ? null : numberValue);
  };

  // Inisialisasi nilai tampilan saat komponen dibuat
  useEffect(() => {
    if (field.value !== undefined && field.value !== null) {
      setDisplayValue(formatWithLeadingZeros(field.value));
    }
  }, [field.value, useThousandSeparator]);

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={handleInputChange}
      onBlur={field.onBlur}
      name={field.name}
      placeholder={placeholder}
      className={cn("!tw-mb-0 !tw-border !tw-border-input !tw-rounded-lg !tw-py-0 !tw-h-9 placeholder:!tw-text-gray-400", className)}
    />
  );
};

export default NumberWithLeadingZeroInput;