"use client";

import {useState} from "react";
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
import {ImagePlus, Loader2, Save, X} from "lucide-react";
import Image from "next/image";
import { useProductAddMutation } from '@/hooks/useProducts'
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import SizeSelector from "@/components/shared/size-selector/SizeSelector";
import CategorySelector from "@/components/shared/categories/CategorySelector";
import PriceInput from '@/components/shared/price-input/PriceInput'
import NumberWithLeadingZeroInput from "@/components/shared/number-with-leading-zero-input/NumberWithLeadingZeroInput";

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
  sustainabilityFeature: z.string().min(10, { message: "Sustainability feature must be at least 10 characters" }),
  material: z.string().min(10, { message: "Material must be at least 10 characters" }),
  discountPercentage: z.coerce.number().int().min(0).max(100, { message: "Discount percentage must be between 0 and 100" }),
  isPreorder: z.boolean().default(false),
});

export default function AddProductPage() {
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
      currency: "",
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
      sustainabilityFeature: "",
      material: "",
      discountPercentage: 0,
      isPreorder: false,
    },
  });

  const currency = form.watch('currency');

  const router = useRouter()
  const { mutate: addProduct, isPending } = useProductAddMutation()
  function onSubmit(data) {
    const metadata = {
      name: data.name,
      sku: data.sku,
      price: data.price,
      currency: data.currency,
      stock: data.stock,
      status: data.isActive ? 1 : 0,
      color: data.color,
      size: data.size,
      weight: data.weight.toString(),
      weightUnit: data.weightUnit,
      dimensionWidth: data.dimensionWidth.toString(),
      dimensionLength: data.dimensionLength.toString(),
      dimensionHeight: data.dimensionHeight.toString(),
      longDescription: data.description,
      shortDescription: data.description,
      mCategories: {"id": +data.category},
      sustainabilityFeature: data.sustainabilityFeature,
      material: data.material,
      discountPercentage: data.discountPercentage,
      preOrder: data.isPreorder ? 1 : 0
    };

    const validImages = images.filter(img => img.file !== null);
    const files = validImages.map(img => img.file);

    addProduct({ metadata, files }, {
      onSuccess: (response) => {
        toast.success(`Product ${data.name} was Added`);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || error?.message || 'Failed to create password!');
      }
    })
  }

  const handleImageChange = (id, e) => {
    console.log(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      const img = new window.Image();

      img.onload = () => {
        const newImages = [...images];
        const index = newImages.findIndex(img => img.id === id);
        if (index !== -1) {
          newImages[index].file = file;
          newImages[index].preview = preview;
          newImages[index].width = img.width;
          newImages[index].height = img.height;
          setImages(newImages);
        }
      };

      img.src = preview;
    }
  };

  const handleImageDelete = (id, e) => {
    if (e) e.stopPropagation();

    setImages(prevImages => {
      return prevImages.map(img => {
        if (img.id === id) {
          if (img.preview) {
            URL.revokeObjectURL(img.preview);
          }
          return { id: img.id, file: null, preview: null, width: null, height: null };
        }
        return img;
      });
    });
  };

  return (
    <div className="tw-container tw-mx-auto tw-p-10 tw-py-5">
      <h1 className="tw-text-3xl tw-font-bold tw-mb-6">Add New Product</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="tw-space-y-8">
          <Card className="tw-shadow-lg">
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

              <CategorySelector
                control={form.control}
                name="category"
              />
            </CardContent>
          </Card>

          <Card className="tw-shadow-lg">
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
                  {images.map(image => (
                    <div key={image.id} className="tw-relative tw-bg-gray-100 tw-border tw-rounded-md tw-flex tw-items-center tw-justify-center tw-h-32">
                      {image.preview ? (
                        <>
                          <Image
                            src={image.preview}
                            alt="Product image"
                            width={image.width || 100}
                            height={image.height || 100}
                            className="tw-object-contain tw-h-full tw-w-full"
                          />
                          <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-40">
                            <button
                              type="button"
                              onClick={(e) => handleImageDelete(image.id)}
                              className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-destructive tw-text-destructive-foreground tw-rounded-full tw-shadow-lg hover:tw-bg-destructive/90 tw-transition-colors"
                              aria-label="Remove image"
                            >
                              <X className="tw-h-6 tw-w-6" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <label htmlFor={`image-upload-${image.id}`} className="tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-full">
                          <ImagePlus className="tw-w-6 tw-h-6 tw-text-gray-400" />
                          <span className="tw-mt-2 tw-text-sm tw-text-gray-500">Add Image</span>
                          <input
                            id={`image-upload-${image.id}`}
                            type="file"
                            className="tw-hidden"
                            accept="image/*"
                            onChange={(e) => handleImageChange(image.id, e)}
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
                <SizeSelector
                  control={form.control}
                  name="size"
                  onChange={(value) => {
                    console.log('Size changed to:', value);
                  }}
                />
              </div>
              <div className="tw-grid tw-grid-cols-2 tw-gap-6">
                <div className="tw-grid tw-grid-cols-1 tw-gap-4">
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <FormControl>
                          <select
                            className="tw-block tw-px-3 tw-py-2 tw-border tw-rounded-md !tw-placeholder-gray-400 focus:tw-outline-none focus:tw-ring-indigo-500"
                            {...field}
                          >
                            <option value="" disabled>
                              Select a currency
                            </option>
                            <option value="AED">AED - United Arab Emirates Dirham</option>
                            <option value="USD">USD - United States Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="IDR">IDR - Indonesian Rupiah</option>
                            <option value="JPY">JPY - Japanese Yen</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="AUD">AUD - Australian Dollar</option>
                          </select>
                        </FormControl>
                        <FormMessage/>
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
                          <PriceInput field={field} currencySymbol={currency} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Discount Percentage</FormLabel>
                        <FormControl>
                          <NumberWithLeadingZeroInput
                            field={field}
                            placeholder="Enter discount percentage"
                            maxVal={100}
                          />
                        </FormControl>
                        <FormMessage/>
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
                          <NumberWithLeadingZeroInput field={field} placeholder="Enter product stock" useThousandSeparator={true} />
                          {/*<Input type="number" min="0" step="1" {...field} />*/}
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
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Weight Unit</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="tw-border-input tw-border-red-500"
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select weight unit"/>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">Kilogram (kg)</SelectItem>
                              <SelectItem value="g">Gram (g)</SelectItem>
                              <SelectItem value="lb">Pound (lb)</SelectItem>
                              <SelectItem value="oz">Ounce (oz)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                  <FormField
                    control={form.control}
                    name="dimensionWidth"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Width</FormLabel>
                        <FormControl>
                          <NumberWithLeadingZeroInput
                            field={field}
                            placeholder="width"
                            useThousandSeparator={true}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dimensionLength"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Length</FormLabel>
                        <FormControl>
                          <NumberWithLeadingZeroInput
                            field={field}
                            placeholder="length"
                            useThousandSeparator={true}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dimensionHeight"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Height</FormLabel>
                        <FormControl>
                          <NumberWithLeadingZeroInput
                            field={field}
                            placeholder="height"
                            useThousandSeparator={true}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="tw-grid tw-grid-cols-1 tw-gap-4">
                <FormField
                  control={form.control}
                  name="material"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Material</FormLabel>
                      <FormControl>
                        <Textarea className="placeholder:tw-text-gray-400" placeholder="Enter Product Material" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sustainabilityFeature"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Sustainability Feature</FormLabel>
                      <FormControl>
                        <Textarea className="placeholder:tw-text-gray-400" placeholder="Describe sustainability features (if any)" {...field} />
                      </FormControl>
                      <FormMessage/>
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
              <Button type="submit" className="tw-w-full sm:tw-w-auto" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="tw-animate-spin" />
                      Please wait
                    </>
                  ) : (
                    <>
                      <Save className="tw-mr-2 tw-h-4 tw-w-4" />
                      Save Product
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