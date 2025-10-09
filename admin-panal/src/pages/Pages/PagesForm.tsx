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
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/ImageUpload";
import {
  createPage,
  getPageById,
  updatePage,
} from "@/features/pages/pagesThunk";

export default function PageFormPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  // 🧠 Page States
  const [pageName, setPageName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [order, setOrder] = useState<number | "">("");

  // 🧩 SEO States
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeyphrase, setMetaKeyphrase] = useState("");
  const [seoImage, setSeoImage] = useState("");

  // 📦 Sections
  const [sections, setSections] = useState([
    {
      title: "",
      description: "",
      image_url: "",
      background_image_url: "",
      order: 1,
      is_button: false,
      button_name: "",
      button_link: "",
      status: "active",
    },
  ]);

  // Auto-generate slug
  useEffect(() => {
    if (!isEditMode && pageName) {
      const generated = pageName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  }, [pageName, isEditMode]);

  // Fetch existing page when editing
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(getPageById(id)).then((res: any) => {
        if (res.payload) {
          const page = res.payload;
          setPageName(page.page_name || "");
          setSlug(page.slug || "");
          setDescription(page.description || "");
          setMetaTitle(page.meta_title || "");
          setMetaDescription(page.meta_description || "");
          setMetaKeyphrase(page.meta_keyphrase || "");
          setSeoImage(page.seo_image || "");
          setStatus(page.status || "active");
          setOrder(page.order || 1);
          setSections(page.sections || []);
        }
      });
    }
  }, [dispatch, id, isEditMode]);

  // ➕ Add / Remove Section
  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        description: "",
        image_url: "",
        background_image_url: "",
        order: sections.length + 1,
        is_button: false,
        button_name: "",
        button_link: "",
        status: "active",
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  // 📝 Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageName.trim()) return toast.error("Please enter page name");

    const payload = {
      page_name: pageName,
      slug,
      description,
      meta_title: metaTitle,
      meta_description: metaDescription,
      meta_keyphrase: metaKeyphrase,
      seo_image: seoImage,
      sections,
      status,
      order,
    };

    try {
      let result;
      if (isEditMode && id) {
        result = await dispatch(updatePage({ id, data: payload }));
      } else {
        result = await dispatch(createPage(payload));
      }

      if (
        createPage.fulfilled.match(result) ||
        updatePage.fulfilled.match(result)
      ) {
        toast.success(
          isEditMode
            ? "Page updated successfully!"
            : "Page created successfully!"
        );
        navigate("/pages");
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
        <Link to="/pages">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Edit Page" : "Add New Page"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEditMode
              ? "Update page content and sections."
              : "Create a new dynamic page."}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Left: Page & SEO */}
        <div className="lg:col-span-2 space-y-6">
          {/* Page Info */}
          <Card className="shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Page Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label>Page Name *</Label>
                <Input
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                />
              </div>

              <div>
                <Label>Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short page description..."
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                SEO Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label>Meta Title</Label>
                <Input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
              </div>
              <div>
                <Label>Meta Keyphrase</Label>
                <Input
                  value={metaKeyphrase}
                  onChange={(e) => setMetaKeyphrase(e.target.value)}
                />
              </div>
              <div>
                <Label>SEO Image</Label>
                <ImageUpload
                  value={seoImage}
                  onChange={(url) => setSeoImage(url as string)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          <Card className="shadow-md border border-gray-200">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                Page Sections
              </CardTitle>
              <Button type="button" size="sm" onClick={addSection}>
                <Plus className="w-4 h-4 mr-2" /> Add Section
              </Button>
            </CardHeader>

            <CardContent className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="border p-4 rounded-lg relative">
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </button>

                  <Label>Title</Label>
                  <Input
                    value={section.title}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[index].title = e.target.value;
                      setSections(updated);
                    }}
                  />

                  <Label>Description</Label>
                  <Textarea
                    value={section.description}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[index].description = e.target.value;
                      setSections(updated);
                    }}
                  />

                  <Label>Image</Label>
                  <ImageUpload
                    value={section.image_url}
                    onChange={(url) => {
                      const updated = [...sections];
                      updated[index].image_url = url as string;
                      setSections(updated);
                    }}
                  />

                  <Label>Background Image</Label>
                  <ImageUpload
                    value={section.background_image_url}
                    onChange={(url) => {
                      const updated = [...sections];
                      updated[index].background_image_url = url as string;
                      setSections(updated);
                    }}
                  />

                  <div className="flex items-center justify-between">
                    <Label>Include Button</Label>
                    <Switch
                      checked={section.is_button}
                      onCheckedChange={(val) => {
                        const updated = [...sections];
                        updated[index].is_button = val;
                        setSections(updated);
                      }}
                    />
                  </div>

                  {section.is_button && (
                    <>
                      <Label>Button Name</Label>
                      <Input
                        value={section.button_name}
                        onChange={(e) => {
                          const updated = [...sections];
                          updated[index].button_name = e.target.value;
                          setSections(updated);
                        }}
                      />
                      <Label>Button Link</Label>
                      <Input
                        value={section.button_link}
                        onChange={(e) => {
                          const updated = [...sections];
                          updated[index].button_link = e.target.value;
                          setSections(updated);
                        }}
                      />
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Status & Actions */}
        <div className="space-y-6">
          <Card className="sticky top-6 shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="status">Active</Label>
                <Switch
                  id="status"
                  checked={status === "inactive"}
                  onCheckedChange={(val) =>
                    setStatus(val ? "inactive" : "active")
                  }
                />
              </div>

              <div>
                <Label>Order</Label>
                <Input
                  type="number"
                  value={order === "" ? "" : order}
                  onChange={(e) =>
                    setOrder(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isEditMode ? "Update Page" : "Create Page"}
            </Button>
            <Link to="/pages" className="flex-1">
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
