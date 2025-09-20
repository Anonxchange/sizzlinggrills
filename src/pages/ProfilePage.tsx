
import { useState, useEffect } from 'react';
import { User, Wallet, ShoppingBag, Gift, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Clock, CheckCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useSupabase } from '@/hooks/useSupabase';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface WalletData {
  balance: number;
  user_id: string;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  created_at: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Order {
  id: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  created_at: string;
  items: any[];
}

interface GiftCard {
  id: string;
  code: string;
  amount: number;
  balance: number;
  status: 'active' | 'used' | 'expired';
  created_at: string;
  recipient_name?: string;
  sender_name?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  const { fetchData, insertData } = useSupabase();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await loadUserData(session.user.id);
      } else {
        window.location.href = '/';
      }
    };
    getUser();
  }, []);

  const loadUserData = async (userId: string) => {
    try {
      setLoading(true);
      
      // Load wallet data
      const walletData = await fetchData('wallets');
      const userWallet = walletData?.find((w: any) => w.user_id === userId);
      setWallet(userWallet || null);

      // Load transactions
      const transactionData = await fetchData('wallet_transactions');
      const userTransactions = transactionData?.filter((t: any) => t.user_id === userId) || [];
      setTransactions(userTransactions.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));

      // Load orders (placeholder - you'll need to create orders table)
      const orderData = await fetchData('orders');
      const userOrders = orderData?.filter((o: any) => o.user_id === userId) || [];
      setOrders(userOrders.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));

      // Load gift cards
      const giftCardData = await fetchData('gift_cards');
      const userGiftCards = giftCardData?.filter((g: any) => 
        g.recipient_email === user?.email || g.sender_email === user?.email
      ) || [];
      setGiftCards(userGiftCards.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));

    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Error",
        description: "Failed to load your profile data. Please refresh the page.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTopUp = async () => {
    if (!topUpAmount || !user) return;
    
    const amount = parseInt(topUpAmount.replace(/[^0-9]/g, ''));
    if (amount < 100) {
      toast({
        title: "Invalid Amount",
        description: "Minimum top-up amount is ₦100",
        variant: "destructive"
      });
      return;
    }

    setActionLoading(true);
    try {
      // Create transaction record
      const transactionData = {
        user_id: user.id,
        type: 'credit',
        amount: amount,
        description: 'Wallet top-up',
        status: 'completed',
        created_at: new Date().toISOString()
      };

      await insertData('wallet_transactions', transactionData);

      // Update wallet balance
      const newBalance = (wallet?.balance || 0) + amount;
      
      if (wallet) {
        // Update existing wallet
        const { error } = await supabase
          .from('wallets')
          .update({ balance: newBalance, updated_at: new Date().toISOString() })
          .eq('user_id', user.id);
          
        if (error) throw error;
      } else {
        // Create new wallet
        const walletData = {
          user_id: user.id,
          balance: newBalance,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        await insertData('wallets', walletData);
      }

      toast({
        title: "Top-up Successful! 💰",
        description: `₦${amount.toLocaleString()} has been added to your wallet.`
      });

      setTopUpAmount('');
      await loadUserData(user.id);
      
    } catch (error) {
      console.error('Top-up error:', error);
      toast({
        title: "Top-up Failed",
        description: "There was an error processing your top-up. Please try again.",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRedeemGiftCard = async () => {
    if (!giftCardCode || !user) return;

    setActionLoading(true);
    try {
      // Find gift card by code
      const { data: giftCardData, error: fetchError } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('code', giftCardCode.toUpperCase())
        .eq('status', 'active')
        .single();

      if (fetchError || !giftCardData) {
        throw new Error('Invalid or expired gift card code');
      }

      if (giftCardData.balance <= 0) {
        throw new Error('This gift card has already been fully redeemed');
      }

      // Add gift card balance to wallet
      const giftCardAmount = giftCardData.balance;
      const newWalletBalance = (wallet?.balance || 0) + giftCardAmount;

      // Create transaction record
      const transactionData = {
        user_id: user.id,
        type: 'credit',
        amount: giftCardAmount,
        description: `Gift card redemption: ${giftCardCode.toUpperCase()}`,
        status: 'completed',
        created_at: new Date().toISOString()
      };

      await insertData('wallet_transactions', transactionData);

      // Update wallet
      if (wallet) {
        const { error } = await supabase
          .from('wallets')
          .update({ balance: newWalletBalance, updated_at: new Date().toISOString() })
          .eq('user_id', user.id);
        if (error) throw error;
      } else {
        const walletData = {
          user_id: user.id,
          balance: newWalletBalance,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        await insertData('wallets', walletData);
      }

      // Mark gift card as used
      const { error: updateError } = await supabase
        .from('gift_cards')
        .update({ 
          status: 'used', 
          balance: 0,
          redeemed_by: user.email,
          redeemed_at: new Date().toISOString() 
        })
        .eq('code', giftCardCode.toUpperCase());

      if (updateError) throw updateError;

      toast({
        title: "Gift Card Redeemed! 🎉",
        description: `${formatCurrency(giftCardAmount)} has been added to your wallet.`
      });

      setGiftCardCode('');
      await loadUserData(user.id);
      
    } catch (error: any) {
      console.error('Redeem error:', error);
      toast({
        title: "Redemption Failed",
        description: error.message || "Invalid gift card code or gift card already used.",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'cancelled':
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'used':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-cream">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-grill-smoke">Loading your profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-grill-charcoal font-playfair">
                    Welcome back!
                  </h1>
                  <p className="text-grill-smoke">{user?.email}</p>
                </div>
              </div>

              {/* Wallet Balance Card */}
              <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 mb-2">Wallet Balance</p>
                      <p className="text-3xl font-bold">
                        {formatCurrency(wallet?.balance || 0)}
                      </p>
                    </div>
                    <Wallet className="w-12 h-12 text-white/80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="wallet" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="gift-cards">Gift Cards</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* Wallet Tab */}
              <TabsContent value="wallet" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Top Up Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Top Up Wallet
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="topup-amount">Amount (₦)</Label>
                        <Input
                          id="topup-amount"
                          type="text"
                          placeholder="Enter amount"
                          value={topUpAmount}
                          onChange={(e) => setTopUpAmount(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handleTopUp}
                        disabled={!topUpAmount || actionLoading}
                        className="w-full"
                      >
                        {actionLoading ? 'Processing...' : 'Top Up Wallet'}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Redeem Gift Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gift className="w-5 h-5" />
                        Redeem Gift Card
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="gift-code">Gift Card Code</Label>
                        <Input
                          id="gift-code"
                          type="text"
                          placeholder="Enter gift card code"
                          value={giftCardCode}
                          onChange={(e) => setGiftCardCode(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handleRedeemGiftCard}
                        disabled={!giftCardCode || actionLoading}
                        className="w-full"
                        variant="outline"
                      >
                        {actionLoading ? 'Processing...' : 'Redeem Gift Card'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Transaction History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {transactions.length === 0 ? (
                      <p className="text-center text-grill-smoke py-8">No transactions yet</p>
                    ) : (
                      <div className="space-y-4">
                        {transactions.map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                {transaction.type === 'credit' ? 
                                  <ArrowDownLeft className="w-5 h-5 text-green-600" /> :
                                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                                }
                              </div>
                              <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-sm text-grill-smoke">
                                  {new Date(transaction.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${
                                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.type === 'credit' ? '+' : '-'}
                                {formatCurrency(transaction.amount)}
                              </p>
                              <Badge className={getStatusColor(transaction.status)}>
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Order History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-grill-smoke mb-4">No orders yet</p>
                        <Button onClick={() => window.location.href = '/menu'}>
                          Browse Menu
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold">Order #{order.id.slice(-8)}</h4>
                                <p className="text-sm text-grill-smoke">
                                  {new Date(order.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-primary">
                                  {formatCurrency(order.total_amount)}
                                </p>
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-grill-smoke">
                              {order.items?.length || 0} items
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Gift Cards Tab */}
              <TabsContent value="gift-cards">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-grill-charcoal">Your Gift Cards</h2>
                    <Button onClick={() => window.location.href = '/gift-cards'}>
                      <Gift className="w-4 h-4 mr-2" />
                      Buy Gift Card
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      {giftCards.length === 0 ? (
                        <div className="text-center py-12">
                          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-grill-smoke mb-4">No gift cards yet</p>
                          <Button onClick={() => window.location.href = '/gift-cards'}>
                            Buy Your First Gift Card
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {giftCards.map((giftCard) => (
                            <div key={giftCard.id} className="border rounded-lg p-4 bg-gradient-to-br from-primary/5 to-primary/10">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold">Gift Card</h4>
                                  <p className="text-sm font-mono text-grill-smoke">
                                    {giftCard.code}
                                  </p>
                                </div>
                                <Badge className={getStatusColor(giftCard.status)}>
                                  {giftCard.status}
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Original Value:</span>
                                  <span className="text-sm font-semibold">
                                    {formatCurrency(giftCard.amount)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Balance:</span>
                                  <span className="text-sm font-semibold text-primary">
                                    {formatCurrency(giftCard.balance)}
                                  </span>
                                </div>
                                {giftCard.recipient_name && (
                                  <p className="text-xs text-grill-smoke">
                                    For: {giftCard.recipient_name}
                                  </p>
                                )}
                                {giftCard.sender_name && (
                                  <p className="text-xs text-grill-smoke">
                                    From: {giftCard.sender_name}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Email Address</Label>
                        <p className="text-grill-charcoal font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <Label>Member Since</Label>
                        <p className="text-grill-charcoal font-medium">
                          {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{orders.length}</p>
                          <p className="text-sm text-grill-smoke">Total Orders</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{giftCards.length}</p>
                          <p className="text-sm text-grill-smoke">Gift Cards</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-primary">
                            {formatCurrency(wallet?.balance || 0)}
                          </p>
                          <p className="text-sm text-grill-smoke">Wallet Balance</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
