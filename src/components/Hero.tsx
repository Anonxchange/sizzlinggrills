
import { ChefHat, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-grill-charcoal text-white overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-grill-charcoal/90 to-grill-smoke/80 z-10"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="mb-6 inline-flex items-center px-4 py-2 bg-primary/20 rounded-full text-primary border border-primary/30">
            <ChefHat className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Premium BBQ Experience</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair">
            Fire Up Your
            <span className="gradient-fire bg-clip-text text-transparent block">
              Taste Buds
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Experience the perfect blend of smoky flavors and tender perfection at our premium grill house
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold">
              View Our Menu
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-grill-charcoal px-8 py-4 text-lg font-semibold">
              Reserve Table
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center animate-scale-in">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                <ChefHat className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert Chefs</h3>
              <p className="text-gray-400 text-sm">Master grill chefs with 20+ years experience</p>
            </div>
            
            <div className="flex flex-col items-center text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quick Service</h3>
              <p className="text-gray-400 text-sm">Fast preparation without compromising quality</p>
            </div>
            
            <div className="flex flex-col items-center text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Prime Location</h3>
              <p className="text-gray-400 text-sm">Heart of downtown with easy parking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
