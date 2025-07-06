
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";

interface SkillsProps {
  data: string[];
  onChange: (data: string[]) => void;
}

const Skills = ({ data, onChange }: SkillsProps) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !data.some(skill => skill.toLowerCase() === trimmedSkill.toLowerCase())) {
      onChange([...data, trimmedSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <form onSubmit={addSkill} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="skill">Add Skill</Label>
          <div className="flex space-x-2">
            <Input
              id="skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter a skill (e.g., JavaScript, Project Management)"
              maxLength={50}
            />
            <Button type="submit" disabled={!newSkill.trim()}>
              Add
            </Button>
          </div>
        </div>
      </form>

      {data.length > 0 && (
        <div className="space-y-2">
          <Label>Your Skills ({data.length})</Label>
          <div className="flex flex-wrap gap-2">
            {data.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 transition-colors"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:text-destructive transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
