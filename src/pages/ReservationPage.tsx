
import { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const ReservationPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: ''
  });

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.guests) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate reservation submission
    toast({
      title: "Reservation Request Submitted!",
      description: `Thank you ${formData.name}! We'll confirm your reservation for ${formData.guests} guests on ${formData.date} at ${formData.time} via email shortly.`,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      specialRequests: ''
    });
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-grill-charcoal text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
              Reserve Your Table
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Book your dining experience at Sizzling Grill. We can't wait to serve you our signature grilled dishes in a warm, welcoming atmosphere.
            </p>
          </div>
        </section>

        {/* Reservation Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Reservation Form */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-playfair text-grill-charcoal">
                        Make a Reservation
                      </CardTitle>
                      <p className="text-grill-smoke">
                        Fill out the form below and we'll confirm your reservation within 24 hours.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Full Name *
                            </Label>
                            <Input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>

                        {/* Reservation Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date" className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Date *
                            </Label>
                            <Input
                              id="date"
                              type="date"
                              value={formData.date}
                              onChange={(e) => handleInputChange('date', e.target.value)}
                              min={today}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Time *
                            </Label>
                            <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Party Size *
                            </Label>
                            <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="# of guests" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num} {num === 1 ? 'Guest' : 'Guests'}
                                  </SelectItem>
                                ))}
                                <SelectItem value="large-party">10+ Guests (Large Party)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Special Requests */}
                        <div className="space-y-2">
                          <Label htmlFor="requests" className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Special Requests
                          </Label>
                          <Textarea
                            id="requests"
                            value={formData.specialRequests}
                            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                            placeholder="Any special occasions, dietary restrictions, or seating preferences..."
                            rows={4}
                          />
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg"
                        >
                          Submit Reservation Request
                        </Button>
                        
                        <p className="text-sm text-grill-smoke text-center">
                          * Required fields. We'll contact you within 24 hours to confirm your reservation.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Restaurant Information */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-playfair text-grill-charcoal">
                        Restaurant Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Monday - Thursday</span>
                        <span>11:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Friday - Saturday</span>
                        <span>11:00 AM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Sunday</span>
                        <span>12:00 PM - 9:00 PM</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-playfair text-grill-charcoal">
                        Reservation Policy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-grill-smoke">
                      <p>
                        • Reservations are recommended, especially for dinner and weekends
                      </p>
                      <p>
                        • We hold tables for 15 minutes past reservation time
                      </p>
                      <p>
                        • For parties of 8 or more, please call us directly
                      </p>
                      <p>
                        • Cancellations should be made at least 2 hours in advance
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-playfair text-grill-charcoal">
                        Contact Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>(555) 123-GRILL</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>reservations@sizzlinggrill.com</span>
                      </div>
                      <p className="text-sm text-grill-smoke mt-3">
                        For same-day reservations or parties larger than 10, please call us directly.
                      </p>
                    </CardContent>
                  </Card>
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

export default ReservationPage;
