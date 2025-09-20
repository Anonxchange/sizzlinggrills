import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';


const DynamicGiftCardPreview = () => {
  const amounts = [5000, 10000, 15000, 20000, 25000, 50000, 75000, 100000];
  const [currentAmountIndex, setCurrentAmountIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentAmountIndex((prev) => (prev + 1) % amounts.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [amounts.length]);

  const currentAmount = amounts[currentAmountIndex];

  return (
    <div className="flex justify-center mb-12">
      <div className="relative w-96 h-64 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-white rounded-full"></div>
        </div>
        
        {/* Content */}
        <div className="relative p-6 h-full flex flex-col justify-between text-white">
          {/* Header with Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-2xl font-bold leading-tight">Sizzling</h2>
                <h2 className="text-2xl font-bold leading-tight -mt-1">Grill</h2>
              </div>
            </div>
            
            {/* Dynamic Amount */}
            <div className="text-right">
              <div 
                className={`text-4xl font-bold transition-all duration-300 decoration-4 ${
                  isTransitioning 
                    ? 'opacity-0 scale-95 line-through decoration-white/70' 
                    : 'opacity-100 scale-100'
                }`}
              >
                {formatCurrency(currentAmount)}
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div>
            <div className="text-xl font-semibold tracking-wider mb-2">GIFT CARD</div>
            <div className="text-lg font-mono tracking-widest opacity-80">
              XXXX-XXXX-XXXX
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-end justify-between">
            <div className="text-sm opacity-80">
              <div>Valid until Dec 2026</div>
              <div className="text-xs">Not redeemable for cash. Valid online only.</div>
            </div>
            
            {/* QR Code Placeholder */}
            <div className="w-16 h-16 bg-white/20 rounded border-2 border-white/40 flex items-center justify-center">
              <div className="grid grid-cols-4 gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
      </div>
    </div>
  );
};

export default DynamicGiftCardPreview;