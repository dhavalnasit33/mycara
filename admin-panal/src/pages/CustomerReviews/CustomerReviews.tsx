"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { AppDispatch } from "@/store";
import {
  fetchCustomerReviews,
  deleteCustomerReview,
  bulkDeleteCustomerReviews,
  updateReviewsStatus,
} from "@/features/customerReviews/customerReviewsThunk";
import { GenericTable } from "@/components/ui/adminTable";

export default function CustomerReviewsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const columns = [
    {
      key: "user_id",
      label: "User",
      render: (item: any) => item.user_id?.name || "-",
    },
    {
      key: "user_id",
      label: "Email",
      render: (item: any) => item.user_id?.email || "-",
    },
    {
      key: "product_id",
      label: "Product",
      render: (item: any) => item.product_id?.name || "-",
    },
    { key: "rating", label: "Rating" },
    { key: "comment", label: "Comment" },
  ];

  return (
    <GenericTable
      title="Customer Reviews"
      columns={columns}
      rowKey="_id"
      searchEnabled
      statusToggleEnabled
      filters={[
        { label: "Approved", value: "true" },
        { label: "Pending", value: "false" },
      ]}
      fetchData={async ({ page, limit, search, status }) => {
        const boolStatus =
          status === "true" ? true : status === "false" ? false : undefined;

        try {
          const res = await dispatch(
            fetchCustomerReviews({ page, limit, search, is_approved: boolStatus })
          ).unwrap();

          return { data: res.customerReviews, total: res.total };
        } catch (err: any) {
          console.error("fetchData error:", err);
          throw new Error(err || "Failed to load reviews");
        }
      }}
      deleteItem={async (id) => {
        try {
          await dispatch(deleteCustomerReview(id)).unwrap();
        } catch (err: any) {
          throw new Error(err || "Failed to delete review");
        }
      }}
      bulkDeleteItems={async (ids) => {
        try {
          await dispatch(bulkDeleteCustomerReviews(ids)).unwrap();
        } catch (err: any) {
          throw new Error(err || "Failed to delete reviews");
        }
      }}
      onStatusToggle={async (id, newStatus) => {
        try {
          await dispatch(
            updateReviewsStatus({ id, is_approved: newStatus })
          ).unwrap();
        } catch (err: any) {
          throw new Error(err?.message || "Failed to update status");
        }
      }}
      
    />
  );
}
