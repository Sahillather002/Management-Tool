"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import CandidateModal from "../modals/CandidateModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [activeView, setActiveView] = React.useState<
    "all" | "accepted" | "rejected"
  >("all");
  const [selectedCandidate, setSelectedCandidate] = React.useState<any | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const filteredData = React.useMemo(() => {
    switch (activeView) {
      case "accepted":
        return data.filter((item) => item.stages === "accepted");
      case "rejected":
        return data.filter((item) => item.stages === "rejected");
      default:
        return data;
    }
  }, [activeView, data]);

  const handleRowClick = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  }

  const closeModal = () => {
    setSelectedCandidate(null);
    setModalOpen(false);
  }

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="p-4 w-full space-y-4 rounded-xl">
      <div className="flex space-x-4 pl-[60px] pb-2 border border-x-0 border-t-0 border-b-1 border-[#262626] text-[#898989]">
        {["all", "accepted", "rejected"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`relative p-2 ${activeView === view ? "text-white font-bold" : ""
              }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}{" "}
            {activeView === view && (
              <span className="absolute inset-x-0 bottom-0 mb-[-8px] h-1 bg-gradient-to-r from-purple-600 to-red-500 rounded-sm" />
            )}
          </button>
        ))}
      </div>

      {/* Table Component */}
      <div className="border-none ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border border-none rounded-2xl bg-[#262626] text-[#898989] font-medium text-[16px] overflow-hidden"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="border-b-0">
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
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.original)}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b-0 cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      {
        modalOpen && (<CandidateModal candidate={selectedCandidate} onClose={closeModal} />)
      }
    </div>
  );
}
