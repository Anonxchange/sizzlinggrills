
import { Crown, Calendar, Users2, Sparkles, Camera, Music } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivateEventsPage = () => {
  const venues = [
    {
      name: 'The Grill Room',
      capacity: '20-40 guests',
      description: 'Intimate private dining room with a view of our open kitchen',
      features: ['Private bar', 'Audio/visual equipment', 'Dedicated server']
    },
    {
      name: 'The Garden Terrace',
      capacity: '40-80 guests',
      description: 'Beautiful outdoor space perfect for cocktail receptions and celebrations',
      features: ['Outdoor grilling station', 'String lighting', 'Weather contingency plan']
    },
    {
      name: 'Full Restaurant Buyout',
      capacity: '100+ guests',
      description: 'Exclusive use of our entire restaurant for your special occasion',
      features: ['Complete privacy', 'Custom menu design', 'Full event coordination']
    }
  ];

  const eventTypes = [
    {
      icon: Crown,
      title: 'Wedding Receptions',
      description: 'Create unforgettable memories with our elegant private dining options'
    },
    {
      icon: Users2,
      title: 'Corporate Events',
      description: 'Impress clients and team members with sophisticated business gatherings'
    },
    {
      icon: Sparkles,
      title: 'Milestone Celebrations',
      description: 'Anniversaries, birthdays, graduations, and other special occasions'
    },
    {
      icon: Calendar,
      title: 'Holiday Parties',
      description: 'Festive celebrations for holidays and seasonal gatherings'
    },
    {
      icon: Camera,
      title: 'Photo Shoots',
      description: 'Beautiful restaurant backdrop for food photography and events'
    },
    {
      icon: Music,
      title: 'Live Entertainment',
      description: 'Special events featuring live music and entertainment'
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
              Private Events
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transform your special occasions into unforgettable experiences with our exclusive private event services
            </p>
          </div>
        </section>

        {/* Event Types Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                Perfect for Any Occasion
              </h2>
              <p className="text-xl text-grill-smoke max-w-2xl mx-auto">
                Our versatile spaces and exceptional service make every event memorable
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventTypes.map((type, index) => (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <type.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-playfair text-grill-charcoal">
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-grill-smoke">
                      {type.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Venues Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                Our Private Venues
              </h2>
              <p className="text-xl text-grill-smoke max-w-2xl mx-auto">
                Choose from our beautifully designed spaces, each offering a unique atmosphere
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {venues.map((venue, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair text-grill-charcoal">
                      {venue.name}
                    </CardTitle>
                    <p className="text-primary font-semibold text-lg">
                      {venue.capacity}
                    </p>
                    <p className="text-grill-smoke">
                      {venue.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-grill-charcoal">Features Include:</h4>
                    <ul className="space-y-2">
                      {venue.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-grill-smoke">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Included Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                What's Included
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-grill-charcoal">Dedicated Staff</h3>
                <p className="text-grill-smoke">Personal event coordinator and dedicated servers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-grill-charcoal">Custom Menus</h3>
                <p className="text-grill-smoke">Tailored dining experiences to match your event</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-grill-charcoal">Setup & Decor</h3>
                <p className="text-grill-smoke">Professional setup and elegant table arrangements</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-grill-charcoal">A/V Equipment</h3>
                <p className="text-grill-smoke">Sound system and presentation equipment available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              Let's Plan Something Special
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Our events team is ready to help you create an unforgettable experience. Contact us to start planning your private event today.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Private Events Manager</h3>
                <p className="text-gray-300 mb-2">Phone: +2348145892901</p>
                <p className="text-gray-300 mb-4">Email: events@sizzlinggrill.ng</p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Schedule Consultation
                </Button>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Booking Information</h3>
                <p className="text-gray-300 mb-4">
                  Private events require advance booking. We recommend securing your date at least 3-4 weeks ahead.
                </p>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-grill-charcoal"
                >
                  Check Availability
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

export default PrivateEventsPage;
