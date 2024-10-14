import { useState, useMemo } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
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
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@ecommerce/ui-kit/ui';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  rowCount: number;
  filters?: string[];
  customFilterColumn?: string;
  title?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  rowCount,
  filters,
  customFilterColumn,
  title,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: currentPage,
        pageSize,
      },
    },
    manualPagination: true,
    pageCount: totalPages,
    rowCount,
  });

  const uniqueValues = useMemo(() => {
    const values: { [key: string]: Set<any> } = {};
    if (filters) {
      filters.forEach((filter) => {
        values[filter] = new Set(data.map((item: any) => item[filter]));
      });
    }
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
    <Card className="rounded-md border-2 p-1 space-y-3 shadow-xl overflow-scroll ">
      <CardHeader className="px-6 py-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-end py-4 space-x-2">
          {customFilterColumn && <CustomFilterInput />}
          {filters &&
            filters.length > 0 &&
            filters.map((filter) => (
              <Select
                key={filter}
                onValueChange={(value) => {
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
        <Table className="md:w-full">
          <TableHeader className="rounded-lg border-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" bg-muted p-1 md:p-4  ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="p-1 md:p-4   font-bold text-sm text-muted-foreground  capitalize"
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
        <CardFooter className="flex items-center justify-end p-2 my-2 gap-2">
          <Button
            className="border rounded p-1"
            onClick={() => onPageChange(0)}
            disabled={currentPage === 0}
            variant={'link'}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            variant={'link'}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            variant={'link'}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => onPageChange(totalPages - 1)}
            variant={'link'}
            disabled={currentPage === totalPages - 1}
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
                onPageChange(Math.min(Math.max(0, page), totalPages - 1));
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
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  Show {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
