import { useState } from 'react';
import { Gift, Heart, Star, CreditCard, Mail, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatCurrency } from '@/lib/utils';
import { useSupabase } from '@/hooks/useSupabase';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Form validation schema
const giftCardSchema = z.object({
  recipientName: z.string().min(2, 'Recipient name must be at least 2 characters'),
  recipientEmail: z.string().email('Please enter a valid email address'),
  senderName: z.string().min(2, 'Your name must be at least 2 characters'),
  senderEmail: z.string().email('Please enter a valid email address'),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  deliveryDate: z.string().optional(),
});

type GiftCardForm = z.infer<typeof giftCardSchema>;

const GiftCardPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const { insertData, loading } = useSupabase();
  const { toast } = useToast();

  const predefinedAmounts = [5000, 10000, 15000, 20000, 25000, 50000, 75000, 100000];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GiftCardForm>({
    resolver: zodResolver(giftCardSchema),
  });

  const giftCardDesigns = [
    {
      id: 'birthday',
      name: 'Birthday Celebration',
      description: 'Perfect for birthday treats',
      icon: '🎂',
      color: 'bg-gradient-to-br from-pink-400 to-purple-600'
    },
    {
      id: 'anniversary',
      name: 'Anniversary Special',
      description: 'Romantic dining experience',
      icon: '💕',
      color: 'bg-gradient-to-br from-red-400 to-pink-600'
    },
    {
      id: 'thank-you',
      name: 'Thank You',
      description: 'Show your appreciation',
      icon: '🙏',
      color: 'bg-gradient-to-br from-green-400 to-blue-600'
    },
    {
      id: 'general',
      name: 'General Dining',
      description: 'For any occasion',
      icon: '🍽️',
      color: 'bg-gradient-to-br from-orange-400 to-red-600'
    }
  ];

  const [selectedDesign, setSelectedDesign] = useState(giftCardDesigns[0]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue)) {
      setCustomAmount(value);
      setSelectedAmount(numValue);
    } else {
      setCustomAmount('');
      setSelectedAmount(null);
    }
  };

  const getFinalAmount = () => {
    if (customAmount) {
      return parseInt(customAmount.replace(/[^0-9]/g, '')) || 0;
    }
    return selectedAmount || 0;
  };

  const onSubmit = async (data: GiftCardForm) => {
    const amount = getFinalAmount();
    
    if (!amount || amount < 1000) {
      toast({
        title: "Invalid Amount",
        description: "Gift card amount must be at least ₦1,000",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Generate a unique gift card code
      const giftCardCode = `GC${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Prepare gift card data for Supabase
      const giftCardData = {
        code: giftCardCode,
        amount: amount,
        recipient_name: data.recipientName,
        recipient_email: data.recipientEmail,
        sender_name: data.senderName,
        sender_email: data.senderEmail,
        message: data.message || '',
        design: selectedDesign.id,
        delivery_date: data.deliveryDate || new Date().toISOString().split('T')[0],
        status: 'active',
        balance: amount,
        created_at: new Date().toISOString(),
      };

      // Insert into Supabase (you'll need to create a 'gift_cards' table)
      const result = await insertData('gift_cards', giftCardData);
      
      if (result) {
        setPurchaseComplete(true);
        toast({
          title: "Gift Card Purchased Successfully! 🎉",
          description: `Gift card code: ${giftCardCode}`,
        });
        reset();
      } else {
        throw new Error('Failed to process gift card purchase');
      }
    } catch (error) {
      console.error('Gift card purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your gift card purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (purchaseComplete) {
    return (
      <div className="min-h-screen bg-warm-cream">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-lg p-12 shadow-lg">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-grill-charcoal mb-4 font-playfair">
                  Gift Card Purchased Successfully!
                </h1>
                <p className="text-grill-smoke mb-8">
                  Your gift card has been created and the recipient will receive an email with the details.
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={() => setPurchaseComplete(false)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Purchase Another Gift Card
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/menu'}
                  >
                    Browse Our Menu
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-grill-charcoal text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
              <Gift className="inline w-12 h-12 mr-4 text-primary" />
              Gift Cards
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Share the joy of exceptional dining with our digital gift cards. Perfect for any occasion!
            </p>
          </div>
        </section>

        {/* Gift Card Purchase */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Amount Selection */}
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-grill-charcoal font-playfair">
                    Choose Gift Card Amount
                  </h2>
                  
                  {/* Predefined Amounts */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        className={`h-16 text-lg font-semibold ${
                          selectedAmount === amount 
                            ? 'bg-primary hover:bg-primary/90 text-white' 
                            : 'border-primary text-primary hover:bg-primary hover:text-white'
                        }`}
                        onClick={() => handleAmountSelect(amount)}
                        data-testid={`button-amount-${amount}`}
                      >
                        {formatCurrency(amount)}
                      </Button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-grill-charcoal mb-2">
                      Custom Amount (Minimum ₦1,000)
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="text-lg"
                      data-testid="input-custom-amount"
                    />
                  </div>

                  {/* Design Selection */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-grill-charcoal">
                      Choose Design
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {giftCardDesigns.map((design) => (
                        <Card
                          key={design.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedDesign.id === design.id 
                              ? 'ring-2 ring-primary shadow-lg' 
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedDesign(design)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className={`w-full h-24 rounded-lg ${design.color} flex items-center justify-center text-4xl mb-3`}>
                              {design.icon}
                            </div>
                            <h4 className="font-semibold text-grill-charcoal mb-1">
                              {design.name}
                            </h4>
                            <p className="text-sm text-grill-smoke">
                              {design.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Form */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-grill-charcoal flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Gift Card Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Recipient Information */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-grill-charcoal border-b pb-2">
                            Recipient Information
                          </h4>
                          
                          <div>
                            <label className="block text-sm font-medium text-grill-charcoal mb-2">
                              Recipient Name *
                            </label>
                            <Input
                              {...register('recipientName')}
                              className={errors.recipientName ? 'border-red-500' : ''}
                              data-testid="input-recipient-name"
                            />
                            {errors.recipientName && (
                              <p className="text-red-500 text-sm mt-1">{errors.recipientName.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-grill-charcoal mb-2">
                              Recipient Email *
                            </label>
                            <Input
                              type="email"
                              {...register('recipientEmail')}
                              className={errors.recipientEmail ? 'border-red-500' : ''}
                              data-testid="input-recipient-email"
                            />
                            {errors.recipientEmail && (
                              <p className="text-red-500 text-sm mt-1">{errors.recipientEmail.message}</p>
                            )}
                          </div>
                        </div>

                        {/* Sender Information */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-grill-charcoal border-b pb-2">
                            Your Information
                          </h4>
                          
                          <div>
                            <label className="block text-sm font-medium text-grill-charcoal mb-2">
                              Your Name *
                            </label>
                            <Input
                              {...register('senderName')}
                              className={errors.senderName ? 'border-red-500' : ''}
                              data-testid="input-sender-name"
                            />
                            {errors.senderName && (
                              <p className="text-red-500 text-sm mt-1">{errors.senderName.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-grill-charcoal mb-2">
                              Your Email *
                            </label>
                            <Input
                              type="email"
                              {...register('senderEmail')}
                              className={errors.senderEmail ? 'border-red-500' : ''}
                              data-testid="input-sender-email"
                            />
                            {errors.senderEmail && (
                              <p className="text-red-500 text-sm mt-1">{errors.senderEmail.message}</p>
                            )}
                          </div>
                        </div>

                        {/* Optional Fields */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-grill-charcoal border-b pb-2">
                            Additional Options
                          </h4>
                          
                          <div>
                            <label className="block text-sm font-medium text-grill-charcoal mb-2">
                              Personal Message (Optional)
                            </label>
                            <Textarea
                              {...register('message')}
                              placeholder="Add a personal message to your gift card..."
                              rows={3}
                              className={errors.message ? 'border-red-500' : ''}
                              data-testid="textarea-message"
                            />
                            {errors.message && (
                              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-grill-charcoal mb-2">
                              Delivery Date (Optional)
                            </label>
                            <Input
                              type="date"
                              {...register('deliveryDate')}
                              min={new Date().toISOString().split('T')[0]}
                              data-testid="input-delivery-date"
                            />
                          </div>
                        </div>

                        {/* Total and Purchase */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-grill-charcoal">
                              Total Amount:
                            </span>
                            <span className="text-2xl font-bold text-primary">
                              {getFinalAmount() ? formatCurrency(getFinalAmount()) : formatCurrency(0)}
                            </span>
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
                            disabled={!getFinalAmount() || getFinalAmount() < 1000 || isProcessing || loading}
                            data-testid="button-purchase-gift-card"
                          >
                            {isProcessing || loading ? (
                              <>Processing...</>
                            ) : (
                              <>
                                <Gift className="w-5 h-5 mr-2" />
                                Purchase Gift Card - {getFinalAmount() ? formatCurrency(getFinalAmount()) : formatCurrency(0)}
                              </>
                            )}
                          </Button>
                          
                          <p className="text-sm text-grill-smoke mt-3 text-center">
                            The recipient will receive the gift card via email immediately after purchase.
                          </p>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 text-grill-charcoal font-playfair">
                Why Choose Our Gift Cards?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grill-charcoal">Instant Delivery</h3>
                <p className="text-grill-smoke">
                  Gift cards are delivered instantly via email, perfect for last-minute gifts.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grill-charcoal">Flexible Amounts</h3>
                <p className="text-grill-smoke">
                  Choose from preset amounts or set a custom value starting from ₦1,000.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grill-charcoal">Never Expires</h3>
                <p className="text-grill-smoke">
                  Our gift cards never expire, so recipients can enjoy them at their convenience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GiftCardPage;