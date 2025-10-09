"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/store";
import {
  fetchSections,
  deleteSection,
  bulkDeleteSections,
  updateSectionStatus,
} from "@/features/sections/sectionsThunk";
import { GenericTable } from "@/components/ui/adminTable";

export default function Sections() {
  const dispatch = useDispatch<AppDispatch>();

  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "order", label: "Order" },
    {
      key: "is_button",
      label: "Button",
      render: (item: any) =>
        item.is_button ? `${item.button_name} (${item.button_link})` : "No",
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (item: any) =>
        item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
    },
  ];

  return (
    <GenericTable
      title="Sections"
      columns={columns}
      rowKey="_id"
      searchEnabled
      statusToggleEnabled
      filters={[
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ]}
      fetchData={async ({ page, limit, search, status }) => {
        try {
          const res = await dispatch(
            fetchSections({ page, limit, search, status })
          ).unwrap();
          return { data: res.sections, total: res.total };
        } catch (err: any) {
          console.error("Failed to fetch sections:", err);
          throw new Error(err?.message || "Failed to fetch sections");
        }
      }}
      deleteItem={async (id) => {
        try {
          await dispatch(deleteSection(id)).unwrap();
        } catch (err: any) {
          throw new Error(err?.message || "Failed to delete section");
        }
      }}
      bulkDeleteItems={async (ids) => {
        try {
          await dispatch(bulkDeleteSections(ids)).unwrap();
        } catch (err: any) {
          throw new Error(err?.message || "Failed to delete sections");
        }
      }}
      onStatusToggle={async (id, newStatus) => {
        try {
          await dispatch(
            updateSectionStatus({
              id,
              status: newStatus ? "active" : "inactive",
            })
          ).unwrap();
        } catch (err: any) {
          throw new Error(err?.message || "Failed to update status");
        }
      }}
      headerActions={
        <Link to="/sections/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Section
          </Button>
        </Link>
      }
    />
  );
}
