"use client";

import { useState, useEffect, use } from "react";
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {Car, ImagePlus, Loader2, Save, X} from "lucide-react";
import Image from "next/image";
import { useProductEditMutation, useProductGetQuery} from '@/hooks/useProducts';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SizeSelector from "@/components/shared/size-selector/SizeSelector";
import CategorySelector from "@/components/shared/categories/CategorySelector";
import PriceInput from '@/components/shared/price-input/PriceInput';
import NumberWithLeadingZeroInput from "@/components/shared/number-with-leading-zero-input/NumberWithLeadingZeroInput";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  currency: z.string().min(1, { message: "Please select a currency" }),
  stock: z.coerce.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
  isActive: z.boolean().default(true),
  color: z.string().min(1, { message: "Please enter a color" }),
  size: z.string().min(1, { message: "Please enter a size" }),
  weight: z.coerce.number().positive({message: "Weight must be a positive number"}),
  weightUnit: z.string().min(1, { message: "Please select a weight unit" }),
  dimensionWidth: z.coerce.number().positive({message: "Width must be a positive number"}),
  dimensionLength: z.coerce.number().positive({message: "Length must be a positive number"}),
  dimensionHeight: z.coerce.number().positive({message: "Height must be a positive number"}),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  subCategory: z.string(),
  sustainabilityFeature: z.string().min(10, { message: "Sustainability feature must be at least 10 characters" }),
  material: z.string().min(10, { message: "Material must be at least 10 characters" }),
  discountPercentage: z.coerce.number().int().min(0).max(100, { message: "Discount percentage must be between 0 and 100" }),
  isPreorder: z.boolean().default(false),
});

