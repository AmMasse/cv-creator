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
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
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
              placeholder="Enter a skill"
            />
            <Button type="submit">Add</Button>
          </div>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-2 hover:text-destructive transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;