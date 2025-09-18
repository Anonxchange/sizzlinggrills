
import { Flame, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      name: "Wagyu Ribeye Steak",
      description: "Premium 16oz wagyu ribeye grilled to perfection with herb butter",
      price: "$65",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=500&q=80",
      popular: true,
      spicy: false
    },
    {
      id: 2,
      name: "BBQ Smoked Brisket",
      description: "12-hour smoked brisket with our signature dry rub and tangy sauce",
      price: "$28",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
      popular: true,
      spicy: false
    },
    {
      id: 3,
      name: "Spicy Grilled Chicken",
      description: "Marinated chicken breast with jalapeño lime glaze and cilantro",
      price: "$22",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: true
    },
    {
      id: 4,
      name: "Grilled Salmon Fillet",
      description: "Atlantic salmon with lemon herb seasoning and grilled vegetables",
      price: "$32",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false
    },
    {
      id: 5,
      name: "BBQ Pork Ribs",
      description: "Fall-off-the-bone ribs with smoky BBQ sauce and coleslaw",
      price: "$26",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
      popular: true,
      spicy: false
    },
    {
      id: 6,
      name: "Grilled Vegetable Platter",
      description: "Seasonal vegetables grilled with balsamic glaze and fresh herbs",
      price: "$18",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false
    }
  ];

  return (
    <section id="menu" className="py-20 bg-warm-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-grill-charcoal font-playfair">
            Our Signature Menu
          </h2>
          <p className="text-xl text-grill-smoke max-w-2xl mx-auto">
            Discover our carefully curated selection of premium grilled dishes, 
            crafted with the finest ingredients and traditional techniques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in border-0 bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.popular && (
                    <Badge className="bg-primary text-white flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Popular
                    </Badge>
                  )}
                  {item.spicy && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      Spicy
                    </Badge>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-grill-charcoal font-playfair">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-primary">
                    {item.price}
                  </span>
                </div>
                <p className="text-grill-smoke leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
