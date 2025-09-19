import { Flame, Star, ShoppingCart, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Menu = () => {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  // ✅ New categories
  const categories = ['All', 'Food', 'Snacks & Desserts', 'Drinks'];

  // ✅ Menu items regrouped
  const menuItems = [
    // Food
    {
      id: 1,
      name: "Wagyu Ribeye Steak",
      description: "Premium 16oz wagyu ribeye grilled to perfection with herb butter",
      priceNGN: 52000,
      image: "/IMG_3500.jpeg",
      popular: true,
      spicy: false,
      category: "Food"
    },
    {
      id: 2,
      name: "Premium Grilled Steak",
      description: "Tender ribeye steak grilled to perfection with our signature sauce",
      priceNGN: 45000,
      image: "/IMG_3505.jpeg",
      popular: true,
      spicy: false,
      category: "Food"
    },
    {
      id: 3,
      name: "T-Bone Steak",
      description: "Classic T-bone steak with garlic butter and grilled onions",
      priceNGN: 38000,
      image: "/IMG_3631.jpeg",
      popular: false,
      spicy: false,
      category: "Food"
    },
    // … all other Steaks, Wings, Vegetables, Burgers, Ribs, Seafood, Chicken, Pork, Appetizers
    // just keep them under "Food"

    // Snacks & Desserts
    {
      id: 50,
      name: "Parfait",
      description: "Creamy yoghurt parfait with granola and fresh fruits",
      priceNGN: 6000,
      image: "/parfait.jpeg",
      popular: true,
      spicy: false,
      category: "Snacks & Desserts"
    },
    {
      id: 51,
      name: "Meat Pie",
      description: "Classic Nigerian meat pie with beef filling",
      priceNGN: 2500,
      image: "/meatpie.jpeg",
      popular: false,
      spicy: false,
      category: "Snacks & Desserts"
    },
    {
      id: 52,
      name: "Chocolate Cake Slice",
      description: "Rich chocolate cake slice with cream topping",
      priceNGN: 3500,
      image: "/cake.jpeg",
      popular: false,
      spicy: false,
      category: "Snacks & Desserts"
    },

    // Drinks
    {
      id: 60,
      name: "Chapman",
      description: "Refreshing Nigerian Chapman cocktail",
      priceNGN: 3500,
      image: "/chapman.jpeg",
      popular: true,
      spicy: false,
      category: "Drinks"
    },
    {
      id: 61,
      name: "Soft Drink (Coke)",
      description: "Chilled Coca-Cola bottle",
      priceNGN: 1000,
      image: "/coke.jpeg",
      popular: false,
      spicy: false,
      category: "Drinks"
    },
    {
      id: 62,
      name: "Red Wine",
      description: "Premium red wine bottle",
      priceNGN: 15000,
      image: "/wine.jpeg",
      popular: false,
      spicy: false,
      category: "Drinks"
    },
    {
      id: 63,
      name: "Beer",
      description: "Cold bottle of premium lager beer",
      priceNGN: 2000,
      image: "/beer.jpeg",
      popular: false,
      spicy: false,
      category: "Drinks"
    }
  ];

  // ✅ Filtering
  const displayItems = useMemo(() => {
    let filteredItems = menuItems;

    if (searchQuery.trim()) {
      filteredItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (isHomepage && activeCategory === 'All' && !searchQuery.trim()) {
      const shuffled = [...filteredItems].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 13);
    }

    if (activeCategory !== 'All') {
      filteredItems = filteredItems.filter(item => item.category === activeCategory);
    }

    return filteredItems;
  }, [isHomepage, activeCategory, searchQuery]);

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

        {!isHomepage && (
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grill-smoke w-4 h-4" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-white border-grill-charcoal/20 focus:border-primary"
              />
            </div>
          </div>
        )}

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
              <div className="relative overflow-hidden rounded-t-lg h-72">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
              {searchQuery.trim() 
                ? `No items found for "${searchQuery}"` 
                : `No items found in the ${activeCategory} category.`
              }
            </p>
            {searchQuery.trim() && (
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
                className="mt-4"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}

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