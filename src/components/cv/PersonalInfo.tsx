
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PersonalInfoProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    profilePicture: File | null;
  };
  onChange: (data: PersonalInfoProps["data"]) => void;
}

const PersonalInfo = ({ data, onChange }: PersonalInfoProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.error('Please select an image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        console.error('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.onerror = () => {
        console.error('Error reading file');
      };
      reader.readAsDataURL(file);
      onChange({ ...data, profilePicture: file });
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0]?.toUpperCase() || "?";
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32 border-4 border-gray-200">
          <AvatarImage src={previewUrl} alt="Profile picture" />
          <AvatarFallback className="bg-muted text-2xl font-semibold">
            {getInitials(data.fullName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-picture"
          />
          <Label
            htmlFor="profile-picture"
            className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors underline"
          >
            {previewUrl ? "Change Profile Picture" : "Upload Profile Picture"}
          </Label>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="+1 234 567 890"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => onChange({ ...data, location: e.target.value })}
            placeholder="City, Country"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
