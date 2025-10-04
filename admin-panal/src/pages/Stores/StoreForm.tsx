import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ui/ImageUpload";

import {
  createStore,
  getStoreById,
  updateStore,
} from "@/features/stores/storesThunk";

export default function StoreFormPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [description, setDescription] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [status, setStatus] = useState(true);

  // Fetch existing store in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(getStoreById(id)).then((res: any) => {
        if (res.payload) {
          const store = res.payload;
          setName(store.name || "");
          setEmail(store.email || "");
          setPhone(store.phone || "");
          setWebsite(store.website || "");
          setLogo(store.logo || "");
          setBanner(store.banner || "");
          setDescription(store.description || "");
          setPrimaryColor(store.theme?.primaryColor || "#000000");
          setSecondaryColor(store.theme?.secondaryColor || "#ffffff");
          setFontFamily(store.theme?.fontFamily || "Roboto");
          setStreet(store.address?.street || "");
          setCity(store.address?.city || "");
          setStateField(store.address?.state || "");
          setCountry(store.address?.country || "");
          setZipCode(store.address?.zip_code || "");
          setStatus(store.status === "active");
        }
      });
    }
  }, [dispatch, id, isEditMode]);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Store name is required");
    if (!email.trim()) return toast.error("Email is required");

    const payload = {
      name,
      email,
      phone,
      website,
      logo,
      banner,
      description,
      theme: {
        primaryColor,
        secondaryColor,
        fontFamily,
      },
      address: {
        street,
        city,
        state: stateField,
        country,
        zip_code: zipCode,
      },
      status: status ? "active" : "inactive",
    };

    try {
      let result;
      if (isEditMode && id) {
        result = await dispatch(updateStore({ id, data: payload }));
      } else {
        result = await dispatch(createStore(payload));
      }

      if (createStore.fulfilled.match(result) || updateStore.fulfilled.match(result)) {
        toast.success(isEditMode ? "Store updated successfully!" : "Store created successfully!");
        navigate("/stores");
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
        <Link to="/stores">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Edit Store" : "Add New Store"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEditMode ? "Update store details." : "Create a new store."}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Left section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Store Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              <div>
                <Label>Logo</Label>
                <ImageUpload value={logo} onChange={(url) => setLogo(url as string)} size={150} />
              </div>
              <div>
                <Label>Banner</Label>
                <ImageUpload value={banner} onChange={(url) => setBanner(url as string)} size={150} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              {/* Theme */}
              <div>
                <Label>Primary Color</Label>
                <Input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
              </div>
              <div>
                <Label>Secondary Color</Label>
                <Input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
              </div>
              <div>
                <Label>Font Family</Label>
                <Input value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} />
              </div>

              {/* Address */}
              <div>
                <Label>Street</Label>
                <Input value={street} onChange={(e) => setStreet(e.target.value)} />
              </div>
              <div>
                <Label>City</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div>
                <Label>State</Label>
                <Input value={stateField} onChange={(e) => setStateField(e.target.value)} />
              </div>
              <div>
                <Label>Country</Label>
                <Input value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
              <div>
                <Label>ZIP Code</Label>
                <Input value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
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
                <Label>Active</Label>
                <Switch checked={status} onCheckedChange={setStatus} />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              {isEditMode ? "Update Store" : "Create Store"}
            </Button>
            <Link to="/stores" className="flex-1">
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
