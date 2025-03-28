'use client'

import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useCategories } from "@/hooks/useCategories";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { debounce } from 'lodash';

const SimpleCategorySelector = ({
                                  value,
                                  onChange,
                                  onCategoriesLoaded,
                                  label = "",
                                  showParentCategoriesOnly = true // parameter untuk mengontrol filter
                                }) => {
  const { data: categories = [], isLoading, error } = useCategories('categories', {});
  const [selectedCategory, setSelectedCategory] = useState(value || '');

  // Log data kategori yang diterima
  useEffect(() => {
    if (categories?.length > 0) {
      // Verifikasi apakah kategori memiliki properti parentId
      const sampleCategory = categories[0];
    }
  }, [categories]);

  // Filter kategori berdasarkan parentId
  const filteredCategories = useMemo(() => {
    if (!categories?.length) return [];


    // Cek properti parentId dan struktur data
    const categoriesWithNullParent = categories.filter(category => {
      const hasNullParent = category.parentId === null;
      return hasNullParent;
    });


    // Filter kategori
    // Jika showParentCategoriesOnly false, tampilkan hanya kategori yang parentId === null
    // Jika showParentCategoriesOnly true, tampilkan semua kategori
    const filtered = categoriesWithNullParent;

    return filtered;
  }, [categories, showParentCategoriesOnly]);

  const unselectCategory = useCallback((e) => {
    e.stopPropagation(); // Menghindari Select terbuka ketika tombol X diklik
    setSelectedCategory('');
    if (onChange) {
      onChange('');
    }
  }, [onChange]);

  const debouncedOnChange = useMemo(() =>
      debounce((newValue) => {
        if (onChange) {
          onChange(newValue);
        }
      }, 300),
    [onChange]
  );

  // Handler untuk perubahan nilai
  const handleValueChange = useCallback((newValue) => {
    setSelectedCategory(newValue);
    debouncedOnChange(newValue);
  }, [debouncedOnChange]);

  useEffect(() => {
    if (categories?.length > 0 && onCategoriesLoaded) {
      onCategoriesLoaded(filteredCategories);
    }
  }, [filteredCategories, onCategoriesLoaded, categories]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  useEffect(() => {
    if (value !== undefined && value !== selectedCategory) {
      setSelectedCategory(value);
    }
  }, [selectedCategory, value]);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory || !categories?.length) return '';
    const found = categories.find(
      (category) => String(category.id) === String(selectedCategory)
    );
    return found?.name || '';
  }, [selectedCategory, categories]);

  if (isLoading) {
    return (
      <div className="tw-w-full">
        {
          label && <Label className="tw-mb-2 tw-block">{label}</Label>
        }
        <Skeleton className="tw-h-10 tw-w-full" />
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="tw-w-full">
      {label && <Label className="tw-mb-2 tw-block">{label}</Label>}
      <div className="tw-relative tw-w-full">
        <Select
          value={selectedCategory}
          onValueChange={handleValueChange}
        >
          <SelectTrigger className="tw-w-full tw-pr-8">
            <SelectValue placeholder="Select a category" className="tw-truncate">
              {selectedCategoryName}
            </SelectValue>
          </SelectTrigger>
          <SelectContent position="popper" className="tw-max-h-[300px" align="start" sideOffset={4}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={String(category.id)}
                  className="tw-truncate"
                >
                  {category.name}
                </SelectItem>
              ))
            ) : (
              <div className="tw-p-2 tw-text-center tw-text-gray-500">Tidak ada kategori tersedia</div>
            )}
          </SelectContent>
        </Select>
        {selectedCategory && (
          <button
            type="button"
            onClick={unselectCategory}
            className="tw-absolute tw-right-2 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-flex tw-items-center tw-justify-center tw-h-6 tw-w-6 tw-rounded-full tw-cursor-pointer hover:tw-bg-gray-100 tw-z-10 tw-transition-colors"
            aria-label="Clear category selection"
          >
            <X size={14} className="tw-text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(SimpleCategorySelector);