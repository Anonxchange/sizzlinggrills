
import { Phone, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const HowToOrderPage = () => {
  const orderMethods = [
    {
      icon: ShoppingCart,
      title: "Online Ordering",
      description: "Browse our menu online and add items to your cart",
      steps: [
        "Visit our Menu page",
        "Select your favorite dishes",
        "Add items to your cart",
        "Proceed to checkout",
        "Fill in your details",
        "Place your order"
      ]
    },
    {
      icon: Phone,
      title: "Phone Orders",
      description: "Call us directly to place your order",
      steps: [
        "Call +2348145892901",
        "Tell us what you'd like to order",
        "Provide your contact details",
        "Confirm pickup or delivery",
        "We'll prepare your order"
      ]
    }
  ];

  const orderProcess = [
    {
      icon: ShoppingCart,
      title: "Place Order",
      description: "Choose your items online or call us"
    },
    {
      icon: CheckCircle,
      title: "Confirmation",
      description: "We'll call to confirm your order within 15 minutes"
    },
    {
      icon: Clock,
      title: "Preparation",
      description: "Our chefs prepare your meal fresh (15-30 minutes)"
    },
    {
      icon: CheckCircle,
      title: "Ready",
      description: "Pickup your order or we'll deliver it to you"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-warm-cream">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-grill-charcoal mb-6 font-playfair">
              How to Place Your Order
            </h1>
            <p className="text-xl text-grill-smoke max-w-3xl mx-auto">
              Ordering from Sizzling Grill is easy! Choose from our convenient ordering methods
            </p>
          </div>
        </section>

        {/* Order Methods */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-grill-charcoal font-playfair">
              Choose Your Ordering Method
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {orderMethods.map((method, index) => (
                <Card key={method.title} className="h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-playfair">{method.title}</CardTitle>
                    <p className="text-grill-smoke">{method.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {method.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-primary">{stepIndex + 1}</span>
                          </div>
                          <span className="text-grill-smoke">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Order Process */}
        <section className="py-16 bg-warm-cream">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-grill-charcoal font-playfair">
              What Happens After You Order
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {orderProcess.map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-grill-charcoal">{step.title}</h3>
                  <p className="text-grill-smoke">{step.description}</p>
                  {index < orderProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-primary/30 transform -translate-x-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              Ready to Order?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Start exploring our delicious menu or give us a call to place your order
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Browse Menu
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-grill-charcoal">
                <Phone className="w-5 h-5 mr-2" />
                Call +2348145892901
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HowToOrderPage;
