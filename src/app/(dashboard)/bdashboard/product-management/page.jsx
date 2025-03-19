'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit2, Plus, Search, Trash2, Eye} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import SimpleCategorySelector from "@/components/shared/categories/SimpleCategorySelector";
import {useProductGetQuery} from "@/hooks/useProducts";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: products = [], isLoading, error } = useProductGetQuery('products',{ searchTerm, categoryId: selectedCategory });

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log("Kategori yang dipilih:", categoryId);
  };

  return (
    <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 md:tw-px-10 tw-py-4 md:tw-py-5">
      <div
        className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-mb-4 md:tw-mb-6 tw-bg-white tw-rounded-lg tw-p-3 md:tw-p-4 tw-shadow-lg">
        <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4 md:tw-mb-0">
          <div className="tw-w-1 tw-h-6 tw-bg-emerald-500"/>
          <h1 className="tw-text-2xl md:tw-text-3xl tw-p-0 tw-m-0 tw-font-bold">Products</h1>
        </div>
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-3 tw-gap-3 tw-w-full md:tw-w-auto">
          <div className="tw-relative tw-shadow tw-w-full">
            <Search className="tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-gray-400"/>
            <Input
              placeholder="Search by Name"
              className="tw-pl-9 tw-bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="tw-relative tw-w-full tw-shadow">
            <SimpleCategorySelector
              value={selectedCategory}
              onChange={handleCategoryChange}
              onCategoriesLoaded={(categories) => console.log("Kategori dimuat:", categories)}
            />
          </div>
          <Link href="/bdashboard/product-management/add" className="tw-w-full">
            <Button className="tw-w-full tw-bg-emerald-500 hover:tw-bg-emerald-600">
              <Plus className="tw-mr-2 tw-h-4 tw-w-4"/> Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.data?.content?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="tw-font-medium">{product.id}</TableCell>
                <TableCell>
                  <div className="tw-flex tw-items-center tw-gap-3">
                    <div className="tw-h-10 tw-w-10 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
                      <Image src={product?.mProductImages[0].image} alt="balia" width={24} height={24} className="tw-h-6 tw-w-6" />
                    </div>
                    <span className="tw-font-medium">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>{product.mCategoriesId}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.currency} - {product.price}</TableCell>
                <TableCell className="tw-text-gray-600">{product.stock}</TableCell>
                <TableCell className="tw-text-gray-600">{product.size}</TableCell>
                <TableCell>
                  <div className="tw-flex tw-items-center tw-gap-2">

                    <Button variant="ghost" size="sm" className="tw-h-8 tw-w-8 tw-p-0 tw-text-green-700">
                      <Link href={`/bdashboard/product-management/view/${product.id}`}>
                        <Eye className="tw-h-4 tw-w-4"/>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="tw-h-8 tw-w-8 tw-p-0">
                      <Edit2 className="tw-h-4 tw-w-4 tw-text-yellow-600" />
                    </Button>
                    <Button variant="ghost" size="sm" className="tw-h-8 tw-w-8 tw-p-0 tw-text-red-500">
                      <Trash2 className="tw-h-4 tw-w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}