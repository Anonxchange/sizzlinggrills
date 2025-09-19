import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, Calendar, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HoursPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-grill-charcoal text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                Restaurant Hours
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Serving you fresh, delicious meals throughout the week
              </p>
            </div>
          </div>
        </section>

        {/* Hours Details */}
        <section className="py-20 bg-warm-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Main Hours Card */}
              <Card className="border-0 shadow-lg mb-12">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-grill-charcoal font-playfair">
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-w-2xl mx-auto">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="font-semibold text-grill-charcoal">Monday - Thursday</span>
                        <span className="text-grill-smoke">11:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="font-semibold text-grill-charcoal">Friday - Saturday</span>
                        <span className="text-grill-smoke">11:00 AM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="font-semibold text-grill-charcoal">Sunday</span>
                        <span className="text-grill-smoke">12:00 PM - 9:00 PM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Hours */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-grill-charcoal font-playfair">
                      Lunch Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-grill-smoke mb-4">
                      Fresh lunch options available daily
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Monday - Friday:</strong> 11:00 AM - 3:00 PM</p>
                      <p className="text-sm"><strong>Saturday - Sunday:</strong> 11:00 AM - 4:00 PM</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-grill-charcoal font-playfair">
                      Dinner Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-grill-smoke mb-4">
                      Full dinner menu with premium selections
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Sunday - Thursday:</strong> 5:00 PM - 10:00 PM</p>
                      <p className="text-sm"><strong>Friday - Saturday:</strong> 5:00 PM - 11:00 PM</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-grill-charcoal font-playfair">
                      Phone Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-grill-smoke mb-4">
                      Call ahead for takeout and reservations
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Daily:</strong> 30 minutes before opening</p>
                      <p className="text-sm"><strong>Last orders:</strong> 30 minutes before closing</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Special Hours Notice */}
              <Card className="border-0 shadow-lg bg-amber-50 border-l-4 border-l-amber-500">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <MapPin className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-800 mb-2">
                        Holiday Hours
                      </h3>
                      <p className="text-amber-700 text-sm">
                        Please note that our hours may vary during holidays and special events. 
                        We recommend calling ahead or checking our social media for the most up-to-date information 
                        during holiday periods.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold mb-6 text-grill-charcoal font-playfair">
                  Questions About Our Hours?
                </h3>
                <div className="max-w-3xl mx-auto">
                  <p className="text-grill-smoke mb-6">
                    If you have any questions about our operating hours or need to confirm availability 
                    for a specific time, please don't hesitate to contact us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="flex items-center justify-center gap-2 bg-white rounded-lg px-6 py-3 shadow-md">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-grill-charcoal">(555) 123-4567</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 bg-white rounded-lg px-6 py-3 shadow-md">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-grill-charcoal">123 Main Street</span>
                    </div>
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

export default HoursPage;