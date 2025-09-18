
import { Award, Users, Clock, ChefHat } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Users, label: "Happy Customers", value: "10K+" },
    { icon: Clock, label: "Years of Experience", value: "15+" },
    { icon: ChefHat, label: "Expert Chefs", value: "8" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-grill-charcoal font-playfair">
              The Art of Perfect Grilling
            </h2>
            <p className="text-lg text-grill-smoke mb-6 leading-relaxed">
              For over 15 years, Sizzling Grill has been the premier destination for 
              authentic BBQ and grilled cuisine. Our passion lies in transforming premium 
              ingredients into unforgettable culinary experiences.
            </p>
            <p className="text-lg text-grill-smoke mb-8 leading-relaxed">
              Every dish is crafted with precision, using time-honored techniques passed 
              down through generations. From our signature dry rubs to our slow-smoking 
              process, we ensure each bite delivers exceptional flavor and tenderness.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center p-4 rounded-lg bg-warm-cream animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-grill-charcoal mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-grill-smoke font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
                alt="Chef grilling"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-grill-charcoal/30 to-transparent"></div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border animate-scale-in">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-grill-charcoal">Master Chef</div>
                  <div className="text-sm text-grill-smoke">Since 2008</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
