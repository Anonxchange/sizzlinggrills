
import { Clock, Users, ChefHat, Utensils } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DineInPage = () => {
  const features = [
    {
      icon: Utensils,
      title: 'Premium Dining Experience',
      description: 'Enjoy our full menu in a comfortable, welcoming atmosphere with attentive service.'
    },
    {
      icon: ChefHat,
      title: 'Fresh Grilled to Order',
      description: 'All dishes are prepared fresh and grilled to perfection right when you order.'
    },
    {
      icon: Users,
      title: 'Perfect for Groups',
      description: 'Whether it\'s a romantic dinner or family gathering, we accommodate all party sizes.'
    },
    {
      icon: Clock,
      title: 'Extended Hours',
      description: 'Open late to serve you delicious grilled cuisine when you need it most.'
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
              Dine In Experience
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Immerse yourself in the ultimate grilling experience at our restaurant, where every meal is a celebration
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                Why Dine With Us?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-grill-charcoal">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-grill-smoke">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hours & Reservation Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
                  Restaurant Hours
                </h2>
                <div className="space-y-4 text-lg">
                  <div className="flex justify-between">
                    <span className="font-semibold">Monday - Thursday</span>
                    <span>11:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Friday - Saturday</span>
                    <span>11:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Sunday</span>
                    <span>12:00 PM - 9:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 font-playfair">
                  Ready to Dine?
                </h3>
                <p className="text-gray-300 mb-6">
                  Reserve your table now for the ultimate grilling experience
                </p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
                >
                  Make a Reservation
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

export default DineInPage;
