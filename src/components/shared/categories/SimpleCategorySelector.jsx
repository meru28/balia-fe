'use client'

import React, { useState, useEffect } from 'react'
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

const SimpleCategorySelector = ({
                                  value,
                                  onChange,
                                  onCategoriesLoaded,
                                  label = ""
                                }) => {
  const { data: categories = [], isLoading, error } = useCategories('categories', {});
  const [selectedCategory, setSelectedCategory] = useState(value || '');

  const unselectCategory = (e) => {
    e.stopPropagation(); // Menghindari Select terbuka ketika tombol X diklik
    setSelectedCategory('');
    if (onChange) {
      onChange('');
    }
  };

  useEffect(() => {
    if (categories.length > 0 && onCategoriesLoaded) {
      onCategoriesLoaded(categories);
    }
  }, [categories, onCategoriesLoaded]);

  // Handler untuk perubahan nilai
  const handleValueChange = (newValue) => {
    setSelectedCategory(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

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
              {categories.find((category) => String(category.id) === String(selectedCategory))?.name || ''}
            </SelectValue>
          </SelectTrigger>
          <SelectContent position="popper" className="tw-max-h-[300px" align="start" sideOffset={4}>
            {categories?.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="tw-truncate"
              >
                {category.name}
              </SelectItem>
            ))}
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

export default SimpleCategorySelector;