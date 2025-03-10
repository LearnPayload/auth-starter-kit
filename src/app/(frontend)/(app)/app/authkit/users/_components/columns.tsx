"use client";

import { UserInfo } from "@/authkit/components/user-info";
import { User } from "@/payload-types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <UserInfo user={row.original} />,
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "_verified",
    header: "Verified",
  },

  {
    accessorKey: "last_signed_in",
    header: "Last signed in",
    cell: ({ row }) =>
      row.getValue("last_signed_in") ? (
        new Date(row.getValue("last_signed_in")).toLocaleString()
      ) : (
        <div className="text-xs opacity-45 text-center w-32">&mdash;</div>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleString(),
  },
];
