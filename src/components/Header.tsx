import { useState } from 'react';
import { Menu, X, Phone, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import CartDrawer from '@/components/CartDrawer';
import ProfileDropdown from '@/components/ProfileDropdown';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Catering', href: '/services/catering' },
    { name: 'Private Events', href: '/services/events' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold text-primary font-playfair hover:text-primary/80 transition-colors">
                Sizzling Grill
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-grill-smoke hover:text-primary transition-colors duration-200 font-medium ${
                  location.pathname === item.href ? 'text-primary border-b-2 border-primary' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-sm text-grill-smoke">
              <Phone className="w-4 h-4 mr-1" />
              (555) 123-GRILL
            </div>
            {getTotalItems() > 0 && <CartDrawer />}
            <ProfileDropdown />
            <Link to="/checkout">
              <Button 
                variant="outline"
                className="bg-white border-primary text-primary hover:bg-primary hover:text-white"
              >
                Checkout
              </Button>
            </Link>
            <Link to="/reservations">
              <Button className="bg-primary hover:bg-primary/90">
                Reserve Table
              </Button>
            </Link>
          </div>

          {/* Mobile menu button and cart */}
          <div className="md:hidden flex items-center space-x-2">
            {getTotalItems() > 0 && <CartDrawer />}
            <ProfileDropdown />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-grill-smoke hover:text-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border animate-fade-in">
          <div className="px-4 py-3 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-grill-smoke hover:text-primary transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <div className="flex items-center text-sm text-grill-smoke mb-3">
                <Phone className="w-4 h-4 mr-2" />
                (555) 123-GRILL
              </div>
              <div className="space-y-2">
                <Link to="/checkout" className="block">
                  <Button 
                    variant="outline"
                    className="w-full bg-white border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Checkout
                  </Button>
                </Link>
                <Link to="/reservations" className="block">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Reserve Table
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;