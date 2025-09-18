
import { ChefHat, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
            <span className="text-sm font-medium">Premium BBQ Experience</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair">
            Fire Up Your
            <span className="gradient-fire bg-clip-text text-transparent block">
              Taste Buds
            </span>
          </h1>
          
          {/* Food Carousel */}
          <div className="relative max-w-6xl mx-auto mb-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                })
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {[
                  {
                    id: 1,
                    src: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
                    alt: "Grilled Wagyu Steak"
                  },
                  {
                    id: 2,
                    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
                    alt: "BBQ Smoked Brisket"
                  },
                  {
                    id: 3,
                    src: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
                    alt: "Spicy Grilled Chicken"
                  },
                  {
                    id: 4,
                    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
                    alt: "Grilled Salmon Fillet"
                  },
                  {
                    id: 5,
                    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                    alt: "Grilled Vegetables"
                  },
                  {
                    id: 6,
                    src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
                    alt: "BBQ Pork Ribs"
                  },
                  {
                    id: 7,
                    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=80",
                    alt: "Grilled Pizza"
                  },
                  {
                    id: 8,
                    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
                    alt: "Seafood Grill"
                  }
                ].map((image) => (
                  <CarouselItem 
                    key={image.id} 
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="relative group overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-lg font-playfair">
                            {image.alt}
                          </h3>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white border-primary" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white border-primary" />
            </Carousel>
          </div>

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
