
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, MapPin, Car, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ParkingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-grill-charcoal text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                Parking Information
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Convenient parking options available for all our guests
              </p>
            </div>
          </div>
        </section>

        {/* Parking Details */}
        <section className="py-20 bg-warm-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                      <Car className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-grill-charcoal font-playfair">
                      Valet Parking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-grill-smoke mb-4">
                      Professional valet service available for your convenience
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm">Available during dinner hours</span>
                      </div>
                      <p className="text-primary font-semibold">₦2,000 per vehicle</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-grill-charcoal font-playfair">
                      Self Parking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-grill-smoke mb-4">
                      Spacious parking lot with 50+ spaces available
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm">Adjacent to restaurant</span>
                      </div>
                      <p className="text-primary font-semibold">Free for guests</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Parking Hours */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-grill-charcoal font-playfair">
                    Parking Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-4 text-grill-charcoal">Self Parking</h3>
                        <div className="space-y-2 text-grill-smoke">
                          <p><strong>Monday - Thursday:</strong> 11:00 AM - 11:00 PM</p>
                          <p><strong>Friday - Saturday:</strong> 11:00 AM - 12:00 AM</p>
                          <p><strong>Sunday:</strong> 12:00 PM - 10:00 PM</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-4 text-grill-charcoal">Valet Service</h3>
                        <div className="space-y-2 text-grill-smoke">
                          <p><strong>Monday - Thursday:</strong> 5:00 PM - 11:00 PM</p>
                          <p><strong>Friday - Saturday:</strong> 5:00 PM - 12:00 AM</p>
                          <p><strong>Sunday:</strong> 5:00 PM - 10:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold mb-6 text-grill-charcoal font-playfair">
                  Additional Information
                </h3>
                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <h4 className="font-semibold text-grill-charcoal mb-2">Security</h4>
                    <p className="text-grill-smoke text-sm">
                      Our parking area is well-lit and monitored by security cameras for your peace of mind.
                    </p>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-grill-charcoal mb-2">Accessibility</h4>
                    <p className="text-grill-smoke text-sm">
                      Designated handicap parking spaces available close to the main entrance.
                    </p>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-grill-charcoal mb-2">Large Vehicles</h4>
                    <p className="text-grill-smoke text-sm">
                      Accommodations available for trucks, RVs, and oversized vehicles upon request.
                    </p>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-grill-charcoal mb-2">Events</h4>
                    <p className="text-grill-smoke text-sm">
                      Special parking arrangements for private events and large parties.
                    </p>
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

export default ParkingPage;
