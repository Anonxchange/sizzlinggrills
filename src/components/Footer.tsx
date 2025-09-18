import { Facebook, Instagram, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'Menu', path: '/menu' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ],
    'Services': [
      { name: 'Dine In', path: '/services/dine-in' },
      { name: 'Takeout', path: '/services/takeout' },
      { name: 'Catering', path: '/services/catering' },
      { name: 'Private Events', path: '/services/events' }
    ],
    'Info': [
      { name: 'Hours', path: '/info/hours' },
      { name: 'Parking', path: '/info/parking' },
      { name: 'Gift Cards', path: '/info/gift-cards' },
      { name: 'Careers', path: '/info/careers' }
    ]
  };

  return (
    <footer className="bg-grill-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 font-playfair text-primary">
              Sizzling Grill
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Where passion meets flavor. Experience the finest grilled cuisine
              crafted with love and served with pride.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-grill-smoke rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold mb-4 text-primary">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={`${title}-${link.name}-${index}`}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-grill-smoke mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Sizzling Grill. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for food lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;