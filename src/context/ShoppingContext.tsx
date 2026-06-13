import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product, ShoppingState } from '../types';

interface ShoppingContextType {
  state: ShoppingState;
  setMarketName: (name: string) => void;
  setBudget: (budget: number) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  clearProducts: () => void;
  totalItems: number;
  totalCost: number;
  remainingBudget: number;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export function ShoppingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ShoppingState>({
    marketName: '',
    budget: 0,
    products: [],
  });

  const setMarketName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, marketName: name }));
  }, []);

  const setBudget = useCallback((budget: number) => {
    setState((prev) => ({ ...prev, budget }));
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    // Gerando um ID único mais robusto sem bibliotecas externas para manter simplicidade
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substring(2, 15) + Date.now().toString(36),
    };
    // Adicionando no topo da lista (conforme solicitado anteriormente)
    setState((prev) => ({ ...prev, products: [newProduct, ...prev.products] }));
  }, []);

  const removeProduct = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }, []);

  const updateProduct = useCallback((id: string, product: Partial<Product>) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
    }));
  }, []);

  const clearProducts = useCallback(() => {
    setState((prev) => ({ ...prev, products: [] }));
  }, []);

  const totalItems = state.products.reduce((sum, p) => sum + p.quantity, 0);
  const totalCost = state.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const remainingBudget = state.budget - totalCost;

  return (
    <ShoppingContext.Provider
      value={{
        state,
        setMarketName,
        setBudget,
        addProduct,
        removeProduct,
        updateProduct,
        clearProducts,
        totalItems,
        totalCost,
        remainingBudget,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping deve ser usado dentro de ShoppingProvider');
  }
  return context;
}
