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

  // ✅ New category structure
  const categories = ['All', 'Food', 'Snacks & Desserts', 'Drinks'];

  // ✅ Update all 45 items to "Food"
  const menuItems = [
    // Steaks
    { id: 1, name: "Wagyu Ribeye Steak", description: "Premium 16oz wagyu ribeye grilled to perfection with herb butter", priceNGN: 52000, image: "/IMG_3500.jpeg", popular: true, spicy: false, category: "Food" },
    { id: 2, name: "Premium Grilled Steak", description: "Tender ribeye steak grilled to perfection with our signature sauce", priceNGN: 45000, image: "/IMG_3505.jpeg", popular: true, spicy: false, category: "Food" },
    { id: 3, name: "T-Bone Steak", description: "Classic T-bone steak with garlic butter and grilled onions", priceNGN: 38000, image: "/IMG_3631.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 4, name: "Sirloin Steak", description: "Juicy sirloin steak with rosemary and thyme seasoning", priceNGN: 35000, image: "/IMG_3639.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 5, name: "Filet Mignon", description: "Tender filet mignon with red wine reduction", priceNGN: 55000, image: "/IMG_3640.jpeg", popular: true, spicy: false, category: "Food" },
    { id: 6, name: "NY Strip Steak", description: "Classic New York strip with compound butter", priceNGN: 42000, image: "/IMG_3670.jpeg", popular: false, spicy: false, category: "Food" },
    // Wings
    { id: 7, name: "Buffalo Wings", description: "Crispy wings tossed in spicy buffalo sauce with blue cheese dip", priceNGN: 15600, image: "/IMG_3672.jpeg", popular: true, spicy: true, category: "Food" },
    { id: 8, name: "BBQ Wings", description: "Smoky BBQ wings with tangy sauce and celery sticks", priceNGN: 14400, image: "/IMG_3674.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 9, name: "Honey Garlic Wings", description: "Sweet and savory wings glazed with honey garlic sauce", priceNGN: 16800, image: "/IMG_3676.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 10, name: "Spicy Korean Wings", description: "Korean-style wings with gochujang glaze", priceNGN: 17200, image: "/IMG_3705.jpeg", popular: false, spicy: true, category: "Food" },
    { id: 11, name: "Lemon Pepper Wings", description: "Zesty lemon pepper seasoned wings", priceNGN: 15200, image: "/IMG_3740.jpeg", popular: false, spicy: false, category: "Food" },
    // Vegetables
    { id: 12, name: "Grilled Vegetable Platter", description: "Seasonal vegetables grilled with balsamic glaze and fresh herbs", priceNGN: 14400, image: "/IMG_3759.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 13, name: "Grilled Portobello Mushroom", description: "Large portobello cap grilled with herbs and topped with cheese", priceNGN: 12800, image: "/IMG_3813.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 14, name: "Mediterranean Vegetable Skewers", description: "Bell peppers, zucchini, and cherry tomatoes with olive oil and herbs", priceNGN: 11200, image: "/IMG_3816.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 15, name: "Grilled Asparagus", description: "Fresh asparagus spears with lemon and parmesan", priceNGN: 10800, image: "/IMG_3822.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 16, name: "Stuffed Bell Peppers", description: "Grilled bell peppers stuffed with quinoa and herbs", priceNGN: 13600, image: "/IMG_3870.jpeg", popular: false, spicy: false, category: "Food" },
    // Burgers
    { id: 17, name: "The Grill Master Burger", description: "Double beef patty with bacon, cheese, lettuce, and special sauce", priceNGN: 19200, image: "/IMG_3882.jpeg", popular: true, spicy: false, category: "Food" },
    { id: 18, name: "BBQ Bacon Burger", description: "Juicy beef patty with crispy bacon, BBQ sauce, and onion rings", priceNGN: 17600, image: "/IMG_3883.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 19, name: "Spicy Jalapeño Burger", description: "Beef patty with jalapeños, pepper jack cheese, and spicy mayo", priceNGN: 18400, image: "/IMG_3916.jpeg", popular: false, spicy: true, category: "Food" },
    { id: 20, name: "Mushroom Swiss Burger", description: "Beef patty topped with sautéed mushrooms and swiss cheese", priceNGN: 16800, image: "/IMG_3978.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 21, name: "Classic Cheeseburger", description: "Traditional beef patty with cheddar cheese and all the fixings", priceNGN: 15600, image: "/IMG_3984.jpeg", popular: true, spicy: false, category: "Food" },
    // Ribs
    { id: 22, name: "BBQ Pork Ribs", description: "Fall-off-the-bone ribs with smoky BBQ sauce and coleslaw", priceNGN: 20800, image: "/IMG_3994.jpeg", popular: true, spicy: false, category: "Food" },
    { id: 23, name: "BBQ Smoked Brisket", description: "12-hour smoked brisket with our signature dry rub and tangy sauce", priceNGN: 22400, image: "/IMG_3995.jpeg", popular: true, spicy: false, category: "Food" },
    { id: 24, name: "Spicy Baby Back Ribs", description: "Tender baby back ribs with our signature spicy rub", priceNGN: 24000, image: "/IMG_3996.jpeg", popular: false, spicy: true, category: "Food" },
    { id: 25, name: "Kansas City Style Ribs", description: "Thick molasses-based sauce on tender pork ribs", priceNGN: 23200, image: "/IMG_3997.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 26, name: "St. Louis Style Ribs", description: "Trimmed spare ribs with sweet and tangy glaze", priceNGN: 21600, image: "/IMG_3999.jpeg", popular: false, spicy: false, category: "Food" },
    // Seafood
    { id: 27, name: "Grilled Salmon Fillet", description: "Atlantic salmon with lemon herb seasoning and grilled vegetables", priceNGN: 25600, image: "/IMG_4001.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 28, name: "Grilled Shrimp Skewers", description: "Jumbo shrimp marinated in garlic and herbs, grilled to perfection", priceNGN: 22400, image: "/IMG_4042.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 29, name: "Grilled Sea Bass", description: "Fresh sea bass with Mediterranean herbs and lemon butter", priceNGN: 28800, image: "/IMG_8592.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 30, name: "Grilled Lobster Tail", description: "Fresh lobster tail with garlic butter and herbs", priceNGN: 35200, image: "/IMG_8771.jpeg", popular: true, spicy: false, category: "Food" },
    { id: 31, name: "Blackened Mahi Mahi", description: "Spice-crusted mahi mahi with tropical salsa", priceNGN: 26400, image: "/IMG_8772.jpeg", popular: false, spicy: true, category: "Food" },
    // Chicken
    { id: 32, name: "Grilled Chicken Breast", description: "Herb-marinated chicken breast with lemon garlic sauce", priceNGN: 18400, image: "/IMG_8773.jpeg", popular: true, spicy: false, category: "Food" },
    { id: 33, name: "BBQ Chicken Thighs", description: "Juicy chicken thighs with smoky BBQ glaze", priceNGN: 16800, image: "/IMG_8774.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 34, name: "Spicy Grilled Chicken", description: "Cayenne and paprika rubbed chicken with cooling yogurt sauce", priceNGN: 17600, image: "/IMG_8775.jpeg", popular: false, spicy: true, category: "Food" },
    { id: 35, name: "Jerk Chicken", description: "Caribbean spiced chicken with pineapple salsa", priceNGN: 19200, image: "/IMG_8776.jpeg", popular: false, spicy: true, category: "Food" },
    { id: 36, name: "Teriyaki Chicken", description: "Grilled chicken glazed with homemade teriyaki sauce", priceNGN: 18000, image: "/IMG_8779.jpeg", popular: false, spicy: false, category: "Food" },
    // Pork
    { id: 37, name: "Grilled Pork Tenderloin", description: "Tender pork loin with apple cider glaze", priceNGN: 21600, image: "/IMG_8780.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 38, name: "Pulled Pork Sandwich", description: "Slow-smoked pulled pork on brioche bun with coleslaw", priceNGN: 16400, image: "/IMG_8782.jpeg", popular: true, spicy: false, category: "Food" },
    { id: 39, name: "Pork Chops", description: "Thick-cut pork chops with rosemary and garlic", priceNGN: 19600, image: "/IMG_8783.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 40, name: "Bacon Wrapped Pork Medallions", description: "Pork tenderloin medallions wrapped in crispy bacon", priceNGN: 23200, image: "/IMG_8785.jpeg", popular: false, spicy: false, category: "Food" },
    // Appetizers
    { id: 41, name: "Grilled Halloumi", description: "Grilled halloumi cheese with honey and herbs", priceNGN: 12000, image: "/IMG_8786.jpeg", popular: false, spicy: false, category: "Food" },
    { id: 42, name: "Bacon Wrapped Scallops", description: "Fresh scallops wrapped in crispy bacon", priceNGN: 18800, image: "/IMG_0229.png", popular: true, spicy: false, category: "Food" },
    { id: 43, name: "Grilled Artichokes", description: "Baby artichokes grilled with lemon aioli", priceNGN: 11200, image: "/IMG_0231.png", popular: false, spicy: false, category: "Food" },
    { id: 44, name: "Stuffed Jalapeños", description: "Jalapeños stuffed with cream cheese and bacon", priceNGN: 13600, image: "/IMG_0232.png", popular: false, spicy: true, category: "Food" },
    { id: 45, name: "Grilled Corn on the Cob", description: "Fresh corn with chili lime butter", priceNGN: 8800, image: "/IMG_0234.png", popular: true, spicy: false, category: "Food" }
  ];

  // Get 13 random items for homepage, or filter normally for menu page
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

        {/* Search Input */}
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

        {/* Categories */}
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

        {/* Menu Items */}
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
                : `No items found in the ${activeCategory} category.`}
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

        {/* View All Button */}
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