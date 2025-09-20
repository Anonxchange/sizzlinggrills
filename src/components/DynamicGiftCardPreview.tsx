import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";

const ChefHatIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C8.69 2 6 4.69 6 8c0 .34.03.67.08 1H6a3 3 0 0 0 0 6v2a2 2 0 0 0 2 2v3h8v-3a2 2 0 0 0 2-2v-2a3 3 0 0 0 0-6h-.08c.05-.33.08-.66.08-1 0-3.31-2.69-6-6-6z" />
  </svg>
);

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
                <ChefHatIcon size={20} className="text-[#2c1a10]" />
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