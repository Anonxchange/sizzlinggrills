import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import GiftCardPage from "./pages/GiftCardPage";
import ReservationPage from "./pages/ReservationPage";
import Checkout from "./pages/Checkout";
import DineInPage from "./pages/DineInPage";
import TakeoutPage from "./pages/TakeoutPage";
import CateringPage from "./pages/CateringPage";
import PrivateEventsPage from "./pages/PrivateEventsPage";
import HowToOrderPage from './pages/HowToOrderPage';
import ParkingPage from './pages/ParkingPage';
import CareersPage from './pages/CareersPage';
import HoursPage from './pages/HoursPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gift-cards" element={<GiftCardPage />} />
            <Route path="/info/gift-cards" element={<GiftCardPage />} />
            <Route path="/reservations" element={<ReservationPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/services/dine-in" element={<DineInPage />} />
            <Route path="/services/takeout" element={<TakeoutPage />} />
            <Route path="/services/catering" element={<CateringPage />} />
            <Route path="/services/events" element={<PrivateEventsPage />} />
            <Route path="/info/how-to-order" element={<HowToOrderPage />} />
            <Route path="/info/parking" element={<ParkingPage />} />
            <Route path="/info/careers" element={<CareersPage />} />
            <Route path="/info/hours" element={<HoursPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;