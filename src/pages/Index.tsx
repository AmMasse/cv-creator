
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PersonalInfo from "@/components/cv/PersonalInfo";
import Experience from "@/components/cv/Experience";
import Education from "@/components/cv/Education";
import Skills from "@/components/cv/Skills";
import References from "@/components/cv/References";
import AdditionalInfo from "@/components/cv/AdditionalInfo";
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

  const validateCurrentSection = () => {
    switch (currentSection) {
      case 0: // Personal Info
        if (!formData.personalInfo.fullName.trim()) {
          toast.error("Please enter your full name");
          return false;
        }
        if (!formData.personalInfo.email.trim()) {
          toast.error("Please enter your email address");
          return false;
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.personalInfo.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        break;
      case 1: // Experience
        // Experience is optional, but if added, should have required fields
        const incompleteExp = formData.experience.some(exp => 
          !exp.company.trim() || !exp.position.trim()
        );
        if (incompleteExp) {
          toast.error("Please complete all experience entries or remove incomplete ones");
          return false;
        }
        break;
      case 2: // Education
        // Education is optional, but if added, should have required fields
        const incompleteEdu = formData.education.some(edu => 
          !edu.institution.trim() || !edu.degree.trim()
        );
        if (incompleteEdu) {
          toast.error("Please complete all education entries or remove incomplete ones");
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentSection()) {
      return;
    }

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

  const getSectionDescription = (index: number) => {
    const descriptions = [
      "Add your basic contact information and profile picture",
      "List your work experience and achievements",
      "Add your educational background",
      "Highlight your key skills and competencies",
      "Include professional references (optional)",
      "Add languages, hobbies, and additional notes (optional)",
      "Review and download your CV or resume",
    ];
    return descriptions[index] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Build Your CV
          </h1>
          <p className="text-muted-foreground text-lg">
            Create a professional CV in minutes with our step-by-step builder
          </p>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-card/95 shadow-xl border-0">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    {sections[currentSection]}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getSectionDescription(currentSection)}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  Step {currentSection + 1} of {sections.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="min-h-[500px] animate-fadeIn">
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

            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentSection === 0}
                className="min-w-[100px]"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentSection === sections.length - 1}
                className="min-w-[100px]"
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
