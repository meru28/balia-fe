'use client'

import React, {useEffect, useState} from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import {useCategories} from "@/hooks/useCategories";
import {Skeleton} from "@/components/ui/skeleton";
import {AlertOctagon} from "lucide-react";

const CategorySelector = ({
                            control,
                            name,
                            onCategoriesLoaded,
                            onCategoryChange,
                            label = "Category",
                            placeholder = "Select a category",
                            filterType = 'root',
                            parentCategoryId = null,
                            defaultValue = ""
                          }) => {

  const {data: response, isLoading, error} = useCategories('categories');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (response) {
      let filtered = [];

      switch(filterType) {
        case 'root':
          // Filter kategori utama (tanpa parent)
          filtered = response.filter(category => !category.parentId || category.parentId === null);
          break;
        case 'sub':
          // Filter semua subkategori (memiliki parent)
          if (parentCategoryId) {
            // Jika parentCategoryId disediakan, filter subkategori berdasarkan parent tertentu
            filtered = response.filter(category =>
              category.parentId && String(category.parentId) === String(parentCategoryId)
            );
          } else {
            // Jika tidak, ambil semua subkategori
            filtered = response.filter(category =>
              category.parentId && category.parentId !== null
            );
          }
          break;
        default:
          // Default menampilkan semua kategori
          filtered = response;
      }

      setFilteredCategories(filtered);

      // Notify parent when categories are loaded
      if (filtered.length > 0 && onCategoriesLoaded) {
        onCategoriesLoaded(filtered);
      }

      if (defaultValue && filtered.some(cat => String(cat.id) === String(defaultValue)) && onCategoryChange) {
        onCategoryChange(defaultValue);
      }

    }
  }, [response, filterType, parentCategoryId, onCategoriesLoaded, defaultValue, onCategoryChange]);

  useEffect(() => {
    console.log(`CategorySelector(${name}): defaultValue=${defaultValue}, field.value=${control._formValues[name]}`);
    console.log(`Available category IDs:`, filteredCategories.map(c => String(c.id)));
  }, [name, defaultValue, control._formValues[name], filteredCategories]);

  if (isLoading) {
    return (
      <FormItem>
        <FormLabel>Category</FormLabel>
        <Skeleton className="tw-h-10 tw-w-full" />
      </FormItem>
    )
  }

  if (error) return <div>Error: {error.message}</div>

  const noDataMessage = filterType === 'root'
    ? "No category data available"
    : "No subcategory data available";

  if (filteredCategories.length === 0) {
    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <div className="tw-flex tw-items-center tw-gap-2 tw-h-10 tw-px-3 tw-py-2 tw-border tw-rounded-md tw-bg-muted/30 tw-text-muted-foreground tw-cursor-not-allowed">
          <AlertOctagon className="tw-h-4 tw-w-4" />
          <span>{noDataMessage}</span>
        </div>
      </FormItem>
    );
  }

  const defaultCategoryName = defaultValue
    ? filteredCategories.find(cat => String(cat.id) === String(defaultValue))?.name || ""
    : "";

  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => {
        const currentValue = field.value ? String(field.value) : "";
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
              value={field.value || defaultValue}
              onValueChange={(value) => {
                field.onChange(value);
                if (onCategoryChange) {
                  onCategoryChange(value);
                }
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder}>
                    {field.value ? filteredCategories?.find((category) => String(category.id) === String(field.value))?.name : defaultCategoryName}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="tw-w-80">
                {filteredCategories?.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={String(category.id)}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage/>
          </FormItem>
        )
      }}
    />
  )
}

export default CategorySelector