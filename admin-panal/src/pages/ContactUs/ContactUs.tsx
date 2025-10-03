"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Trash2, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/ui/confirmDialog";
import { bulkDeleteContactMessages, deleteContactMessage, fetchContactMessages } from "@/features/contactUs/contactUsThunk";

export default function ContactUs() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: contacts, total, loading } = useSelector(
    (state: RootState) => state.contactUs
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const limit = 10;

  // Fetch contacts
  useEffect(() => {
    dispatch(fetchContactMessages({ page, limit, search: searchQuery }));
  }, [dispatch, page, searchQuery]);

  // Single delete
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteContactMessage(id)).unwrap();
      toast.success("Message deleted.");
    } catch {
      toast.error("Failed to delete message.");
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    try {
      await dispatch(bulkDeleteContactMessages(selectedIds)).unwrap();
      toast.success("Selected messages deleted.");
      setSelectedIds([]);
    } catch {
      toast.error("Bulk delete failed.");
    }
  };

  // Export Excel
  const handleDownload = async () => {
    const res = await dispatch(fetchContactMessages({ isDownload: true })).unwrap();
    const data = res.contacts.map((msg: any) => ({
      Name: msg.name,
      Email: msg.email,
      Subject: msg.subject,
      Message: msg.message,
      "Submitted At": new Date(msg.createdAt).toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ContactUs");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), `contact_us_${Date.now()}.xlsx`);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-8 p-6 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Contact Us
          </h1>
          <p className="text-sm text-gray-500">
            Manage contact form submissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Search & Bulk Actions */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {selectedIds.length > 0 && (
            <ConfirmDialog
              title="Delete Selected"
              description={`Delete ${selectedIds.length} messages permanently.`}
              confirmText="Delete"
              onConfirm={handleBulkDelete}
              danger
            >
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" /> Delete Selected
              </Button>
            </ConfirmDialog>
          )}
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Messages <span className="text-gray-400 font-normal">({total})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
  <table className="w-full text-sm border-collapse">
    <thead className="bg-gray-50 text-gray-700 text-sm font-medium">
      <tr>
        <th className="p-3 w-10 text-left">
          <Checkbox
            checked={selectedIds.length === contacts.length && contacts.length > 0}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedIds(contacts.map((msg) => msg._id));
              } else {
                setSelectedIds([]);
              }
            }}
          />
        </th>
        <th className="p-3 text-left w-40">Name</th>
        <th className="p-3 text-left w-40">Email</th>
        <th className="p-3 text-left w-32">Order Id</th>
        <th className="p-3 text-left w-[400px]">Message</th>
        <th className="p-3 text-left w-40">Submitted At</th>
        <th className="p-3 text-right w-20">Actions</th>
      </tr>
    </thead>

    <tbody>
      {contacts.length > 0 ? (
        contacts.map((msg) => (
          <tr key={msg._id} className="border-t hover:bg-gray-50 align-top">
            <td className="p-3">
              <Checkbox
                checked={selectedIds.includes(msg._id)}
                onCheckedChange={() =>
                  setSelectedIds((prev) =>
                    prev.includes(msg._id)
                      ? prev.filter((id) => id !== msg._id)
                      : [...prev, msg._id]
                  )
                }
              />
            </td>
            <td className="p-3 w-40 break-words">{msg.name}</td>
            <td className="p-3 w-40 break-words">{msg.email}</td>
            <td className="p-3 w-32">{msg.subject}</td>
            <td className="p-3 w-[400px] break-words truncate max-w-[400px]">
              {msg.message}
            </td>
            <td className="p-3 w-40">{new Date(msg.createdAt).toLocaleString()}</td>
            <td className="p-3 w-20 text-right">
              <ConfirmDialog
                title="Delete Message"
                description="Are you sure?"
                confirmText="Delete"
                onConfirm={() => handleDelete(msg._id)}
                danger
              >
                <button className="text-red-600 hover:bg-red-50 p-1 rounded">
                  <Trash2 className="h-4 w-4" />
                </button>
              </ConfirmDialog>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={7} className="p-4 text-center text-gray-500">
            No messages found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
