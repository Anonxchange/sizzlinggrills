import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

const CartDrawer = () => {
  const { 
    state, 
    removeItem, 
    updateQty, 
    clearCart, 
    getTotalItems, 
    getFormattedTotal, 
    toggleCart, 
    setCartOpen 
  } = useCart();

  const totalItems = getTotalItems();

  return (
    <Drawer open={state.isOpen} onOpenChange={setCartOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative bg-white border-primary text-primary hover:bg-primary hover:text-white"
          onClick={toggleCart}
          data-testid="button-cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center bg-primary text-white"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent data-testid="drawer-cart" className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Your Cart ({totalItems} items)
            </div>
            {state.items.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </DrawerTitle>
          <DrawerDescription>
            Review your items and proceed to checkout when ready.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Add some delicious items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((cartItem) => (
                <div 
                  key={cartItem.itemId} 
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border shadow-sm"
                  data-testid={`row-cart-${cartItem.itemId}`}
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {cartItem.item.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(cartItem.item.priceNGN)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQty(cartItem.itemId, cartItem.qty - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    
                    <span 
                      className="w-8 text-center font-medium"
                      data-testid={`input-qty-${cartItem.itemId}`}
                    >
                      {cartItem.qty}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQty(cartItem.itemId, cartItem.qty + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-primary">
                      {formatCurrency(cartItem.item.priceNGN * cartItem.qty)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(cartItem.itemId)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="px-4 pb-6 pt-4 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-primary">
                {getFormattedTotal()}
              </span>
            </div>
            
            <div className="flex gap-2">
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1">
                  Continue Shopping
                </Button>
              </DrawerClose>
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
                onClick={() => {
                  setCartOpen(false);
                  // Navigate to checkout page - we'll implement this next
                  window.location.href = '/checkout';
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;