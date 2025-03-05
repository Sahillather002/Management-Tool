"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../ui/badge";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { TaskType } from "../../lib/validations/schema";
import {
  label_options,
  priority_options,
  stages_options,
} from "../filters";

export const columns: ColumnDef<TaskType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = label_options.find(
        (label) => label.value === row.original.label
      );

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = stages_options.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priority_options.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const field = row.getValue("due_date") as Date;
      return <div>{field.toDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const candidate_columns: ColumnDef<TaskType>[] = [
  {
    accessorKey: "image_url",
    header: ({}) => <></>,
    cell: ({ row }) => (
      <div className="w-[0px] hidden">
        <Image
          src={row.getValue("image_url")}
          alt="img"
          height={20}
          width={20}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CANDIDATE NAME" />
    ),
    cell: ({ row }) => (
      <div className=" flex gap-2 items-center">
        <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center">
          <Image
            src={row.getValue("image_url")}
            className="object-cover w-full h-full"
            alt="img"
            height={20}
            width={20}
          />
        </div>
        {row.getValue("name")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RATING" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Image src="/star.png" alt="" height={20} width={20} />
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("rating")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "stages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STAGES" />
    ),
    cell: ({ row }) => {
      const stage = stages_options.find(
        (stage) => stage.value === row.getValue("stages")
      );

      if (!stage) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{stage.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "applied_role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="APPLIED ROLE" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("applied_role")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "application_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="APPLICATION DATE" />
    ),
    cell: ({ row }) => {
      const field = row.getValue("application_date") as Date;
      return <div>{field?.toDateString()}</div>;
    },
  },
  {
    accessorKey: "attachments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ATTACHMENTS" />
    ),
    cell: ({ row }) => {
      const attachments = row.getValue("attachments") as string[];

      const attachmentCount = Array.isArray(attachments)
        ? attachments.length
        : 0;
      const firstAttachment = Array.isArray(attachments)
        ? attachments[0]
        : null;

      return (
        <div className="flex items-center">
          {firstAttachment && (
            <Image
              src="/attachments.png"
              alt="Attachment"
              height={20}
              width={20}
            />
          )}
          <span>
            {attachmentCount} file{attachmentCount !== 1 ? "s" : ""}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
