import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

// Types
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  priceNGN: number;
  image: string;
  popular: boolean;
  spicy: boolean;
}

export interface CartItem {
  itemId: number;
  qty: number;
  item: MenuItem;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: MenuItem; qty?: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: number } }
  | { type: 'UPDATE_QTY'; payload: { itemId: number; qty: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_CART_OPEN'; payload: { isOpen: boolean } }
  | { type: 'LOAD_CART'; payload: { items: CartItem[] } };

interface CartContextType {
  state: CartState;
  addItem: (item: MenuItem, qty?: number) => void;
  removeItem: (itemId: number) => void;
  updateQty: (itemId: number, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getFormattedTotal: () => string;
}

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, qty = 1 } = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.itemId === item.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(cartItem =>
            cartItem.itemId === item.id
              ? { ...cartItem, qty: cartItem.qty + qty }
              : cartItem
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { itemId: item.id, qty, item }]
      };
    }
    
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.itemId !== action.payload.itemId)
      };
    }
    
    case 'UPDATE_QTY': {
      const { itemId, qty } = action.payload;
      if (qty <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.itemId !== itemId)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.itemId === itemId ? { ...item, qty } : item
        )
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        items: []
      };
    }
    
    case 'TOGGLE_CART': {
      return {
        ...state,
        isOpen: !state.isOpen
      };
    }
    
    case 'SET_CART_OPEN': {
      return {
        ...state,
        isOpen: action.payload.isOpen
      };
    }
    
    case 'LOAD_CART': {
      return {
        ...state,
        items: action.payload.items
      };
    }
    
    default:
      return state;
  }
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sizzling-grill-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: { items: parsedCart } });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sizzling-grill-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: MenuItem, qty: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, qty } });
  };

  const removeItem = (itemId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const updateQty = (itemId: number, qty: number) => {
    dispatch({ type: 'UPDATE_QTY', payload: { itemId, qty } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const setCartOpen = (isOpen: boolean) => {
    dispatch({ type: 'SET_CART_OPEN', payload: { isOpen } });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.qty, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.item.priceNGN * item.qty), 0);
  };

  const getFormattedTotal = () => {
    return formatCurrency(getTotalPrice());
  };

  const contextValue: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    toggleCart,
    setCartOpen,
    getTotalItems,
    getTotalPrice,
    getFormattedTotal,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}