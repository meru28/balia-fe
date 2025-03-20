'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit2, Plus, Search, Trash2, Eye, ChevronUp, ChevronDown, ArrowUpDown} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import SimpleCategorySelector from "@/components/shared/categories/SimpleCategorySelector";
import {useProductGetQuery} from "@/hooks/useProducts";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from "@/lib/utils";
import Joyride, { STATUS } from 'react-joyride';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sorting, setSorting] = useState([]);
  const [columnResizing, setColumnResizing] = useState({});
  const [columnResizingMode, setColumnResizingMode] = useState('onChange');
  const [runTour, setRunTour] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const tableRef = useRef(null);

  // flag to make sure useEffect runs only once when products data is available
  const tourInitialized = useRef(false);
  // Tour steps
  const steps = [
    {
      target: '#table-container',
      content: 'This table has columns that can be resized.',
      disableBeacon: true,
      placement: 'bottom',
    },
    {
      target: '.column-header',
      content: 'Hover over the edge of this column and drag to resize the column.',
      disableBeacon: true,
      placement: 'right',
    },
    {
      target: '#resize-indicator',
      content: 'You can adjust the column width as needed by dragging the column edge.',
      disableBeacon: true,
    },
  ];

  const { data: products = [], isLoading } = useProductGetQuery('products',
    { searchTerm, categoryId: selectedCategory }, { staleTime: 2 * 60 * 1000 });

  useEffect(() => {
    setIsMounted(true);
    console.log("Component mounted");

    // Hanya untuk pengujian - hapus untuk produksi
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('tableTourCompleted');
      console.log("localStorage reset");
    }

    return () => {
      tourInitialized.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading) {
      console.log("Table container exists:", document.getElementById('table-container') !== null);
      console.log("Column header exists:", document.querySelector('.column-header') !== null);
      console.log("Resize indicator exists:", document.getElementById('resize-indicator') !== null);
    }
  }, [isMounted, isLoading]);

  // Inisialisasi tour
  useEffect(() => {
    if (!isLoading && products?.data?.content?.length > 0 && isMounted && !tourInitialized.current) {
      console.log("Products loaded:", products.length);

      const tourCompleted = typeof window !== 'undefined'
        ? window.localStorage.getItem('tableTourCompleted') === 'true'
        : false;

      console.log("Tour completed status:", tourCompleted);

      if (!tourCompleted) {
        tourInitialized.current = true;

        // Tambahkan waktu tunggu lebih lama
        const timer = setTimeout(() => {
          console.log("Starting tour now");
          setRunTour(true);
        }, 3000); // Waktu tunggu lebih lama (3 detik)

        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, products, isMounted]);

  useEffect(() => {
    if (selectedCategory !== '') {
      setRunTour(false);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tableTourCompleted', 'true');
      }
    }
  }, [selectedCategory]);

  useLayoutEffect(() => {
    if (isMounted && tableRef.current) {
      // Sekarang kita yakin DOM elements sudah ada
    }
  }, [isMounted]);


  // Handle tour events
  const handleJoyrideCallback = (data) => {
    const { status, type, action } = data;
    // console.log('Joyride callback:', { status, type, action });

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Tour selesai atau dilewati
      setRunTour(false);

      // Simpan preference user hanya jika sudah di client-side
      if (isMounted && typeof window !== 'undefined') {
        window.localStorage.setItem('tableTourCompleted', 'true');
      }
    }
  };

  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    console.log("Kategori yang dipilih:", categoryId);
  }, []);

  const columns = [
    {
      accessorKey: 'id',
      header: () => {
        return (
          <div className="tw-p-0 tw-font-bold">
            No
          </div>
        )
      },
      cell: ({row}) => <div className="tw-font-medium">{row.index + 1}</div>,
      size: 60,
      enableResizing: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="tw-p-0 tw-font-bold"
          >
            Name
            <div className="tw-ml-2">
              {column.getIsSorted() === "asc" ? (
                <ChevronUp className="tw-h-4 tw-w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ChevronDown className="tw-h-4 tw-w-4" />
              ) : (
                <ArrowUpDown className="tw-h-4 tw-w-4" />
              )}
            </div>
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="tw-flex tw-items-center tw-gap-3">
          <div className="tw-h-10 tw-w-10 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
            <Image src={row.original.mProductImages[0]?.image} alt="product" width={24} height={24} className="tw-h-6 tw-w-6" />
          </div>
          <span className="tw-font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'mCategoriesName',
      header: () => {
        return (
          <div className="tw-p-0 tw-font-bold column-header">
            Category
          </div>
        )
      },
      cell: ({row}) => <div className="tw-font-bold">{row.original.mCategoriesName}</div>,
    },
    {
      accessorKey: 'sku',
      header: () => {
        return (
          <div className="tw-p-0 tw-font-bold column-header">
            SKU
          </div>
        )
      },
      cell: ({row}) => <div>{row.original.sku}</div>,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="tw-p-0 tw-font-bold column-header"
          >
            Price
            <div className="tw-ml-2">
              {column.getIsSorted() === "asc" ? (
                <ChevronUp className="tw-h-4 tw-w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ChevronDown className="tw-h-4 tw-w-4" />
              ) : (
                <ArrowUpDown className="tw-h-4 tw-w-4" />
              )}
            </div>
          </Button>
        )
      },
      cell: ({row}) => {
        const currency = row.original.currency || 'AED'; // Default to 'IDR' if no currency is provided
        return <div>{new Intl.NumberFormat('fr-AE', {style: 'currency', currency}).format(row.original.price)}</div>;
      },
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="tw-p-0 tw-font-bold column-header"
          >
            Stock
            <div className="tw-ml-2">
              {column.getIsSorted() === "asc" ? (
                <ChevronUp className="tw-h-4 tw-w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ChevronDown className="tw-h-4 tw-w-4" />
              ) : (
                <ArrowUpDown className="tw-h-4 tw-w-4" />
              )}
            </div>
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.original.stock}</div>,
    },
    {
      accessorKey: 'size',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="tw-p-0 tw-font-bold column-header"
          >
            Size
            <div className="tw-ml-2">
              {column.getIsSorted() === "asc" ? (
                <ChevronUp className="tw-h-4 tw-w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ChevronDown className="tw-h-4 tw-w-4" />
              ) : (
                <ArrowUpDown className="tw-h-4 tw-w-4" />
              )}
            </div>
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.original.size}</div>,
    },
    {
      id: 'actions',
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="tw-flex tw-space-x-2">
            <Link href={`/bdashboard/product-management/${row.original.id}/edit`}>
              <Button variant="outline" size="icon" className="tw-h-8 tw-w-8">
                <Edit2 className="tw-h-3.5 tw-w-3.5" />
              </Button>
            </Link>
            <Link href={`/bdashboard/product-management/${row.original.id}/view`}>
              <Button variant="outline" size="icon" className="tw-h-8 tw-w-8">
                <Eye className="tw-h-3.5 tw-w-3.5" />
              </Button>
            </Link>
            <Button variant="outline" size="icon" className="tw-h-8 tw-w-8 tw-text-red-500">
              <Trash2 className="tw-h-3.5 tw-w-3.5" />
            </Button>
          </div>
        )
      },
      enableResizing: false,
    },
  ];

  const tableData = useMemo(() => products?.data?.content || [], [products]);

  // Inisialisasi tabel
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnResizing,
    },
    columnResizeMode: columnResizingMode,
    onSortingChange: setSorting,
    onColumnResizingChange: setColumnResizing,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 md:tw-px-10 tw-py-4 md:tw-py-5">
      {isMounted && (
        <Joyride
          steps={steps}
          run={runTour}
          continuous={true}
          showSkipButton={true}
          showProgress={true}
          disableScrolling={false}
          disableScrollParentFix={true}
          styles={{
            options: {
              primaryColor: '#10b981',
              zIndex: 10000,
            },
          }}
          callback={handleJoyrideCallback}
        />
      )}

      <div
        className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-mb-4 md:tw-mb-6 tw-bg-white tw-rounded-lg tw-p-3 md:tw-p-4 tw-shadow-lg">
        <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4 md:tw-mb-0">
          <div className="tw-w-1 tw-h-6 tw-bg-emerald-500"/>
          <h1 className="tw-text-2xl md:tw-text-3xl tw-p-0 tw-m-0 tw-font-bold">Products</h1>
        </div>
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-3 tw-w-full md:tw-w-auto">
          {/*<div className="tw-relative tw-shadow tw-w-full">*/}
          {/*  <Search className="tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-gray-400"/>*/}
          {/*  <Input*/}
          {/*    placeholder="Search by Name"*/}
          {/*    className="tw-pl-9 tw-bg-white"*/}
          {/*    value={searchTerm}*/}
          {/*    onChange={(e) => setSearchTerm(e.target.value)}*/}
          {/*  />*/}
          {/*</div>*/}
          <div className="tw-relative tw-w-full tw-shadow">
            <SimpleCategorySelector
              value={selectedCategory}
              onChange={handleCategoryChange}
            />
          </div>
          <Link href="/bdashboard/product-management/add" className="tw-w-full">
            <Button className="tw-w-full tw-bg-emerald-500 hover:tw-bg-emerald-600">
              <Plus className="tw-mr-2 tw-h-4 tw-w-4"/> Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-lg tw-overflow-hidden">
        <div id="table-container" className="tw-relative tw-w-full tw-overflow-auto" ref={tableRef}>
          <Table className="tw-min-w-full">
          <TableHeader className="tw-bg-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    id={index === 2 ? "resize-indicator" : undefined}
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      position: 'relative',
                    }}
                    className={cn(
                      "select-none tw-text-white tw-font-medium tw-p-3",
                      index === 0 && "tw-border-r-2 tw-border-gray-200",
                      header.column.getCanSort() && "cursor-pointer"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    {/* Div untuk resizing */}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={cn(
                          "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-1 tw-cursor-col-resize tw-user-select-none tw-touch-action-none",
                          header.column.getIsResizing()
                            ? "tw-bg-emerald-500"
                            : "tw-bg-gray-200"
                        )}
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "hover:tw-bg-emerald-50 tw-transition-colors",
                      index % 2 === 0
                        ? "tw-bg-white"
                        : "tw-bg-gray-100"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="tw-h-24 tw-text-center">
                    Tidak ada data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}