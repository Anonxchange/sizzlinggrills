
import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "(555) 123-GRILL",
      subtitle: "Order by phone"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Grill Street",
      subtitle: "Downtown District"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Sun 11AM-11PM",
      subtitle: "Kitchen closes at 10PM"
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@sizzlinggrill.com",
      subtitle: "For reservations & events"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-grill-charcoal text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
            Visit Us Today
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready for an unforgettable dining experience? Find us, call us, or make a reservation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <Card 
              key={info.title}
              className="bg-grill-smoke/50 border-grill-smoke hover:bg-grill-smoke/70 transition-colors duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{info.title}</h3>
                <p className="text-primary font-semibold mb-1">{info.details}</p>
                <p className="text-gray-400 text-sm">{info.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary to-accent p-12 rounded-2xl animate-fade-in">
          <h3 className="text-3xl font-bold mb-4 font-playfair">Ready to Experience the Best?</h3>
          <p className="text-xl mb-8 opacity-90">
            Reserve your table now and taste the difference that passion makes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Make Reservation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold">
              Order Takeout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
