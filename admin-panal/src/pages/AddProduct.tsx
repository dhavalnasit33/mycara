// AddProduct.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Upload, X, ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function AddProduct() {
  // --- State for all fields ---
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [fabricId, setFabricId] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stockQuantity, setStockQuantity] = useState<number | "">("");
  const [discountId, setDiscountId] = useState("");
  const [labels, setLabels] = React.useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isTrending, setIsTrending] = useState(false);

  const allLabels = [
    { _id: "1", name: "Nike" },
    { _id: "2", name: "Adidas" },
    { _id: "3", name: "Levi's" },
    { _id: "4", name: "Zara" },
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // auto-generate slug from name
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const payload = {
      name,
      sku,
      description,
      category_id: categoryId,
      brand_id: brandId,
      type_id: typeId,
      fabric_id: fabricId,
      price,
      stock_quantity: stockQuantity,
      discount_id: discountId || null,
      labels,
      images,
      slug,
      is_featured: isFeatured,
      is_best_seller: isBestSeller,
      is_trending: isTrending,
    };

    console.log("Submit Payload:", payload);
    // TODO: Call your create API here
  };

  const handleImageUpload = () => {
    // implement image upload logic here
    const dummyUrl = "https://via.placeholder.com/150";
    setImages([...images, dummyUrl]);
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const handleLabelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabels(e.target.value.split(",").map((l) => l.trim()));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Add New Product
          </h1>
          <p className="text-muted-foreground">
            Create a new product for your catalog
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter product name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      placeholder="Product SKU"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Product description..."
                    className="min-h-[120px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={categoryId}
                      onValueChange={setCategoryId}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jackets">Jackets</SelectItem>
                        <SelectItem value="tshirts">T-Shirts</SelectItem>
                        <SelectItem value="pants">Pants</SelectItem>
                        <SelectItem value="dresses">Dresses</SelectItem>
                        <SelectItem value="footwear">Footwear</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select value={brandId} onValueChange={setBrandId} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nike">Nike</SelectItem>
                        <SelectItem value="adidas">Adidas</SelectItem>
                        <SelectItem value="levi">Levi's</SelectItem>
                        <SelectItem value="zara">Zara</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={typeId} onValueChange={setTypeId} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="sport">Sport</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fabric">Fabric</Label>
                    <Select
                      value={fabricId}
                      onValueChange={setFabricId}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fabric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="denim">Denim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={img}
                        className="aspect-square rounded-lg object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6"
                        onClick={() => removeImage(idx)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2 hover:border-muted-foreground/50 transition-colors"
                    onClick={handleImageUpload}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Upload Image
                    </span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Base Price *</Label>
                  <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="$0.00"
                    type="number"
                    step="0.01"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount</Label>
                  <Input
                    id="discount"
                    value={discountId}
                    onChange={(e) => setDiscountId(e.target.value)}
                    placeholder="Discount ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="labels">Labels</Label>
                  <div className="flex flex-wrap gap-2">
                    {allLabels.map((label) => (
                      <label
                        key={label._id}
                        className="flex items-center gap-1 px-2 py-1 border rounded cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <input
                          type="checkbox"
                          value={label._id}
                          checked={labels.includes(label._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setLabels([...labels, label._id]);
                            } else {
                              setLabels(
                                labels.filter((id) => id !== label._id)
                              );
                            }
                          }}
                          className="accent-blue-500"
                        />
                        {label.name}
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    placeholder="0"
                    type="number"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Status */}
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Product</Label>
                    <Switch
                      id="featured"
                      checked={isFeatured}
                      onCheckedChange={(val) => setIsFeatured(val)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="best-seller">Best Seller</Label>
                    <Switch
                      id="best-seller"
                      checked={isBestSeller}
                      onCheckedChange={(val) => setIsBestSeller(val)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="trending">Trending</Label>
                    <Switch
                      id="trending"
                      checked={isTrending}
                      onCheckedChange={(val) => setIsTrending(val)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Create Product
              </Button>
              <Link to="/products" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
