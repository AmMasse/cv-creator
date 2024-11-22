import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PersonalInfo from "@/components/cv/PersonalInfo";
import Experience from "@/components/cv/Experience";
import Education from "@/components/cv/Education";
import Skills from "@/components/cv/Skills";
import Preview from "@/components/cv/Preview";
import { toast } from "sonner";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      profilePicture: null as File | null,
    },
    experience: [] as Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
    }>,
    education: [] as Array<{
      institution: string;
      degree: string;
      field: string;
      graduationDate: string;
    }>,
    skills: [] as string[],
    references: [] as Array<{
      name: string;
      position: string;
      company: string;
      email: string;
      phone: string;
    }>,
    additionalInfo: {
      languages: [] as Array<{ language: string; proficiency: string }>,
      hobbies: [] as string[],
      additionalNotes: "",
    },
  });

  const sections = [
    "Personal Info",
    "Experience",
    "Education",
    "Skills",
    "References",
    "Additional Info",
    "Preview",
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      toast.success("Section saved successfully!");
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const updateFormData = (section: keyof typeof formData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Build Your CV</h1>
          <p className="text-muted-foreground">
            Create a professional CV in minutes
          </p>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-card/80 shadow-lg">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {sections[currentSection]}
                </h2>
                <span className="text-sm text-muted-foreground">
                  Step {currentSection + 1} of {sections.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="min-h-[400px] animate-fadeIn">
              {currentSection === 0 && (
                <PersonalInfo
                  data={formData.personalInfo}
                  onChange={(data) => updateFormData("personalInfo", data)}
                />
              )}
              {currentSection === 1 && (
                <Experience
                  data={formData.experience}
                  onChange={(data) => updateFormData("experience", data)}
                />
              )}
              {currentSection === 2 && (
                <Education
                  data={formData.education}
                  onChange={(data) => updateFormData("education", data)}
                />
              )}
              {currentSection === 3 && (
                <Skills
                  data={formData.skills}
                  onChange={(data) => updateFormData("skills", data)}
                />
              )}
              {currentSection === 4 && (
                <References
                  data={formData.references}
                  onChange={(data) => updateFormData("references", data)}
                />
              )}
              {currentSection === 5 && (
                <AdditionalInfo
                  data={formData.additionalInfo}
                  onChange={(data) => updateFormData("additionalInfo", data)}
                />
              )}
              {currentSection === 6 && <Preview data={formData} />}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentSection === 0}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentSection === sections.length - 1}
              >
                {currentSection === sections.length - 2 ? "Preview" : "Next"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
