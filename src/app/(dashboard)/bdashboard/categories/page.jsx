'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {Plus, Edit2, Loader2} from "lucide-react";
import {useCallback, useMemo, useState} from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {useCategories} from "@/hooks/useCategories";
import { CategoryDatatable} from "@/components/shared/category-datatable/CategoryDatatable";

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: categories = [], isLoading, error } = useCategories('categories', {});

  const handleEdit = useCallback((category) => {
    console.log("Edit kategori:", category);
    // Implementasi logika edit kategori
  }, []);

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor((row, index) => index + 1, {
      id: "no",
      header: "No",
      cell: info => <span className="tw-font-medium">#{info.getValue()}</span>,
    }),
    columnHelper.accessor("name", {
      header: "Category Name",
      cell: info => (
        <div className="tw-flex tw-items-center tw-gap-3">
          {info.row.original.icon && (
            <span className="tw-text-xl">{info.row.original.icon}</span>
          )}
          <span className="tw-font-medium">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("group", {
      header: "Sub Category Name",
      cell: info => (
        <div className="tw-flex tw-items-center tw-gap-3">
          <span className="tw-font-medium">{info.getValue() || "-"}</span>
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: info => (
        <div className="tw-flex tw-items-center tw-gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit(info.row.original)}
          >
            <Edit2 className="tw-h-4 tw-w-4" />
          </Button>
        </div>
      ),
    }),
  ], [columnHelper, handleEdit]);

  return (
    <div className="tw-container tw-mx-auto tw-p-10 tw-py-5">
      <div className="tw-flex tw-justify-between tw-mb-6 tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-lg">
        <div className="tw-flex tw-items-center tw-gap-2">
          <div className="tw-w-1 tw-h-6 tw-bg-emerald-500" />
          <h1 className="tw-text-3xl tw-p-0 tw-m-0 tw-font-bold">Categories</h1>
        </div>
        <div className="tw-flex tw-items-center tw-gap-4">
          {/*<div className="tw-relative tw-flex-1 tw-shadow">*/}
          {/*  <Search className="tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-gray-400" />*/}
          {/*  <Input*/}
          {/*    placeholder="Search by Name"*/}
          {/*    className="tw-pl-9 tw-bg-white"*/}
          {/*    value={searchTerm}*/}
          {/*    onChange={(e) => setSearchTerm(e.target.value)}*/}
          {/*  />*/}
          {/*</div>*/}

          <Link href="/bdashboard/categories/add">
            <Button className="tw-bg-emerald-500 hover:tw-bg-emerald-600">
              <Plus className="tw-mr-2 tw-h-4 tw-w-4" /> Add Category
            </Button>
          </Link>
        </div>
      </div>
      <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-lg tw-p-4">
        <CategoryDatatable
          data={categories}
          columns={columns}
          onEdit={handleEdit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}