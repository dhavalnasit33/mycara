import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import {
  createSection,
  getSectionById,
  updateSection,
} from "@/features/sections/sectionsThunk";
import { ImageUpload } from "@/components/ui/ImageUpload";

export default function SectionFormPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  // 📝 Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [order, setOrder] = useState<number | "">("");
  const [isButton, setIsButton] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [status, setStatus] = useState(true);

  // ✨ Fetch existing section in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(getSectionById(id)).then((res: any) => {
        if (res.payload) {
          const section = res.payload;
          setTitle(section.title || "");
          setDescription(section.description || "");
          setImageUrl(section.image_url || "");
          setBackgroundImageUrl(section.background_image_url || "");
          setOrder(section.order || 0);
          setIsButton(section.is_button || false);
          setButtonName(section.button_name || "");
          setButtonLink(section.button_link || "");
          setStatus(section.status === "active");
        }
      });
    }
  }, [dispatch, id, isEditMode]);

  // 📝 Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Please enter section title");

    const payload = {
      title,
      description,
      image_url: imageUrl,
      background_image_url: backgroundImageUrl,
      order,
      is_button: isButton,
      button_name: buttonName,
      button_link: buttonLink,
      status: status ? "active" : "inactive",
    };

    try {
      let result;
      if (isEditMode && id) {
        result = await dispatch(updateSection({ id, data: payload }));
      } else {
        result = await dispatch(createSection(payload));
      }

      if (
        createSection.fulfilled.match(result) ||
        updateSection.fulfilled.match(result)
      ) {
        toast.success(
          isEditMode
            ? "Section updated successfully!"
            : "Section created successfully!"
        );
        navigate("/sections");
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
        <Link to="/sections">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Edit Section" : "Add New Section"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEditMode ? "Update section details." : "Create a new section."}
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
                Section Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter section description..."
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image</Label>
                <ImageUpload
                  value={imageUrl}
                  onChange={(url) => setImageUrl(url as string)}
                  size={150} // optional: adjust size
                />
              </div>

              <div>
                <Label htmlFor="backgroundImageUrl">Background Image</Label>
                <ImageUpload
                  value={backgroundImageUrl}
                  onChange={(url) => setBackgroundImageUrl(url as string)}
                  size={150} // optional
                />
              </div>

              <div>
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={order === "" ? "" : order}
                  onChange={(e) => {
                    const val = e.target.value;
                    setOrder(val === "" ? "" : Number(val));
                  }}
                />
              </div>

              <div className="flex items-center gap-4">
                <Switch
                  id="isButton"
                  checked={isButton}
                  onCheckedChange={(val) => setIsButton(val)}
                />
                <Label htmlFor="isButton">Include Button</Label>
              </div>

              {isButton && (
                <>
                  <div>
                    <Label htmlFor="buttonName">Button Name</Label>
                    <Input
                      id="buttonName"
                      value={buttonName}
                      onChange={(e) => setButtonName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="buttonLink">Button Link</Label>
                    <Input
                      id="buttonLink"
                      value={buttonLink}
                      onChange={(e) => setButtonLink(e.target.value)}
                    />
                  </div>
                </>
              )}
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
              {isEditMode ? "Update Section" : "Create Section"}
            </Button>
            <Link to="/sections" className="flex-1">
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
