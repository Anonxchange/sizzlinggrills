import { useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const FoodCarousel = () => {
  const foodImages = [
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
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-grill-charcoal to-warm-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-playfair">
            Our Delicious Creations
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A visual journey through our mouth-watering dishes
          </p>
        </div>
        
        {/* Orange bordered carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="border-4 border-primary rounded-xl p-4 bg-white shadow-2xl">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              data-testid="carousel-food"
            >
              <CarouselContent className="-ml-4">
                {foodImages.map((image, index) => (
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
                      {/* Overlay with food name */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-lg font-playfair">
                            {image.alt}
                          </h3>
                        </div>
                      </div>
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white border-primary" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white border-primary" />
            </Carousel>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary rounded-full animate-pulse"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default FoodCarousel;