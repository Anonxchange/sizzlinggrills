import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: ['123 Grill Street', 'Victoria Island, Lagos, Nigeria', 'Nigeria 100001']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+2348145892901', '+2347045892901 (WhatsApp)']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@sizzlinggrill.ng', 'reservations@sizzlinggrill.ng']
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon - Thu: 11:00 AM - 10:00 PM', 'Fri - Sat: 11:00 AM - 11:00 PM', 'Sunday: 12:00 PM - 9:00 PM']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get in touch with us for reservations, catering, or any questions about our delicious grilled cuisine
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info) => (
                <Card key={info.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-grill-charcoal">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {info.details.map((detail, index) => (
                      <div key={index} className="flex items-center justify-center gap-2 text-grill-smoke text-sm mb-1">
                        {detail.includes('WhatsApp') && (
                          <MessageCircle className="w-4 h-4 text-green-500" />
                        )}
                        <span>{detail}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-grill-charcoal font-playfair">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-grill-charcoal mb-2">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="w-full"
                        data-testid="input-first-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-grill-charcoal mb-2">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="w-full"
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-grill-charcoal mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full"
                      data-testid="input-email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-grill-charcoal mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full"
                      data-testid="input-phone"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-grill-charcoal mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      className="w-full"
                      data-testid="input-subject"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-grill-charcoal mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full resize-none"
                      placeholder="Tell us how we can help you..."
                      data-testid="textarea-message"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    data-testid="button-send-message"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Map & Additional Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-grill-charcoal font-playfair">
                  Visit Our Restaurant
                </h2>
                
                {/* Map Placeholder */}
                <div className="bg-gray-100 rounded-lg p-8 text-center mb-8 h-64 flex items-center justify-center">
                  <div>
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-grill-smoke">
                      Interactive map coming soon!<br />
                      123 Grill Street, Victoria Island, Lagos
                    </p>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <div className="bg-primary/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-grill-charcoal mb-3">
                      Reservations
                    </h3>
                    <p className="text-grill-smoke mb-3">
                      We recommend making a reservation, especially for dinner and weekends.
                    </p>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Make a Reservation
                    </Button>
                  </div>
                  
                  <div className="bg-accent/10 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-grill-charcoal mb-3">
                      Private Events
                    </h3>
                    <p className="text-grill-smoke mb-3">
                      Host your special occasion at our restaurant. We offer customized menus for private events.
                    </p>
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
                      Learn More
                    </Button>
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

export default ContactPage;