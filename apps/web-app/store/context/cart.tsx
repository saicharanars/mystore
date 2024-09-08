/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-case-declarations */
'use client';

import React, { createContext, useReducer, useCallback } from 'react';
import { cartProductType } from '@ecommerce/types';

interface CartContextType {
  items: cartProductType[];
  totalOrderValue: number;
  total_quantity: number;
  addItem: (product: cartProductType) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalOrderValue: 0,
  total_quantity: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

type CartState = {
  items: cartProductType[];
  totalOrderValue: number;
  total_quantity: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: cartProductType }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += 1;
        return {
          ...state,
          items: newItems,
          totalOrderValue: state.totalOrderValue + action.payload.price,
          total_quantity: state.total_quantity + 1,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          totalOrderValue: state.totalOrderValue + action.payload.price,
          total_quantity: state.total_quantity + 1,
        };
      }
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (!itemToRemove) return state;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalOrderValue:
          state.totalOrderValue - itemToRemove.price * itemToRemove.quantity,
        total_quantity: state.total_quantity - itemToRemove.quantity,
      };
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        totalOrderValue: updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        total_quantity: updatedItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      };
    case 'CLEAR_CART':
      return {
        items: [],
        totalOrderValue: 0,
        total_quantity: 0,
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalOrderValue: 0,
    total_quantity: 0,
  });

  const addItem = useCallback((product: cartProductType) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const contextValue: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
