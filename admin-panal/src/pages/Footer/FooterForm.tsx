import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import {
  createFooterItem,
  getFooterItemById,
  updateFooterItem,
} from "@/features/footer/footerThunk";

export default function FooterFormPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  // 📝 Form States
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [order, setOrder] = useState<number | "">("");
  const [status, setStatus] = useState(true);

  // ✨ Fetch existing footer item in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(getFooterItemById(id)).then((res: any) => {
        if (res.payload) {
          const item = res.payload;
          setLabel(item.label || "");
          setUrl(item.url || "");
          setOrder(item.order ?? 0);
          setStatus(item.status === "active");
        }
      });
    }
  }, [dispatch, id, isEditMode]);

  // 📝 Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return toast.error("Please enter footer label");
    if (!url.trim()) return toast.error("Please enter footer URL");

    const payload = {
      label,
      url,
      order,
      status: status ? "active" : "inactive",
    };

    try {
      let result;
      if (isEditMode && id) {
        result = await dispatch(updateFooterItem({ id, data: payload }));
      } else {
        result = await dispatch(createFooterItem(payload));
      }

      if (
        createFooterItem.fulfilled.match(result) ||
        updateFooterItem.fulfilled.match(result)
      ) {
        toast.success(
          isEditMode
            ? "Footer item updated successfully!"
            : "Footer item created successfully!"
        );
        navigate("/footer");
      } else {
        toast.error((result.payload as string) || "Something went wrong");
      }
    } catch {
      toast.error("Server Error");
    }
  };

  return (
    <div className="p-6 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/footer">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Edit Footer Item" : "Add New Footer Item"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEditMode
              ? "Update footer item details."
              : "Create a new footer item."}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Left section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Footer Item Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="label">Label *</Label>
                <Input
                  id="label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="/privacy, /contact, etc."
                />
              </div>

  
            </CardContent>
          </Card>
        </div>

        {/* Right section */}
        <div className="space-y-6">
          <Card className="sticky top-6 shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="status">Active</Label>
                <Switch
                  id="status"
                  checked={status}
                  onCheckedChange={setStatus}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isEditMode ? "Update Footer Item" : "Create Footer Item"}
            </Button>
            <Link to="/footer" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
