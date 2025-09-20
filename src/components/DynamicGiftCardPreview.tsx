import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";

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
      <div className="relative w-96 h-56 bg-[#f97316] rounded-xl shadow-2xl overflow-hidden">
        {/* Content */}
        <div className="relative p-6 h-full flex flex-col justify-between text-[#2c1a10]">
          {/* Top Section */}
          <div className="flex items-start justify-between">
            <div className="font-extrabold tracking-tight">
              <h2 className="text-3xl">Sizzling</h2>
              <h2 className="text-3xl -mt-1 flex items-center gap-1">
                Grills
                <span className="text-xl">👨‍🍳</span>
              </h2>
            </div>
            <div
              className={`text-2xl font-extrabold transition-all duration-300 ${
                isTransitioning ? "opacity-0 scale-90" : "opacity-100 scale-100"
              }`}
            >
              ₦{currentAmount.toLocaleString()}
            </div>
          </div>

          {/* Middle Section */}
          <div className="text-center">
            <div className="text-lg font-bold tracking-widest">GIFT CARD</div>
            <div className="text-lg font-mono tracking-widest mt-1">
              XXXX-XXXX-XXXX
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-end justify-between">
            <div className="text-xs">
              <div>Valid until Dec 2026</div>
              <div>Not redeemable for cash.</div>
              <div>Valid online only.</div>
            </div>

            {/* Fake QR */}
            <div className="w-14 h-14 bg-[#2c1a10]/10 rounded flex items-center justify-center">
              <div className="grid grid-cols-4 gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 ${
                      Math.random() > 0.5 ? "bg-[#2c1a10]" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicGiftCardPreview;