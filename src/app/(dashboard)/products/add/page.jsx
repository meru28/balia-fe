"use client";

import { useState } from "react";
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
import { ImagePlus, Save, X } from "lucide-react";
import Image from "next/image";

const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  color: z.string().min(1, { message: "Please enter a color" }),
  size: z.string().min(1, { message: "Please enter a size" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  isActive: z.boolean().default(true),
  stock: z.coerce.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  isPreorder: z.boolean().default(false),
});

export default function AddProductPage() {
  const [images, setImages] = useState([
    { id: 1, file: null, preview: null },
    { id: 2, file: null, preview: null },
    { id: 3, file: null, preview: null },
    { id: 4, file: null, preview: null },
    { id: 5, file: null, preview: null },
    { id: 6, file: null, preview: null },
  ]);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      color: "",
      size: "",
      price: 0,
      isActive: true,
      stock: 0,
      sku: "",
      isPreorder: false,
    },
  });

  function onSubmit(data) {
    // Filter out null images
    const productImages = images.filter(img => img.file !== null).map(img => img.file);

    // Combine form data with images
    const productData = {
      ...data,
      images: productImages,
    };

    console.log("Product data submitted:", productData);
    // Here you would typically send this data to your API
  }

  const handleImageChange = (id, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);

      const newImages = [...images];
      const index = newImages.findIndex(img => img.id === id);
      if (index !== -1) {
        newImages[index].file = file;
        newImages[index].preview = preview;
        setImages(newImages);
      }
    }
  };

  const handleImageDelete = (id, e) => {
    // Prevent the click event from bubbling up to the parent elements
    e.stopPropagation();

    const newImages = [...images];
    const index = newImages.findIndex(img => img.id === id);
    if (index !== -1) {
      // If there's a preview URL, revoke it to free up memory
      if (newImages[index].preview) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      newImages[index].file = null;
      newImages[index].preview = null;
      setImages(newImages);
    }
  };

  return (
    <div className="tw-container tw-mx-auto tw-py-10">
      <h1 className="tw-text-3xl tw-font-bold tw-mb-6">Add New Product</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="tw-space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Enter the basic information about your product.
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
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="shoes">Shoes</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="home">Home & Living</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Add detailed information about your product.
              </CardDescription>
            </CardHeader>
            <CardContent className="tw-space-y-6">
              <div>
                <h3 className="tw-text-lg tw-font-medium tw-mb-4">Product Images</h3>
                <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="tw-relative">
                      <div className={`tw-border-2 tw-border-dashed tw-rounded-lg tw-p-4 tw-h-40 tw-flex tw-flex-col tw-items-center tw-justify-center tw-overflow-hidden ${image.file ? 'tw-border-primary' : 'tw-border-border'}`}>
                        {image.file && image.preview ? (
                          <div className="tw-relative tw-w-full tw-h-full">
                            <Image
                              src={image.preview}
                              alt={`Product image ${image.id}`}
                              className="tw-object-contain tw-w-full tw-h-full"
                            />
                            <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-40">
                              <button
                                type="button"
                                onClick={(e) => handleImageDelete(image.id, e)}
                                className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-destructive tw-text-destructive-foreground tw-rounded-full tw-shadow-lg hover:tw-bg-destructive/90 tw-transition-colors"
                                aria-label="Remove image"
                              >
                                <X className="tw-h-6 tw-w-6" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <ImagePlus className="tw-h-10 tw-w-10 tw-text-muted-foreground tw-mb-2" />
                            <p className="tw-text-sm tw-text-muted-foreground">Upload image</p>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-opacity-0 tw-cursor-pointer"
                          onChange={(e) => handleImageChange(image.id, e)}
                          onClick={(e) => {
                            // If there's already an image, prevent the file dialog from opening
                            // when clicking the delete button
                            if (image.file && (e.target).closest('button')) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
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
                      <Textarea
                        placeholder="Enter product description"
                        className="tw-min-h-32"
                        {...field}
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
                        <Input placeholder="e.g., Red, Blue, Black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., S, M, L, XL" {...field} />
                      </FormControl>
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
                        <Input type="number" min="0" step="0.01" {...field} />
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
                        <Input type="number" min="0" step="1" {...field} />
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
                          Set whether this product is active and visible on your store.
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
                          Enable if this product is available for pre-order.
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
              <Button type="submit" className="tw-w-full sm:tw-w-auto">
                <Save className="tw-mr-2 tw-h-4 tw-w-4" />
                Save Product
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}