import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ExperienceProps {
  data: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  onChange: (data: ExperienceProps["data"]) => void;
}

const Experience = ({ data, onChange }: ExperienceProps) => {
  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    onChange(
      data.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {data.map((experience, index) => (
        <Card key={index} className="p-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => removeExperience(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input
                id={`company-${index}`}
                value={experience.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                placeholder="Company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`position-${index}`}>Position</Label>
              <Input
                id={`position-${index}`}
                value={experience.position}
                onChange={(e) =>
                  updateExperience(index, "position", e.target.value)
                }
                placeholder="Job title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                <Input
                  id={`startDate-${index}`}
                  type="date"
                  value={experience.startDate}
                  onChange={(e) =>
                    updateExperience(index, "startDate", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`endDate-${index}`}>End Date</Label>
                <Input
                  id={`endDate-${index}`}
                  type="date"
                  value={experience.endDate}
                  onChange={(e) =>
                    updateExperience(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                value={experience.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                placeholder="Describe your responsibilities and achievements"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={addExperience}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Experience
      </Button>
    </div>
  );
};

export default Experience;