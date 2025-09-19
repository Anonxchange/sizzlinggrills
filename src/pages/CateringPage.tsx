
import { Users, Calendar, Utensils, Star, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CateringPage = () => {
  const services = [
    {
      icon: Users,
      title: 'Corporate Events',
      description: 'Professional catering for business meetings, conferences, and corporate gatherings.'
    },
    {
      icon: Calendar,
      title: 'Special Occasions',
      description: 'Weddings, birthdays, anniversaries, and other milestone celebrations.'
    },
    {
      icon: Utensils,
      title: 'Private Parties',
      description: 'Intimate gatherings, family reunions, and private celebrations.'
    },
    {
      icon: Star,
      title: 'Custom Menus',
      description: 'Tailored menu options to suit your event\'s specific needs and preferences.'
    }
  ];

  const packages = [
    {
      name: 'Essential Package',
      serves: '10-25 people',
      description: 'Perfect for small gatherings and intimate events',
      features: [
        'Choice of 2 main dishes',
        '2 side dishes',
        'Beverages included',
        'Basic setup and cleanup'
      ]
    },
    {
      name: 'Premium Package',
      serves: '25-50 people',
      description: 'Ideal for medium-sized events and celebrations',
      features: [
        'Choice of 3 main dishes',
        '3 side dishes',
        'Appetizer selection',
        'Beverages and dessert',
        'Full setup and cleanup',
        'Serving staff available'
      ]
    },
    {
      name: 'Elite Package',
      serves: '50+ people',
      description: 'The ultimate catering experience for large events',
      features: [
        'Full menu selection',
        'Unlimited side dishes',
        'Premium appetizers',
        'Beverages, dessert, and coffee service',
        'Professional serving staff',
        'Complete event coordination'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
              Catering Services
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Bring the exceptional taste of Sizzling Grill to your special events with our professional catering services
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                Our Catering Services
              </h2>
              <p className="text-xl text-grill-smoke max-w-2xl mx-auto">
                From intimate gatherings to large celebrations, we cater to all types of events
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-grill-charcoal">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-grill-smoke">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                Catering Packages
              </h2>
              <p className="text-xl text-grill-smoke max-w-2xl mx-auto">
                Choose the perfect package for your event size and needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-playfair text-grill-charcoal">
                      {pkg.name}
                    </CardTitle>
                    <p className="text-primary font-semibold text-lg">
                      {pkg.serves}
                    </p>
                    <p className="text-grill-smoke">
                      {pkg.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-grill-smoke">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-6 bg-primary hover:bg-primary/90 text-white"
                    >
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              Let's Plan Your Event
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Contact our catering team to discuss your event needs and create a custom menu that will impress your guests
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Catering Coordinator</h3>
                <p className="text-gray-300 mb-2">Phone: +2348145892901</p>
                <p className="text-gray-300 mb-4">Email: catering@sizzlinggrill.ng</p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Contact Catering Team
                </Button>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Planning Timeline</h3>
                <p className="text-gray-300 mb-4">
                  We recommend booking at least 2 weeks in advance for optimal menu planning and preparation.
                </p>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-grill-charcoal"
                >
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CateringPage;
