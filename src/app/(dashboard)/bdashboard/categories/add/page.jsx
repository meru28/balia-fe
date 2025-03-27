"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CategorySelector from "@/components/shared/categories/CategorySelector";
import Link from "next/link";
import {useCategoryMutations} from "@/hooks/useCategories";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const categorySchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters" }),
  type: z.enum(["parent", "sub"]),
  parentId: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().default(true),
});


export default function AddCategoryPage() {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: "parent",
      parentId: undefined,
      isActive: true,
    },
  });

  const categoryType = form.watch("type");
  const router = useRouter()
  const { mutate: createCategory, isPending } = useCategoryMutations();

  function onSubmit(data) {
    const requiredField = {
      name: data.name,
      status: data.isActive ? 1 : 0,
      ...(data.parentId ? {parent: {id: +data.parentId}} : '')
    }

    createCategory(requiredField, {
      onSuccess: () => {
        form.reset();
        toast.success("Category added successfully")
        router.push('/bdashboard/categories')
      }

    })
    console.log("Category data submitted:", requiredField);
    // Here you would typically send this data to your API
  }

  return (
    <div className="tw-container tw-mx-auto tw-p-10 tw-py-5">
      <h1 className="tw-text-3xl tw-font-bold tw-mb-6">Add New Category</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="tw-space-y-8">
          <Card className="tw-shadow-lg">
            <CardHeader>
              <CardTitle>Category Information</CardTitle>
              <CardDescription>
                Enter the details for the new category.
              </CardDescription>
            </CardHeader>
            <CardContent className="tw-space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="tw-space-y-3">
                    <FormLabel>Category Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="tw-flex tw-flex-col tw-space-y-1"
                      >
                        <FormItem className="tw-flex tw-items-center tw-space-x-3 tw-space-y-0">
                          <FormControl>
                            <RadioGroupItem value="parent" />
                          </FormControl>
                          <FormLabel className="tw-font-normal">
                            Parent Category
                          </FormLabel>
                        </FormItem>
                        <FormItem className="tw-flex tw-items-center tw-space-x-3 tw-space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sub" />
                          </FormControl>
                          <FormLabel className="tw-font-normal">
                            Subcategory
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {categoryType === "sub" && (
                <CategorySelector
                  control={form.control}
                  name="parentId"
                  label="Parent Category"
                  placeholder="Select a parent category"
                  filterType="root"
                />
              )}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {categoryType === "sub" ? "Subcategory Name" : "Category Name"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={categoryType === "sub" ? "Enter subcategory name" : "Enter category name"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-rounded-lg tw-border p-4">
                    <div className="tw-space-y-0.5">
                      <FormLabel className="tw-text-base">Active Status</FormLabel>
                      <FormDescription>
                        Set whether this category is active and visible on your store.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="tw-gap-4">
              <Button type="button" className=" !tw-bg-gray-200 !tw-text-gray-800 hover:tw-bg-gray-300">
                <Link href="/bdashboard/categories" className="tw-w-full tw-h-full tw-inline-block tw-text-inherit">
                  Cancel
                </Link>
              </Button>
              <Button type="submit" className="">
                <Save className="tw-mr-2 tw-h-4 tw-w-4"/>
                {categoryType === "sub" ? "Save Subcategory" : "Save Category"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}