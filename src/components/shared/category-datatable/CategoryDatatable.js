'use client'
import {useState, useCallback, useEffect} from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {ChevronDown, ChevronUp, Loader2} from "lucide-react"
import SimpleCategorySelector from "@/components/shared/categories/SimpleCategorySelector";

// Contoh komponen tabel yang bisa digunakan untuk kategori
export function CategoryDatatable({ data, columns, onEdit, isLoading = false }) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredData(data);
    } else {
      // Filter data berdasarkan ID kategori yang dipilih
      // Sesuaikan properti yang digunakan untuk filtering (misalnya 'id', 'parentId', dll)
      // sesuai dengan struktur data dan kebutuhan Anda
      const filtered = data.filter(item => {
        // Contoh filter berdasarkan ID atau parentId
        return (
          item.id === selectedCategory ||
          item.parentId === selectedCategory ||
          item.group === selectedCategory
        );
      });
      setFilteredData(filtered);
    }
  }, [selectedCategory, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    console.log("Kategori yang dipilih:", categoryId);

    table.setPageIndex(0);

  }, [table]);

  return (
    <div className="tw-space-y-4">
      <div className="tw-flex tw-items-center tw-justify-between">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="tw-max-w-sm"
        />
        <div className="tw-relative tw-w-fit tw-shadow">
          <SimpleCategorySelector
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
        </div>
      </div>
      <div className="tw-rounded-md tw-border">
        <Table>
          <TableHeader className="!tw-rounded-t-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="tw-whitespace-nowrap tw-bg-black tw-text-white"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "tw-flex tw-items-center tw-cursor-pointer tw-select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUp className="tw-ml-2 tw-h-4 tw-w-4"/>,
                          desc: <ChevronDown className="tw-ml-2 tw-h-4 tw-w-4"/>,
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="tw-h-64 tw-text-center"
                  >
                    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full">
                      <Loader2 className="tw-h-8 tw-w-8 tw-animate-spin tw-text-primary tw-mb-2" />
                      <span className="tw-text-muted-foreground">Loading Category data...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) :  table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={rowIndex % 2 === 1 ? "tw-bg-gray-100" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="tw-h-24 tw-text-center"
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="tw-flex tw-items-center tw-justify-between tw-pt-7">
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-space-x-2">
            <span className="tw-text-sm tw-text-muted-foreground">
              Data per page
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
              className="tw-border tw-rounded-md tw-p-1"
            >
              {[2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="tw-text-sm tw-text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
        </div>
        <div className="tw-flex tw-gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="tw-flex tw-items-center tw-gap-1">
            {Array.from(
              { length: Math.min(5, table.getPageCount()) },
              (_, i) => {
                // Hitung rentang halaman yang akan ditampilkan
                let startPage = 0;
                if (table.getPageCount() > 5) {
                  startPage = Math.max(
                    0,
                    Math.min(
                      table.getState().pagination.pageIndex - 2,
                      table.getPageCount() - 5
                    )
                  );
                }
                return i + startPage;
              }
            ).map((pageIndex) => (
              <Button
                key={pageIndex}
                variant={pageIndex === table.getState().pagination.pageIndex ? "default" : "outline"}
                size="sm"
                onClick={() => table.setPageIndex(pageIndex)}
                className="tw-w-8 tw-h-8 tw-p-0"
              >
                {pageIndex + 1}
              </Button>
            ))}

            {table.getPageCount() > 5 &&
              table.getState().pagination.pageIndex < table.getPageCount() - 3 && (
                <>
                  <span className="tw-mx-1">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    className="tw-w-8 tw-h-8 tw-p-0"
                  >
                    {table.getPageCount()}
                  </Button>
                </>
              )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}