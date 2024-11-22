import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";

interface PreviewProps {
  data: {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      profilePicture: File | null;
    };
    experience: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      field: string;
      graduationDate: string;
    }>;
    skills: string[];
    references: Array<{
      name: string;
      position: string;
      company: string;
      email: string;
      phone: string;
    }>;
    additionalInfo: {
      languages: Array<{ language: string; proficiency: string }>;
      hobbies: string[];
      additionalNotes: string;
    };
  };
}

const Preview = ({ data }: PreviewProps) => {
  const generatePDF = (detailed: boolean) => {
    const element = document.getElementById("cv-preview");
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `${data.personalInfo.fullName.replace(" ", "_")}_${
        detailed ? "CV" : "Resume"
      }.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
    toast.success(`${detailed ? "CV" : "Resume"} downloaded successfully!`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex space-x-4 justify-end">
        <Button onClick={() => generatePDF(false)} variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Download Resume (1 page)
        </Button>
        <Button onClick={() => generatePDF(true)}>
          <FileText className="mr-2 h-4 w-4" />
          Download Full CV
        </Button>
      </div>

      <Card className="p-6" id="cv-preview">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{data.personalInfo.fullName}</h2>
            <div className="text-muted-foreground space-y-1">
              <p>{data.personalInfo.email}</p>
              <p>{data.personalInfo.phone}</p>
              <p>{data.personalInfo.location}</p>
            </div>
          </div>

          {data.experience.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Experience</h3>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{exp.position}</h4>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(exp.startDate).toLocaleDateString()} -{" "}
                        {new Date(exp.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Education</h3>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-medium">{edu.institution}</h4>
                    <p>
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Graduated: {new Date(edu.graduationDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.references.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">References</h3>
              <div className="space-y-6">
                {data.references.map((ref, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-medium">{ref.name}</h4>
                    <p>
                      {ref.position} at {ref.company}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <p>{ref.email}</p>
                      <p>{ref.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(data.additionalInfo.languages.length > 0 ||
            data.additionalInfo.hobbies.length > 0 ||
            data.additionalInfo.additionalNotes) && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Additional Information</h3>
              
              {data.additionalInfo.languages.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Languages</h4>
                  <div className="space-y-1">
                    {data.additionalInfo.languages.map((lang, index) => (
                      <p key={index}>
                        {lang.language} - {lang.proficiency}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {data.additionalInfo.hobbies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Hobbies & Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.additionalInfo.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data.additionalInfo.additionalNotes && (
                <div className="space-y-2">
                  <h4 className="font-medium">Additional Notes</h4>
                  <p className="text-sm">{data.additionalInfo.additionalNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Preview;