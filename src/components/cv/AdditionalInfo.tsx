
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";

interface AdditionalInfoProps {
  data: {
    languages: Array<{ language: string; proficiency: string }>;
    hobbies: string[];
    additionalNotes: string;
  };
  onChange: (data: {
    languages: Array<{ language: string; proficiency: string }>;
    hobbies: string[];
    additionalNotes: string;
  }) => void;
}

const AdditionalInfo = ({ data, onChange }: AdditionalInfoProps) => {
  const [newHobby, setNewHobby] = useState("");

  const addLanguage = () => {
    onChange({
      ...data,
      languages: [...data.languages, { language: "", proficiency: "" }],
    });
  };

  const updateLanguage = (
    index: number,
    field: "language" | "proficiency",
    value: string
  ) => {
    const updatedLanguages = data.languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    onChange({ ...data, languages: updatedLanguages });
  };

  const removeLanguage = (index: number) => {
    onChange({
      ...data,
      languages: data.languages.filter((_, i) => i !== index),
    });
  };

  const addHobby = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedHobby = newHobby.trim();
    if (trimmedHobby && !data.hobbies.some(hobby => hobby.toLowerCase() === trimmedHobby.toLowerCase())) {
      onChange({
        ...data,
        hobbies: [...data.hobbies, trimmedHobby],
      });
      setNewHobby("");
    }
  };

  const removeHobby = (hobby: string) => {
    onChange({
      ...data,
      hobbies: data.hobbies.filter((h) => h !== hobby),
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Languages Section */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Languages</Label>
        {data.languages.map((lang, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-3 border rounded-lg bg-card"
          >
            <Input
              placeholder="Language (e.g., English)"
              value={lang.language}
              onChange={(e) =>
                updateLanguage(index, "language", e.target.value)
              }
              className="flex-1"
              maxLength={30}
            />
            <Input
              placeholder="Proficiency (e.g., Native, Fluent)"
              value={lang.proficiency}
              onChange={(e) =>
                updateLanguage(index, "proficiency", e.target.value)
              }
              className="flex-1"
              maxLength={20}
            />
            <button
              onClick={() => removeLanguage(index)}
              className="text-muted-foreground hover:text-destructive transition-colors p-1"
              aria-label="Remove language"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <Button onClick={addLanguage} variant="outline" className="w-full">
          Add Language
        </Button>
      </div>

      {/* Hobbies Section */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Hobbies & Interests</Label>
        
        {data.hobbies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.hobbies.map((hobby, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 transition-colors"
              >
                <span>{hobby}</span>
                <button
                  onClick={() => removeHobby(hobby)}
                  className="hover:text-destructive transition-colors"
                  aria-label={`Remove ${hobby}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={addHobby} className="flex space-x-2">
          <Input 
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="Add a hobby or interest" 
            maxLength={30}
          />
          <Button type="submit" disabled={!newHobby.trim()}>
            Add
          </Button>
        </form>
      </div>

      {/* Additional Notes Section */}
      <div className="space-y-2">
        <Label htmlFor="additionalNotes" className="text-base font-semibold">
          Additional Notes
        </Label>
        <Textarea
          id="additionalNotes"
          value={data.additionalNotes}
          onChange={(e) =>
            onChange({ ...data, additionalNotes: e.target.value })
          }
          placeholder="Any other information you'd like to include (certifications, awards, volunteer work, etc.)..."
          className="min-h-[120px]"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground">
          {data.additionalNotes.length}/500 characters
        </p>
      </div>
    </div>
  );
};

export default AdditionalInfo;
