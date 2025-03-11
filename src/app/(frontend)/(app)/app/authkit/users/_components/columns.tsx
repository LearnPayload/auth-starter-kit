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
        <div className="w-32 text-center text-xs opacity-45">&mdash;</div>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleString(),
  },
];
