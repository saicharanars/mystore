import React, { useState, useMemo, useEffect } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import {
  Input,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
} from '@ecommerce/ui-kit/ui';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  filters?: string[];
  customFilterColumn?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  filters,
  customFilterColumn,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    console.log('Column Filters:', columnFilters);
  }, [columnFilters]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: currentPage,
        pageSize,
      },
    },
  });

  useEffect(() => {
    console.log('Filtered Rows:', table.getRowModel().rows);
  }, [table]);

  const uniqueValues = useMemo(() => {
    const values: { [key: string]: Set<any> } = {};
    if (filters) {
      filters.forEach((filter) => {
        values[filter] = new Set(data.map((item: any) => item[filter]));
      });
    }
    console.log('Unique Values:', values);
    return values;
  }, [data, filters]);

  const CustomFilterInput = () => (
    <Input
      placeholder={`Filter ${customFilterColumn}...`}
      value={
        (table
          .getColumn(customFilterColumn || '')
          ?.getFilterValue() as string) ?? ''
      }
      onChange={(event) =>
        table
          .getColumn(customFilterColumn || '')
          ?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );

  return (
    <div className="rounded-md border-2 p-1 space-y-3 shadow-xl ">
      <div className="flex items-center justify-end py-4 space-x-2">
        {customFilterColumn && <CustomFilterInput />}
        {filters &&
          filters.length > 0 &&
          filters.map((filter) => (
            <Select
              key={filter}
              onValueChange={(value) => {
                console.log('Setting filter value for', filter, ':', value);
                table.getColumn(filter)?.setFilterValue(value || undefined);
              }}
              value={
                (table.getColumn(filter)?.getFilterValue() as string) ??
                undefined
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={`Select ${filter}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{filter}</SelectItem>
                {Array.from(uniqueValues[filter] || []).map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
      </div>
      <Table>
        <TableHeader className="rounded-lg border-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-green-500 hover:bg-green-700 p-1 md:p-4  "
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="p-1 md:p-4  text-white font-bold text-sm md:text-lg capitalize"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="p-2 m-1"
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="p-1 md:p-4 m-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end p-2 my-2 gap-2">
        <Button
          className="border rounded p-1"
          onClick={() => onPageChange(0)}
          disabled={!table.getCanPreviousPage()}
          variant={'link'}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!table.getCanPreviousPage()}
          variant={'link'}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!table.getCanNextPage()}
          variant={'link'}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => onPageChange(totalPages - 1)}
          variant={'link'}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {currentPage + 1} of {totalPages}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={currentPage + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              onPageChange(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <Select
          value={String(pageSize)}
          onValueChange={(value: string) => {
            onPageSizeChange(Number(value));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={String(pageSize)}>
                Show {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
