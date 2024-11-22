import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface EducationProps {
  data: Array<{
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
  }>;
  onChange: (data: EducationProps["data"]) => void;
}

const Education = ({ data, onChange }: EducationProps) => {
  const addEducation = () => {
    onChange([
      ...data,
      {
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    onChange(
      data.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {data.map((education, index) => (
        <Card key={index} className="p-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => removeEducation(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor={`institution-${index}`}>Institution</Label>
              <Input
                id={`institution-${index}`}
                value={education.institution}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
                placeholder="University name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`degree-${index}`}>Degree</Label>
              <Input
                id={`degree-${index}`}
                value={education.degree}
                onChange={(e) =>
                  updateEducation(index, "degree", e.target.value)
                }
                placeholder="Bachelor's, Master's, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`field-${index}`}>Field of Study</Label>
              <Input
                id={`field-${index}`}
                value={education.field}
                onChange={(e) =>
                  updateEducation(index, "field", e.target.value)
                }
                placeholder="Computer Science, Business, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`graduationDate-${index}`}>Graduation Date</Label>
              <Input
                id={`graduationDate-${index}`}
                type="date"
                value={education.graduationDate}
                onChange={(e) =>
                  updateEducation(index, "graduationDate", e.target.value)
                }
              />
            </div>
          </div>
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={addEducation}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
};

export default Education;