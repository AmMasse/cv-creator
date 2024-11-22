import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";

interface ReferencesProps {
  data: Array<{
    name: string;
    position: string;
    company: string;
    email: string;
    phone: string;
  }>;
  onChange: (data: Array<{
    name: string;
    position: string;
    company: string;
    email: string;
    phone: string;
  }>) => void;
}

const References = ({ data, onChange }: ReferencesProps) => {
  const addReference = () => {
    onChange([
      ...data,
      { name: "", position: "", company: "", email: "", phone: "" },
    ]);
  };

  const updateReference = (index: number, field: string, value: string) => {
    const updatedReferences = data.map((ref, i) =>
      i === index ? { ...ref, [field]: value } : ref
    );
    onChange(updatedReferences);
  };

  const removeReference = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {data.map((reference, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg relative">
          <button
            onClick={() => removeReference(index)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>Name</Label>
              <Input
                id={`name-${index}`}
                value={reference.name}
                onChange={(e) => updateReference(index, "name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`position-${index}`}>Position</Label>
              <Input
                id={`position-${index}`}
                value={reference.position}
                onChange={(e) => updateReference(index, "position", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input
                id={`company-${index}`}
                value={reference.company}
                onChange={(e) => updateReference(index, "company", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`email-${index}`}>Email</Label>
              <Input
                id={`email-${index}`}
                type="email"
                value={reference.email}
                onChange={(e) => updateReference(index, "email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`phone-${index}`}>Phone</Label>
              <Input
                id={`phone-${index}`}
                type="tel"
                value={reference.phone}
                onChange={(e) => updateReference(index, "phone", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      <Button onClick={addReference} className="w-full">
        Add Reference
      </Button>
    </div>
  );
};

export default References;