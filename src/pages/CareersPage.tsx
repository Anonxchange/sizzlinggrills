
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Heart, Trophy, Clock, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CareersPage = () => {
  const jobOpenings = [
    {
      title: "Head Chef",
      department: "Kitchen",
      type: "Full-time",
      description: "Lead our culinary team in creating exceptional grilled dishes with 5+ years experience required.",
      requirements: ["5+ years culinary experience", "Leadership skills", "Grill expertise", "Food safety certification"]
    },
    {
      title: "Sous Chef",
      department: "Kitchen",
      type: "Full-time",
      description: "Support the head chef in daily kitchen operations and menu development.",
      requirements: ["3+ years cooking experience", "Team collaboration", "Inventory management", "Flexibility with hours"]
    },
    {
      title: "Server",
      department: "Front of House",
      type: "Part-time/Full-time",
      description: "Provide exceptional dining service to our guests in a fast-paced environment.",
      requirements: ["Customer service experience", "Communication skills", "Ability to work evenings", "Team player"]
    },
    {
      title: "Bartender",
      department: "Bar",
      type: "Part-time/Full-time",
      description: "Craft cocktails and provide beverage service with knowledge of wine and spirits.",
      requirements: ["Bartending experience", "Knowledge of cocktails", "Responsible alcohol service", "Multitasking abilities"]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Comprehensive health insurance for full-time employees"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Work-life balance with flexible scheduling options"
    },
    {
      icon: Trophy,
      title: "Career Growth",
      description: "Training programs and advancement opportunities"
    },
    {
      icon: Users,
      title: "Team Environment",
      description: "Collaborative and supportive work culture"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-grill-charcoal text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                Join Our Team
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Build your culinary career with us and be part of something special
              </p>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 bg-warm-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-grill-charcoal font-playfair">
                  Why Choose Sizzling Grill?
                </h2>
                <p className="text-xl text-grill-smoke max-w-2xl mx-auto">
                  We believe in nurturing talent and creating an environment where our team can thrive
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-0 shadow-lg text-center">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-grill-charcoal">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-grill-smoke">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-grill-charcoal font-playfair">
                  Current Openings
                </h2>
                <p className="text-xl text-grill-smoke">
                  Explore exciting opportunities to grow your career with us
                </p>
              </div>

              <div className="space-y-6">
                {jobOpenings.map((job, index) => (
                  <Card key={index} className="border-l-4 border-l-primary shadow-lg">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <CardTitle className="text-2xl font-bold text-grill-charcoal mb-2">
                            {job.title}
                          </CardTitle>
                          <div className="flex gap-4 text-sm text-grill-smoke">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                              {job.department}
                            </span>
                            <span className="bg-gray-100 text-grill-charcoal px-3 py-1 rounded-full">
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="lg"
                          className="bg-primary hover:bg-primary/90 text-white mt-4 md:mt-0"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-grill-smoke mb-4">{job.description}</p>
                      <div>
                        <h4 className="font-semibold text-grill-charcoal mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-grill-smoke space-y-1">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 font-playfair">
                How to Apply
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Submit Application</h3>
                  <p className="text-gray-300">Send your resume and cover letter to our HR team</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Interview Process</h3>
                  <p className="text-gray-300">Meet with our team to discuss your experience and goals</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Join Our Team</h3>
                  <p className="text-gray-300">Start your exciting career journey with Sizzling Grill</p>
                </div>
              </div>

              <div className="bg-grill-smoke rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                <p className="text-gray-300 mb-6">
                  Send your application materials to our HR department
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>careers@sizzlinggrill.ng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+2347045892901</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;
