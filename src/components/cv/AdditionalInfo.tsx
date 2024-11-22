import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

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

  const addHobby = (hobby: string) => {
    if (hobby.trim() && !data.hobbies.includes(hobby.trim())) {
      onChange({
        ...data,
        hobbies: [...data.hobbies, hobby.trim()],
      });
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
      <div className="space-y-4">
        <Label>Languages</Label>
        {data.languages.map((lang, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-2 border rounded-lg"
          >
            <Input
              placeholder="Language"
              value={lang.language}
              onChange={(e) =>
                updateLanguage(index, "language", e.target.value)
              }
              className="flex-1"
            />
            <Input
              placeholder="Proficiency"
              value={lang.proficiency}
              onChange={(e) =>
                updateLanguage(index, "proficiency", e.target.value)
              }
              className="flex-1"
            />
            <button
              onClick={() => removeLanguage(index)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <Button onClick={addLanguage} variant="outline" className="w-full">
          Add Language
        </Button>
      </div>

      <div className="space-y-4">
        <Label>Hobbies & Interests</Label>
        <div className="flex flex-wrap gap-2">
          {data.hobbies.map((hobby, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
            >
              <span>{hobby}</span>
              <button
                onClick={() => removeHobby(hobby)}
                className="hover:text-destructive transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem(
              "hobby"
            ) as HTMLInputElement;
            addHobby(input.value);
            input.value = "";
          }}
          className="flex space-x-2"
        >
          <Input name="hobby" placeholder="Add a hobby or interest" />
          <Button type="submit">Add</Button>
        </form>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <Textarea
          id="additionalNotes"
          value={data.additionalNotes}
          onChange={(e) =>
            onChange({ ...data, additionalNotes: e.target.value })
          }
          placeholder="Any other information you'd like to include..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default AdditionalInfo;