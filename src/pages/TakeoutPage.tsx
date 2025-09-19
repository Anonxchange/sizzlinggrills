
import { Clock, Phone, CheckCircle, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TakeoutPage = () => {
  const features = [
    {
      icon: Clock,
      title: 'Quick & Easy',
      description: 'Order ahead and pick up your food when it\'s convenient for you.'
    },
    {
      icon: Package,
      title: 'Eco-Friendly Packaging',
      description: 'All takeout orders come in sustainable, leak-proof containers.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Guaranteed',
      description: 'Same high-quality food and attention to detail as our dine-in service.'
    },
    {
      icon: Phone,
      title: 'Easy Ordering',
      description: 'Call ahead or visit our website to place your takeout order.'
    }
  ];

  const process = [
    { step: 1, title: 'Call or Order Online', description: 'Place your order by phone or through our website' },
    { step: 2, title: 'We Prepare Your Food', description: 'Our chefs grill your order fresh to perfection' },
    { step: 3, title: 'Pick Up & Enjoy', description: 'Collect your order and enjoy our delicious food at home' }
  ];

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
              Takeout Service
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enjoy our premium grilled cuisine in the comfort of your own home with our convenient takeout service
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                Why Choose Takeout?
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

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                How It Works
              </h2>
              <p className="text-xl text-grill-smoke max-w-2xl mx-auto">
                Simple steps to get your favorite grilled dishes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {process.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-grill-charcoal font-playfair">
                    {item.title}
                  </h3>
                  <p className="text-grill-smoke">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Hours Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
                  Order Information
                </h2>
                <div className="space-y-4 text-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>Call: +2348145892901</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Typical pickup time: 15-25 minutes</span>
                  </div>
                  <p className="text-gray-300 mt-4">
                    We recommend calling 30 minutes before you plan to pick up your order to ensure it's ready when you arrive.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 font-playfair">
                  Ready to Order?
                </h3>
                <p className="text-gray-300 mb-6">
                  Call us now to place your takeout order
                </p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
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

export default TakeoutPage;
