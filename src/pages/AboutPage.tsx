
import { Users, Award, Heart, ChefHat, Clock, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const values = [
    {
      icon: Flame,
      title: 'Passion for Grilling',
      description: 'Our master chefs bring decades of grilling expertise to create perfectly cooked dishes every time.'
    },
    {
      icon: Heart,
      title: 'Quality Ingredients',
      description: 'We source only the finest, freshest ingredients from local suppliers to ensure exceptional taste.'
    },
    {
      icon: Users,
      title: 'Family Atmosphere',
      description: 'Creating a warm, welcoming environment where families and friends can gather and make memories.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering outstanding service and culinary excellence in every aspect of our business.'
    }
  ];

  const team = [
    {
      name: 'Chef Oluwole Purity',
      role: 'Executive Chef',
      description: 'With over 15 years of culinary experience, Chef Purity brings innovation to traditional grilling techniques.',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Oluwole Olamide',
      role: 'Restaurant Manager',
      description: 'Olamide ensures every guest receives exceptional service and has a memorable dining experience.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c27b7509?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Michael Eze',
      role: 'Grill Master',
      description: 'Our grill master who perfects every steak, ensuring it meets our high standards for flavor and tenderness.',
      image: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const stats = [
    { number: '2018', label: 'Founded' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '15+', label: 'Expert Staff' },
    { number: '100+', label: 'Signature Dishes' }
  ];

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
              About Sizzling Grill
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Where culinary passion meets the art of grilling, creating unforgettable dining experiences since 2018
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                  Our Story
                </h2>
                <div className="space-y-6 text-grill-smoke leading-relaxed">
                  <p>
                    Sizzling Grill was born from a simple dream: to create a place where the ancient art of grilling 
                    meets modern culinary innovation. Founded in 2018 by a team of passionate food enthusiasts, 
                    our restaurant has become a beloved destination for those who appreciate perfectly grilled cuisine.
                  </p>
                  <p>
                    What started as a small family venture has grown into Lagos's premier grilling destination, 
                    known for our commitment to quality, authenticity, and exceptional service. Every dish tells 
                    a story of tradition, passion, and the pursuit of culinary excellence.
                  </p>
                  <p>
                    Today, we continue to honor our founding principles while constantly innovating to bring you 
                    new flavors and experiences that celebrate the rich tradition of grilled cuisine.
                  </p>
                </div>
                <Button className="mt-8 bg-primary hover:bg-primary/90" data-testid="button-view-menu">
                  View Our Menu
                </Button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                  alt="Our restaurant interior"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <ChefHat className="w-8 h-8" />
                    <div>
                      <p className="text-2xl font-bold">6+</p>
                      <p className="text-sm">Years of Excellence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                Our Values
              </h2>
              <p className="text-xl text-grill-smoke max-w-2xl mx-auto">
                The principles that guide everything we do at Sizzling Grill
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-grill-charcoal">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-grill-smoke">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-grill-charcoal font-playfair">
                Meet Our Team
              </h2>
              <p className="text-xl text-grill-smoke max-w-2xl mx-auto">
                The passionate professionals behind every perfect meal
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <Card key={member.name} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-grill-charcoal mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-3">{member.role}</p>
                    <p className="text-grill-smoke">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              Ready to Experience Sizzling Grill?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join us for an unforgettable dining experience where every meal is crafted with passion and served with pride.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                data-testid="button-make-reservation"
              >
                <Clock className="w-4 h-4 mr-2" />
                Make a Reservation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
