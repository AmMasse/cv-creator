import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Star, Users, Zap } from "lucide-react";
import PersonalInfo from "@/components/cv/PersonalInfo";
import Experience from "@/components/cv/Experience";
import Education from "@/components/cv/Education";
import Skills from "@/components/cv/Skills";
import References from "@/components/cv/References";
import AdditionalInfo from "@/components/cv/AdditionalInfo";
import Preview from "@/components/cv/Preview";
import { toast } from "sonner";

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    profilePicture: null as File | null,
  });

  const [experience, setExperience] = useState<Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>>([]);

  const [education, setEducation] = useState<Array<{
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
  }>>([]);

  const [skills, setSkills] = useState<string[]>([]);

  const [references, setReferences] = useState<Array<{
    name: string;
    position: string;
    company: string;
    email: string;
    phone: string;
  }>>([]);

  const [additionalInfo, setAdditionalInfo] = useState({
    languages: [] as Array<{ language: string; proficiency: string }>,
    hobbies: [] as string[],
    additionalNotes: "",
  });

  const cvData = {
    personalInfo,
    experience,
    education,
    skills,
    references,
    additionalInfo,
  };

  const validateStep = (step: string): boolean => {
    switch (step) {
      case "personal":
        if (!personalInfo.fullName.trim() || !personalInfo.email.trim()) {
          toast.error("Please fill in your name and email address");
          return false;
        }
        if (personalInfo.email && !/\S+@\S+\.\S+/.test(personalInfo.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    const tabs = ["personal", "experience", "education", "skills", "references", "additional", "preview"];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (validateStep(activeTab) && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const tabs = ["personal", "experience", "education", "skills", "references", "additional", "preview"];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  if (!showBuilder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Professional CV Builder
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create stunning, professional CVs and resumes in minutes. Stand out from the crowd with our modern, ATS-friendly templates.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setShowBuilder(true)}
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <FileText className="mr-2 h-5 w-5" />
                Start Building Your CV
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2"
              >
                <Download className="mr-2 h-5 w-5" />
                View Sample CV
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Create professional CVs in minutes, not hours. Our intuitive interface guides you through every step.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>ATS Optimized</CardTitle>
                <CardDescription>
                  Our templates are designed to pass through Applicant Tracking Systems and catch recruiters' attention.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Trusted by Thousands</CardTitle>
                <CardDescription>
                  Join thousands of professionals who have successfully landed their dream jobs using our CV builder.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to Build Your Professional CV?
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Get started now and create a CV that opens doors to new opportunities.
            </p>
            <Button 
              size="lg" 
              onClick={() => setShowBuilder(true)}
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CV Builder</h1>
            <p className="text-gray-600">Create your professional CV step by step</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowBuilder(false)}
          >
            Back to Home
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <TabsContent value="personal" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Enter your basic contact information and upload a profile picture.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PersonalInfo data={personalInfo} onChange={setPersonalInfo} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>
                      Add your professional work experience and achievements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Experience data={experience} onChange={setExperience} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>
                      Include your educational background and qualifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Education data={education} onChange={setEducation} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>
                      List your technical and soft skills.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Skills data={skills} onChange={setSkills} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="references" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>References</CardTitle>
                    <CardDescription>
                      Add professional references who can vouch for your work.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <References data={references} onChange={setReferences} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="additional" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>
                      Include languages, hobbies, and other relevant information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdditionalInfo data={additionalInfo} onChange={setAdditionalInfo} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>CV Preview</CardTitle>
                    <CardDescription>
                      Review your CV and download it as a PDF.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Preview data={cvData} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Navigation Buttons */}
              {activeTab !== "preview" && (
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={activeTab === "personal"}
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    Next
                  </Button>
                </div>
              )}
            </div>

            {/* Live Preview Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Live Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="transform scale-75 origin-top-left w-[133%] h-96 overflow-hidden">
                      <Preview data={cvData} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
