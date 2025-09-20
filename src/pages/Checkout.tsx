import { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, MapPin, Phone, User, CheckCircle, Minus, Plus, Trash2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useSupabase } from '@/hooks/useSupabase';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface WalletData {
  balance: number;
  user_id: string;
}

const Checkout = () => {
  const { state, clearCart, getFormattedTotal, getTotalItems, updateQty, removeItem } = useCart();
  const { toast } = useToast();
  const { insertData, fetchData } = useSupabase();
  
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cash'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Check authentication and load wallet
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setCustomerDetails(prev => ({
          ...prev,
          email: session.user.email || '',
          fullName: session.user.user_metadata?.full_name || ''
        }));

        // Load wallet data
        const { data: walletData, error } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (!error && walletData) {
          setWallet(walletData);
        }
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        setWallet(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.item.priceNGN * item.qty), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerDetails.fullName || !customerDetails.phone || !customerDetails.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Check wallet balance if paying with wallet
    if (customerDetails.paymentMethod === 'wallet') {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to pay with your wallet.",
          variant: "destructive"
        });
        return;
      }

      if (!wallet || wallet.balance < getTotalPrice()) {
        toast({
          title: "Insufficient Balance",
          description: "Please top up your wallet or choose a different payment method.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      const totalAmount = getTotalPrice();
      
      // Create order record
      const orderData = {
        user_id: user?.id || null,
        items: JSON.stringify(state.items),
        total_amount: totalAmount,
        customer_info: JSON.stringify(customerDetails),
        payment_method: customerDetails.paymentMethod,
        payment_status: customerDetails.paymentMethod === 'wallet' ? 'completed' : 'pending',
        order_type: 'delivery',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const orderResult = await insertData('orders', orderData);
      
      if (!orderResult) {
        throw new Error('Failed to create order');
      }

      // Process wallet payment if selected
      if (customerDetails.paymentMethod === 'wallet' && user && wallet) {
        // Create debit transaction
        const transactionData = {
          user_id: user.id,
          wallet_id: wallet.user_id,
          type: 'debit',
          amount: totalAmount,
          description: `Order payment - Order #${orderResult[0]?.id}`,
          source: 'order',
          reference_id: orderResult[0]?.id,
          created_at: new Date().toISOString()
        };

        await insertData('wallet_transactions', transactionData);

        // Update wallet balance
        const newBalance = wallet.balance - totalAmount;
        const { error } = await supabase
          .from('wallets')
          .update({ balance: newBalance, updated_at: new Date().toISOString() })
          .eq('user_id', user.id);

        if (error) {
          throw new Error('Failed to update wallet balance');
        }

        setWallet({ ...wallet, balance: newBalance });
      }
      
      setOrderComplete(true);
      clearCart();
      
      toast({
        title: "Order Confirmed! 🎉",
        description: customerDetails.paymentMethod === 'wallet' 
          ? "Payment processed successfully. Your meal will be prepared shortly."
          : "Your delicious meal will be prepared shortly.",
        duration: 5000
      });
      
    } catch (error) {
      console.error('Order processing error:', error);
      toast({
        title: "Order Failed",
        description: "There was an issue processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0 && !orderComplete) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-warm-cream pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-grill-charcoal mb-4 font-playfair">
                Your cart is empty
              </h1>
              <p className="text-grill-smoke mb-8">
                Add some delicious items to your cart before proceeding to checkout.
              </p>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-primary hover:bg-primary/90"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Menu
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (orderComplete) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-warm-cream pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-grill-charcoal mb-4 font-playfair">
                Order Confirmed!
              </h1>
              <p className="text-grill-smoke mb-8">
                Thank you for your order! Our kitchen team will start preparing your delicious meal shortly. 
                {customerDetails.paymentMethod === 'wallet' 
                  ? ' Payment has been processed successfully.' 
                  : ' You\'ll receive a confirmation call within 15 minutes.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="bg-primary hover:bg-primary/90"
                >
                  Order More
                </Button>
                {user && (
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/profile'}
                  >
                    View Orders
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/#contact'}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-warm-cream pt-20 pb-12">
        <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-grill-charcoal font-playfair">
              Checkout
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Order Summary */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Order Summary ({getTotalItems()} items)
                  </div>
                  {state.items.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Clear All</span>
                      <span className="sm:hidden">Clear</span>
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((cartItem) => (
                  <div key={cartItem.itemId} className="flex flex-col sm:flex-row sm:items-center gap-4 py-3 border-b last:border-b-0">
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-sm sm:text-base">{cartItem.item.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {formatCurrency(cartItem.item.priceNGN)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8"
                          onClick={() => updateQty(cartItem.itemId, cartItem.qty - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="w-6 sm:w-8 text-center font-medium text-sm">
                          {cartItem.qty}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8"
                          onClick={() => updateQty(cartItem.itemId, cartItem.qty + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-primary text-sm sm:text-base">
                          {formatCurrency(cartItem.item.priceNGN * cartItem.qty)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(cartItem.itemId)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto mt-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-xl sm:text-2xl text-primary">{getFormattedTotal()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Details Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={customerDetails.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                      data-testid="input-fullname"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="e.g., +234 801 234 5678"
                      required
                      data-testid="input-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      value={customerDetails.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your complete delivery address"
                      rows={3}
                      required
                      data-testid="input-address"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Payment Method *</Label>
                    <RadioGroup
                      value={customerDetails.paymentMethod}
                      onValueChange={(value) => handleInputChange('paymentMethod', value)}
                      data-testid="input-payment-method"
                    >
                      {user && wallet && (
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="wallet" id="wallet" />
                            <Label htmlFor="wallet" className="flex items-center gap-2">
                              <Wallet className="w-4 h-4" />
                              Pay with Wallet
                            </Label>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Balance: </span>
                            <span className={`font-medium ${wallet.balance >= getTotalPrice() ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(wallet.balance)}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Cash on Delivery</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer">Bank Transfer</Label>
                      </div>
                    </RadioGroup>
                    
                    {customerDetails.paymentMethod === 'wallet' && wallet && wallet.balance < getTotalPrice() && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">
                          Insufficient wallet balance. Please top up your wallet or choose a different payment method.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => window.location.href = '/profile?tab=wallet'}
                        >
                          Top Up Wallet
                        </Button>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 sm:py-6 text-base sm:text-lg"
                    disabled={isSubmitting}
                    data-testid="button-submit-order"
                  >
                    {isSubmitting ? (
                      "Processing Order..."
                    ) : (
                      `Place Order - ${getFormattedTotal()}`
                    )}
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    By placing this order, you agree to our terms and conditions. 
                    You will receive a confirmation call within 15 minutes.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;