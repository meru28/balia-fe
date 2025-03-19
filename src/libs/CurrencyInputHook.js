/**
 * Utilitas untuk memformat dan memproses nilai mata uang dengan format Indonesia
 * (menggunakan titik sebagai pemisah ribuan dan koma sebagai pemisah desimal)
 */
import {useEffect, useState} from "react";

// Fungsi untuk memformat angka ke format mata uang Indonesia (titik sebagai pemisah ribuan, koma sebagai desimal)
export const formatCurrency = (value) => {
  if (value === undefined || value === null || value === '') return '';

  // Konversi ke string dan pastikan menggunakan format dengan koma sebagai desimal
  const stringValue = typeof value === 'number'
    ? value.toString().replace('.', ',')
    : value.toString();

  // Hapus semua karakter non-numerik kecuali koma desimal
  const numericValue = stringValue.replace(/[^\d,]/g, '');

  // Split nilai menjadi bagian bulat dan desimal
  const parts = numericValue.split(',');
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? parts[1] : '';

  // Tambahkan separator titik (.) untuk ribuan ke bagian bulat
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Gabungkan kembali bagian bulat dan desimal
  return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
};

// Konversikan nilai tampilan ke nilai numerik untuk form (format Indonesia ke nilai number)
export const parseNumberFromCurrency = (value) => {
  if (!value) return 0;
  // Hapus semua separator ribuan (titik) dan ganti koma dengan titik untuk konversi ke number
  return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
};

// Sanitasi input mata uang
export const sanitizeCurrencyInput = (rawValue) => {
  // Tangani kasus khusus input koma
  if (rawValue === ',') {
    return '0,';
  }

  // Hapus leading zeros (nol di awal) kecuali jika hanya 0 atau diikuti koma
  return rawValue.replace(/^0+(?!,|$)/, '');
};

// Hook untuk input mata uang
export const useCurrencyInput = (initialValue = null, onChange) => {
  const [displayValue, setDisplayValue] = useState('');

  // Inisialisasi nilai awal
  useEffect(() => {
    if (initialValue !== null) {
      // Convert to string and format properly for initial display
      const initialStringValue = initialValue.toString().replace('.', ',');
      setDisplayValue(formatCurrency(initialStringValue));
    }
  }, [initialValue]);

  // Handler untuk perubahan input
  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    const sanitizedValue = sanitizeCurrencyInput(rawValue);
    const numericValue = Math.abs(parseNumberFromCurrency(sanitizedValue));

    // Format nilai untuk tampilan
    setDisplayValue(formatCurrency(sanitizedValue));

    // Panggil fungsi onChange jika disediakan
    if (onChange) {
      onChange(numericValue);
    }
  };

  return {
    displayValue,
    setDisplayValue,
    handleInputChange,
    getValue: () => parseNumberFromCurrency(displayValue)
  };
};