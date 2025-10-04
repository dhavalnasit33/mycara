import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Upload, Save, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchMe, updateMe } from "@/features/profile/profileThunk";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { ImageUpload } from "@/components/ui/ImageUpload";
import {
  fetchSettings,
  updateSettings,
} from "@/features/settings/settingsThunk";

export default function Settings() {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  // --- Profile state ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [dob, setDob] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  // --- Settings state ---
  const [siteName, setSiteName] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [favicon, setFavicon] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#64748b");
  const [buttonColor, setButtonColor] = useState("#3b82f6");
  const [footerText, setFooterText] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [fontFamily, setFontFamily] = useState("");


  // --- Fetch profile ---
  useEffect(() => {
    dispatch(fetchMe()).then((res: any) => {
      if (res.payload) {
        const u = res.payload;
        setName(u.name || "");
        setEmail(u.email || "");
        setPhone(u.mobile_number || "");
        setGender(u.gender || "");
        setDob(
          u.date_of_birth
            ? new Date(u.date_of_birth).toISOString().split("T")[0]
            : ""
        );
        setProfilePic(u.profile_picture || "");
        if (u.address) {
          setStreet(u.address.street || "");
          setCity(u.address.city || "");
          setState(u.address.state || "");
          setZip(u.address.zip_code || "");
          setCountry(u.address.country || "");
        }
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSettings()).then((res: any) => {
      if (res.payload) {
        const s = res.payload;
        setSiteName(s.site_name || "");
        setLogo(s.logo_url || null);
        setFavicon(s.favicon_url || null);
        setPrimaryColor(s.primary_color || "#3b82f6");
        setSecondaryColor(s.secondary_color || "#64748b");
        setButtonColor(s.button_color || "#3b82f6");
        setFooterText(s.footer_text || "");
        setFontFamily(s.fontFamily || "")
        setMetaTitle(s.meta_title || "");
        setMetaDescription(s.meta_description || "");
      }
    });
  }, [dispatch]);

  // --- Save Profile ---
  const handleSaveProfile = async () => {
    const payload = {
      name,
      mobile_number: phone,
      gender,
      date_of_birth: dob || null,
      profile_picture: profilePic,
      address: { street, city, state, zip_code: zip, country },
    };
    const res = await dispatch(updateMe(payload));
    if (updateMe.fulfilled.match(res)) {
      toast({
        title: "Profile Updated",
        description: "Your profile was updated successfully.",
      });
    } else {
      toast({
        title: "Update Failed",
        description: res.payload as string,
        variant: "destructive",
      });
    }
  };

  const handleSaveSettings = async () => {
    const payload = {
      site_name: siteName,
      logo_url: logo,
      font_family: fontFamily, 
      favicon_url: favicon,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      button_color: buttonColor,
      footer_text: footerText,
      meta_title: metaTitle,
      meta_description: metaDescription,
    };

    const result = await dispatch(updateSettings(payload));
    if (updateSettings.fulfilled.match(result)) {
      toast({
        title: "Settings Updated",
        description: "Settings saved successfully.",
      });
    } else {
      toast({
        title: "Update Failed",
        description: result.payload as string,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store configuration and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="gap-2">
            <SettingsIcon className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Profile Picture */}
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <ImageUpload
                    value={profilePic}
                    onChange={(val) => setProfilePic(val as string | null)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    className="border rounded-md p-2 w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Right: Address */}
            <Card>
              <CardHeader>
                <CardTitle>Address & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP/Postal Code</Label>
                    <Input
                      id="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSaveProfile}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
       <TabsContent value="appearance">
  <Card>
    <CardHeader>
      <CardTitle>Store Settings</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {/* Site Name */}
      <div className="space-y-2">
        <Label htmlFor="site-name">Site Name</Label>
        <Input
          id="site-name"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="Enter site name"
        />
      </div>

      {/* Logo & Favicon */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Logo</Label>
          <ImageUpload
            value={logo}
            onChange={(val) => setLogo(val as string | null)}
          />
        </div>
        <div className="space-y-2">
          <Label>Favicon</Label>
          <ImageUpload
            value={favicon}
            onChange={(val) => setFavicon(val as string | null)}
          />
        </div>
      </div>

      {/* Colors */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Primary Color</Label>
          <Input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Secondary Color</Label>
          <Input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Button Color</Label>
          <Input
            type="color"
            value={buttonColor}
            onChange={(e) => setButtonColor(e.target.value)}
          />
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <Label htmlFor="font-family">Font Family</Label>
        <select
          id="font-family"
          className="border rounded-md p-2 w-full"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          <option value="">Select Font</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Roboto, sans-serif">Roboto</option>
          <option value="Poppins, sans-serif">Poppins</option>
          <option value="Helvetica, sans-serif">Helvetica</option>
          <option value="Times New Roman, serif">Times New Roman</option>
          <option value="Georgia, serif">Georgia</option>
        </select>
      </div>

      {/* Footer Text */}
      <div className="space-y-2">
        <Label>Footer Text</Label>
        <Textarea
          value={footerText}
          onChange={(e) => setFooterText(e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      {/* Meta Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Meta Title</Label>
          <Input
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="min-h-[80px]"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </CardContent>
  </Card>
</TabsContent>

      </Tabs>
    </div>
  );
}
