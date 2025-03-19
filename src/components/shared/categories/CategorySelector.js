'use client'

import React, { useState } from 'react'
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

const CategorySelector = ({
                            control,
                            name,
                            onCategoriesLoaded
                          }) => {

  const {data: categories = [], isLoading, error} = useCategories('categories');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  if (isLoading) {
    return (
      <FormItem>
        <FormLabel>Category</FormLabel>
        <Skeleton className="tw-h-10 tw-w-full" />
      </FormItem>
    )
  }

  if (error) return <div>Error: {error.message}</div>

  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category">
                  {categories.find((category) => String(category.id) === String(field.value))?.name || ''}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="tw-w-80">
              {categories?.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}

export default CategorySelector