export default function EditProductPage({ params }) {
  const unwrappedParams = React.use(params);
  const productId = unwrappedParams.id;

  const { data: productData, isLoading: isLoadingProduct } = useProductGetQuery('products',
    { productId: productId }
  );

  const product = productData?.data?.content && productData.data.content.length > 0 ? productData.data.content[0] : null;

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(product?.mCategoriesParentId || null);
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState(product?.mCategoriesParentName || null);

  const [isFormReady, setIsFormReady] = useState(false);

  const [images, setImages] = useState([
    { id: 1, file: null, preview: null },
    { id: 2, file: null, preview: null },
    { id: 3, file: null, preview: null },
  ]);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: "",
      currency: "AED",
      stock: 0,
      isActive: true,
      color: "",
      size: "",
      weight: "",
      weightUnit: "",
      dimensionWidth: "",
      dimensionLength: "",
      dimensionHeight: "",
      description: "",
      category: "",
      subCategory: "",
      sustainabilityFeature: "",
      material: "",
      discountPercentage: 0,
      isPreorder: false,
    },
  });

  useEffect(() => {
    if (product && !isLoadingProduct) {
      // Prefill form with product data
      form.reset({
        name: product.name || "",
        sku: product.sku || "",
        price: product?.price || "",
        currency: product?.currency || "AED",
        stock: product.stock || 0,
        isActive: product.isActive ?? true,
        color: product.color || "",
        size: product.size || "",
        weight: product.weight || "",
        weightUnit: product.weightUnit || "",
        dimensionWidth: product.dimensionWidth || "",
        dimensionLength: product.dimensionLength || "",
        dimensionHeight: product.dimensionHeight || "",
        description: product?.longDescription || "",
        category: product.mCategoriesParentId ? product.mCategoriesParentId?.toString() : product.mCategoriesId?.toString(),
        subCategory: product.mCategoriesParentId ? product.mCategoriesId?.toString() : "",
        sustainabilityFeature: product.sustainabilityFeature || "",
        material: product.material || "",
        discountPercentage: product.discountPercentage || 0,
        isPreorder: product.isPreorder || false,
      })
      setSelectedCategoryId(product.mCategoriesParentId !== null ? product.mCategoriesParentId : product.mCategoriesId);
      setTimeout(() => {
        form.setValue("weightUnit", product?.weightUnit);
        form.setValue("category", product.mCategoriesParentId !== null ? product.mCategoriesParentId?.toString() : product.mCategoriesId?.toString());
        setIsFormReady(true)
      }, 100)

      // Handle product images
      if (product?.mProductImages && product?.mProductImages.length) {
        const updatedImages = [...images];
        product?.mProductImages.forEach((image, index) => {
          if (index < 3) {
            updatedImages[index].file = null;
            updatedImages[index].preview = image.image || image;
          }
        });
        setImages(updatedImages);
      }
    }
  }, [product, isLoadingProduct, form]);

  useEffect(() => {
    if (isFormReady) {
      console.log("Form values:", form.getValues());
      console.log("Selected Category ID:", selectedCategoryId);
    }
  }, [isFormReady, form, selectedCategoryId]);

  const router = useRouter();
  const { mutate: editProduct, isPending } = useProductEditMutation();

  function onSubmit(data) {
    console.log("Form values:", form.getValues("subCategory"));
    // if (selectedCategoryName !== "Best Sellers") {
    //   form.setError("subCategory", {
    //     type: "manual",
    //     message: "Please select a subcategory"
    //   });
    //   return;
    //
    // }
    const metadata = {
      id: productId,
      name: data.name,
      sku: data.sku,
      price: data.price,
      currency: data.currency,
      stock: data.stock,
      status: data.isActive ? 1 : 0,
      color: data.color,
      size: data.size,
      weight: data.weight,
      weightUnit: data.weightUnit,
      dimensionWidth: data.dimensionWidth,
      dimensionLength: data.dimensionLength,
      dimensionHeight: data.dimensionHeight,
      longDescription: data.description,
      mCategories: data.subCategory ? {"id": +data.subCategory} : {"id": +data.category},
      sustainabilityFeature: data.sustainabilityFeature,
      material: data.material,
      discountPercentage: data.discountPercentage,
      preOrder: data.isPreorder ? 1 : 0,
    };

    const validImages = images.filter(img => img.file !== null);
    const files = validImages.map(img => img.file);
    // Filter out images that have been uploaded

    editProduct({ metadata, files }, {
      onSuccess: () => {
        form.reset();
        setImages([
          {id: 1, file: null, preview: null},
          {id: 2, file: null, preview: null},
          {id: 3, file: null, preview: null},
        ]);
        toast.success('Product updated successfully');
        router.push('/bdashboard/product-management');
      },
      onError: (error) => {
        toast.error(`Error updating product: ${error.message}`);
      }
    });
  }

  const handleImageChange = (e, imageId) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedImages = images.map(img => {
      if (img.id === imageId) {
        return {
          ...img,
          file: file,
          preview: URL.createObjectURL(file),
        };
      }
      return img;
    });

    setImages(updatedImages);
  };

  const removeImage = (imageId) => {
    const updatedImages = images.map(img => {
      if (img.id === imageId) {
        // Clear the image file and preview
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
        return {
          ...img,
          file: null,
          preview: null,
        };
      }
      return img;
    });

    setImages(updatedImages);
  };


  const handleSubCategoryChange = (subCategory) => {
    console.log('Subcategory changed:', subCategory);

    // Update state lokal untuk subkategori
    setSelectedSubCategoryId(subCategory.id);
    setSelectedSubCategoryName(subCategory.name);
    form.setValue("subCategory", subCategory.id);
  };


  if (isLoadingProduct) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
        <Loader2 className="tw-h-8 tw-w-8 tw-animate-spin tw-text-primary" />
        <span className="tw-ml-2">Loading product data...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-h-96">
        <span className="tw-ml-2">Product not found</span>
      </div>
    );
  }

  return (
    <div className="tw-container tw-mx-auto tw-p-10 tw-py-5">
      <h1 className="tw-text-3xl tw-font-bold tw-mb-6">Edit Product</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="tw-space-y-8">
          <Card className="tw-shadow-lg">
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Update the basic information of this product.
              </CardDescription>
            </CardHeader>
            <CardContent className="tw-space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CategorySelector
                        control={form.control}
                        name="category"
                        filterType="root"
                        defaultValue={product?.mCategoriesParentId}
                        value={field.value}
                        onCategoryChange={(category) => {
                          // Perbarui nilai form di sini
                          field.onChange(category.id);
                          setSelectedCategoryId(category.id);
                          setSelectedCategoryName(category.name);
                          form.setValue("subCategory", "");
                        }}
                        label="Category"
                        placeholder="Select a category"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CategorySelector
                control={form.control}
                name="subCategory"
                label="Subcategory"
                placeholder="Select a Subcategory"
                filterType="sub"
                parentCategoryId={selectedCategoryId}
                onCategoryChange={handleSubCategoryChange}
                key={`subcategory-${selectedCategoryId || 'none'}`}
              />
            </CardContent>
          </Card>

          <Card className="tw-shadow-lg">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Update detailed information about your product.
              </CardDescription>
            </CardHeader>
            <CardContent className="tw-space-y-6">
              <div>
                <h3 className="tw-text-lg tw-font-medium tw-mb-4">Product Images</h3>
                <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="tw-relative tw-bg-gray-100 tw-border tw-rounded-md tw-flex tw-items-center tw-justify-center tw-h-32">
                      {image.preview ? (
                        <>
                          <Image
                            src={image.preview}
                            alt={`Product image ${image.id}`}
                            fill
                            className="tw-object-contain tw-w-full tw-h-full"
                          />
                          <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-40">
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-destructive tw-text-destructive-foreground tw-rounded-full tw-shadow-lg hover:tw-bg-destructive/90 tw-transition-colors"
                            >
                              <X className="tw-h-6 tw-w-6" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <label htmlFor={`image-${image.id}`} className="tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-full">
                          <ImagePlus className="tw-w-6 tw-h-6 tw-text-gray-400" />
                          <span className="tw-mt-2 tw-text-sm tw-text-gray-500">Add Image</span>
                          <input
                            id={`image-${image.id}`}
                            type="file"
                            accept="image/*"
                            className="tw-hidden"
                            onChange={(e) => handleImageChange(e, image.id)}
                          />
                        </label>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        defaultValue={product?.longDescription}
                        onChange={field.onChange}
                        placeholder="Enter product description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SizeSelector
                  control={form.control}
                  name="size"
                  onChange={(value) => {
                    console.log('size changed', value);
                  }}
                />
              </div>
              <div className="tw-grid tw-grid-cols-2 tw-gap-6">
                <div className="tw-grid tw-grid-cols-1 tw-gap-4">
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          className="tw-block tw-px-3 tw-py-2 tw-border tw-rounded-md !tw-placeholder-gray-400 focus:tw-outline-none focus:tw-ring-indigo-500"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AED">AED - United Arab Emirates Dirham</SelectItem>
                            <SelectItem value="USD">USD - United States Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro (€)</SelectItem>
                            <SelectItem value="IDR">IDR - Indonesian Rupiah</SelectItem>
                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <PriceInput
                            {...field}
                            currencySymbol={form.watch('currency')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Percentage (%)</FormLabel>
                        <FormControl>
                          <NumberWithLeadingZeroInput
                            field={field}
                            placeholder="Enter discount percentage"
                            maxVal={100}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <NumberWithLeadingZeroInput
                            value={field.value}
                            placeholder="0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product SKU" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight</FormLabel>
                        <FormControl>
                          <NumberWithLeadingZeroInput field={field} placeholder="Enter product weight" useThousandSeparator={true} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weightUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight Unit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          className="tw-border-input tw-border-red-500"
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="kg">Kilogram (kg)</SelectItem>
                            <SelectItem value="g">Gram (g)</SelectItem>
                            <SelectItem value="lb">Pound (lb)</SelectItem>
                            <SelectItem value="oz">Ounce (oz)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                  <FormField
                    control={form.control}
                    name="dimensionWidth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width (cm)</FormLabel>
                        <FormControl>
                          <NumberWithLeadingZeroInput
                            field={field}
                            placeholder="width"
                            useThousandSeparator={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dimensionLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length (cm)</FormLabel>
                        <FormControl>
                          <NumberWithLeadingZeroInput
                            field={field}
                            placeholder="length"
                            useThousandSeparator={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dimensionHeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <NumberWithLeadingZeroInput
                            field={field}
                            placeholder="height"
                            useThousandSeparator={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="tw-grid tw-grid-cols-1 tw-gap-4">
                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Materials</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          defaultValue={product?.material}
                          onChange={field.onChange}
                          placeholder="Enter product materials"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sustainabilityFeature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sustainability Features</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          defaultValue={product?.sustainabilityFeature}
                          onChange={field.onChange}
                          placeholder="Enter sustainability features"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <div className="tw-flex tw-flex-col tw-space-y-4">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-rounded-lg tw-border tw-p-4">
                      <div className="tw-space-y-0.5">
                        <FormLabel className="tw-text-base">Active Status</FormLabel>
                        <FormDescription>
                          Make this product visible in the store
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
                <FormField
                  control={form.control}
                  name="isPreorder"
                  render={({ field }) => (
                    <FormItem className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-rounded-lg tw-border tw-p-4">
                      <div className="tw-space-y-0.5">
                        <FormLabel className="tw-text-base">Pre-order</FormLabel>
                        <FormDescription>
                          Allow customers to order this product in advance
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
              </div>
            </CardContent>
            <CardFooter className="tw-flex tw-justify-end">
              <Button
                variant="outline"
                onClick={() => router.push('/bdashboard/product-management')}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" className="tw-w-full sm:tw-w-auto" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="tw-animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    <Save className="tw-mr-2 tw-h-4 tw-w-4" />
                    Update Product
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}