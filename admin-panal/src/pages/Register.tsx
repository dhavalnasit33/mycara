import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { AppDispatch, RootState } from "../store";
import { registerUser } from "@/features/auth/authThunk";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/ImageUpload";


export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile_number: "",
    profile_picture: "",
    gender: "",
    date_of_birth: "",
    address: { street: "", city: "", state: "", country: "", zip_code: "" },

    // Store Info
    storeName: "",
    storeEmail: "",
    storePhone: "",
    storeWebsite: "",
    storeLogo: "",
    storeBanner: "",
    storeDescription: "",

    // Theme section
    storeTheme: {
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      buttonColor: "#007bff",
      faviconUrl: "",
      logoUrl: "",
      fontFamily: "Roboto",
    },

    storeAddress: { street: "", city: "", state: "", country: "", zip_code: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      setForm({
        ...form,
        address: { ...form.address, [name.split(".")[1]]: value },
      });
    } else if (name.startsWith("storeAddress.")) {
      setForm({
        ...form,
        storeAddress: { ...form.storeAddress, [name.split(".")[1]]: value },
      });
    } else if (name.startsWith("storeTheme.")) {
      setForm({
        ...form,
        storeTheme: { ...form.storeTheme, [name.split(".")[1]]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Helper to remove empty address objects
  const cleanAddress = (addressObj: any) => {
    const allEmpty = Object.values(addressObj).every((v) => v === "");
    return allEmpty ? null : addressObj;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      role: "store_owner",
      address: cleanAddress(form.address),
      storeAddress: cleanAddress(form.storeAddress),
    };

    const result = await dispatch(registerUser(payload));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Store owner registered successfully!");
      navigate("/dashboard");
    } else {
      toast.error((result.payload as string) || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Register Store Owner
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ================== Personal Info ================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* ================== Contact Info ================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="mobile_number"
              value={form.mobile_number}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ================== Profile Picture ================== */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Profile Picture</label>
            <ImageUpload
              value={form.profile_picture}
              onChange={(url: string | null) =>
                setForm({ ...form, profile_picture: url || "" })
              }
              multiple={false}
            />
          </div>

          {/* ================== Address ================== */}
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["street", "city", "state", "country", "zip_code"].map((field) => (
              <input
                key={field}
                type="text"
                name={`address.${field}`}
                value={(form.address as any)[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* ================== Store Info ================== */}
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Store Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="storeName"
              value={form.storeName}
              onChange={handleChange}
              placeholder="Store Name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="storeEmail"
              value={form.storeEmail}
              onChange={handleChange}
              placeholder="Store Email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="storePhone"
              value={form.storePhone}
              onChange={handleChange}
              placeholder="Store Phone"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="storeWebsite"
              value={form.storeWebsite}
              onChange={handleChange}
              placeholder="Store Website"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ================== Store Media ================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Store Logo</label>
              <ImageUpload
                value={form.storeLogo}
                onChange={(url: string | null) => setForm({ ...form, storeLogo: url || "" })}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Store Banner</label>
              <ImageUpload
                value={form.storeBanner}
                onChange={(url: string | null) =>
                  setForm({ ...form, storeBanner: url || "" })
                }
              />
            </div>
          </div>

          {/* ================== Store Description ================== */}
          <textarea
            name="storeDescription"
            value={form.storeDescription}
            onChange={handleChange}
            placeholder="Store Description"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 h-24"
          />

          {/* ================== Store Theme ================== */}
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Store Theme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label>Primary Color</label>
              <input
                type="color"
                name="storeTheme.primaryColor"
                value={form.storeTheme.primaryColor}
                onChange={handleChange}
                className="w-full h-10 cursor-pointer"
              />
            </div>
            <div>
              <label>Secondary Color</label>
              <input
                type="color"
                name="storeTheme.secondaryColor"
                value={form.storeTheme.secondaryColor}
                onChange={handleChange}
                className="w-full h-10 cursor-pointer"
              />
            </div>
            <div>
              <label>Button Color</label>
              <input
                type="color"
                name="storeTheme.buttonColor"
                value={form.storeTheme.buttonColor}
                onChange={handleChange}
                className="w-full h-10 cursor-pointer"
              />
            </div>
          </div>

          {/* Favicon & Theme Logo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Favicon</label>
              <ImageUpload
                value={form.storeTheme.faviconUrl}
                onChange={(url: string | null) =>
                  setForm({
                    ...form,
                    storeTheme: { ...form.storeTheme, faviconUrl: url || "" },
                  })
                }
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Theme Logo</label>
              <ImageUpload
                value={form.storeTheme.logoUrl}
                onChange={(url: string | null) =>
                  setForm({
                    ...form,
                    storeTheme: { ...form.storeTheme, logoUrl: url || "" },
                  })
                }
              />
            </div>
          </div>

          {/* Font Family */}
          <div className="mt-3">
            <label className="block mb-1 text-gray-700 font-medium">Font Family</label>
            <input
              type="text"
              name="storeTheme.fontFamily"
              value={form.storeTheme.fontFamily}
              onChange={handleChange}
              placeholder="e.g. Roboto, Arial"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ================== Store Address ================== */}
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Store Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["street", "city", "state", "country", "zip_code"].map((field) => (
              <input
                key={field}
                type="text"
                name={`storeAddress.${field}`}
                value={(form.storeAddress as any)[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* ================== Submit Button ================== */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Registering..." : "Register Store Owner"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
