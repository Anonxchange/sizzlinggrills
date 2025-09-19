
import { Flame, Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Menu = () => {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  const categories = ['All', 'Steaks', 'Wings', 'Vegetables', 'Burgers', 'Ribs', 'Seafood'];

  const menuItems = [
    // Steaks
    {
      id: 1,
      name: "Wagyu Ribeye Steak",
      description: "Premium 16oz wagyu ribeye grilled to perfection with herb butter",
      priceNGN: 52000,
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=500&q=80",
      popular: true,
      spicy: false,
      category: "Steaks"
    },
    {
      id: 2,
      name: "Premium Grilled Steak",
      description: "Tender ribeye steak grilled to perfection with our signature sauce",
      priceNGN: 45000,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
      popular: true,
      spicy: false,
      category: "Steaks"
    },
    {
      id: 3,
      name: "T-Bone Steak",
      description: "Classic T-bone steak with garlic butter and grilled onions",
      priceNGN: 38000,
      image: "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false,
      category: "Steaks"
    },
    // Wings
    {
      id: 4,
      name: "Buffalo Wings",
      description: "Crispy wings tossed in spicy buffalo sauce with blue cheese dip",
      priceNGN: 15600,
      image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=500&q=80",
      popular: true,
      spicy: true,
      category: "Wings"
    },
    {
      id: 5,
      name: "BBQ Wings",
      description: "Smoky BBQ wings with tangy sauce and celery sticks",
      priceNGN: 14400,
      image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false,
      category: "Wings"
    },
    {
      id: 6,
      name: "Honey Garlic Wings",
      description: "Sweet and savory wings glazed with honey garlic sauce",
      priceNGN: 16800,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false,
      category: "Wings"
    },
    // Vegetables
    {
      id: 7,
      name: "Grilled Vegetable Platter",
      description: "Seasonal vegetables grilled with balsamic glaze and fresh herbs",
      priceNGN: 14400,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false,
      category: "Vegetables"
    },
    {
      id: 8,
      name: "Grilled Portobello Mushroom",
      description: "Large portobello cap grilled with herbs and topped with cheese",
      priceNGN: 12800,
      image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false,
      category: "Vegetables"
    },
    {
      id: 9,
      name: "Mediterranean Vegetable Skewers",
      description: "Bell peppers, zucchini, and cherry tomatoes with olive oil and herbs",
      priceNGN: 11200,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false,
      category: "Vegetables"
    },
    // Burgers
    {
      id: 10,
      name: "The Grill Master Burger",
      description: "Double beef patty with bacon, cheese, lettuce, and special sauce",
      priceNGN: 19200,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
      popular: true,
      spicy: false,
      category: "Burgers"
    },
    {
      id: 11,
      name: "BBQ Bacon Burger",
      description: "Juicy beef patty with crispy bacon, BBQ sauce, and onion rings",
      priceNGN: 17600,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false,
      category: "Burgers"
    },
    {
      id: 12,
      name: "Spicy Jalapeño Burger",
      description: "Beef patty with jalapeños, pepper jack cheese, and spicy mayo",
      priceNGN: 18400,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: true,
      category: "Burgers"
    },
    // Ribs
    {
      id: 13,
      name: "BBQ Pork Ribs",
      description: "Fall-off-the-bone ribs with smoky BBQ sauce and coleslaw",
      priceNGN: 20800,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
      popular: true,
      spicy: false,
      category: "Ribs"
    },
    {
      id: 14,
      name: "BBQ Smoked Brisket",
      description: "12-hour smoked brisket with our signature dry rub and tangy sauce",
      priceNGN: 22400,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
      popular: true,
      spicy: false,
      category: "Ribs"
    },
    {
      id: 15,
      name: "Spicy Baby Back Ribs",
      description: "Tender baby back ribs with our signature spicy rub",
      priceNGN: 24000,
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: true,
      category: "Ribs"
    },
    // Seafood
    {
      id: 16,
      name: "Grilled Salmon Fillet",
      description: "Atlantic salmon with lemon herb seasoning and grilled vegetables",
      priceNGN: 25600,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false,
      category: "Seafood"
    },
    {
      id: 17,
      name: "Grilled Shrimp Skewers",
      description: "Jumbo shrimp marinated in garlic and herbs, grilled to perfection",
      priceNGN: 22400,
      image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false,
      category: "Seafood"
    },
    {
      id: 18,
      name: "Grilled Sea Bass",
      description: "Fresh sea bass with Mediterranean herbs and lemon butter",
      priceNGN: 28800,
      image: "https://images.unsplash.com/photo-1559847844-d724f3d4e926?auto=format&fit=crop&w=500&q=80",
      popular: false,
      spicy: false,
      category: "Seafood"
    }
  ];

  // Get 8 random items for homepage, or filter normally for menu page
  const displayItems = useMemo(() => {
    if (isHomepage && activeCategory === 'All') {
      // Shuffle and take first 8 items for homepage
      const shuffled = [...menuItems].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 8);
    }
    
    // Normal filtering for menu page or when category is selected
    return activeCategory === 'All' 
      ? menuItems 
      : menuItems.filter(item => item.category === activeCategory);
  }, [isHomepage, activeCategory]);

  const handleAddToCart = (item: any) => {
    addItem(item, 1);
  };

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

        {/* Category Filter Buttons - Hidden on homepage */}
        {!isHomepage && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-2 transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-white text-grill-charcoal border-grill-charcoal hover:bg-primary hover:text-white'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item, index) => (
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
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    {item.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-grill-charcoal font-playfair">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(item.priceNGN)}
                  </span>
                </div>
                <p className="text-grill-smoke leading-relaxed mb-4">
                  {item.description}
                </p>
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  data-testid={`button-add-to-cart-${item.id}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-grill-smoke">
              No items found in the {activeCategory} category.
            </p>
          </div>
        )}

        {/* View All Menu Button - Only show on homepage */}
        {isHomepage && (
          <div className="text-center mt-8">
            <Link to="/menu">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold"
              >
                View All Menu
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
