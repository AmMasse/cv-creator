
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
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
    } catch {
      return dateString;
    }
  };

  const generatePDF = (detailed: boolean) => {
    const element = document.getElementById("cv-preview");
    if (!element) {
      toast.error("Preview not found. Please try again.");
      return;
    }

    const filename = data.personalInfo.fullName 
      ? `${data.personalInfo.fullName.replace(/\s+/g, "_")}_${detailed ? "CV" : "Resume"}.pdf`
      : `${detailed ? "CV" : "Resume"}.pdf`;

    const opt = {
      margin: 1,
      filename,
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

      <Card className="p-8 print:p-6 print:shadow-none" id="cv-preview">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            <div className="text-gray-600 space-y-1">
              {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
              {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
            </div>
          </div>

          {/* Experience Section */}
          {data.experience.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.position}</h3>
                        <p className="text-gray-700 font-medium">{exp.company}</p>
                      </div>
                      <p className="text-sm text-gray-600 text-right">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {data.education.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <p className="text-gray-700">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                    {edu.graduationDate && (
                      <p className="text-sm text-gray-600">
                        Graduated: {formatDate(edu.graduationDate)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {data.skills.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* References Section */}
          {data.references.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1">
                References
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {data.references.map((ref, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-semibold">{ref.name}</h3>
                    <p className="text-gray-700">
                      {ref.position} {ref.company && `at ${ref.company}`}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      {ref.email && <p>Email: {ref.email}</p>}
                      {ref.phone && <p>Phone: {ref.phone}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information Section */}
          {(data.additionalInfo.languages.length > 0 ||
            data.additionalInfo.hobbies.length > 0 ||
            data.additionalInfo.additionalNotes) && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-1">
                Additional Information
              </h2>
              
              {data.additionalInfo.languages.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Languages</h3>
                  <div className="space-y-1">
                    {data.additionalInfo.languages.map((lang, index) => (
                      <p key={index} className="text-sm text-gray-700">
                        <span className="font-medium">{lang.language}</span> - {lang.proficiency}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {data.additionalInfo.hobbies.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Hobbies & Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.additionalInfo.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data.additionalInfo.additionalNotes && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Additional Notes</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {data.additionalInfo.additionalNotes}
                  </p>
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
