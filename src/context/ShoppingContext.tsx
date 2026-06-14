import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { Product, ShoppingState } from '../types';

// AsyncStorage importado de forma segura (será null se o pacote não estiver instalado)
let AsyncStorage: any = null;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch {
  // Pacote não instalado — dados não serão persistidos
  console.warn('[ShoppingContext] AsyncStorage não encontrado. Execute: npx expo install @react-native-async-storage/async-storage');
}

const STORAGE_KEY = '@meu_carrinho:state';

const INITIAL_STATE: ShoppingState = {
  marketName: '',
  budget: 0,
  products: [],
};

interface ShoppingContextType {
  state: ShoppingState;
  isLoading: boolean;
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
  const [state, setState] = useState<ShoppingState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega o estado salvo ao iniciar o app
  useEffect(() => {
    const loadState = async () => {
      if (!AsyncStorage) {
        setIsLoading(false);
        return;
      }
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as ShoppingState;
          setState(parsed);
        }
      } catch (error) {
        console.warn('[ShoppingContext] Erro ao carregar estado:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadState();
  }, []);

  // Salva o estado sempre que mudar
  useEffect(() => {
    if (isLoading || !AsyncStorage) return;
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.warn('[ShoppingContext] Erro ao salvar estado:', error);
      }
    };
    saveState();
  }, [state, isLoading]);

  const setMarketName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, marketName: name }));
  }, []);

  const setBudget = useCallback((budget: number) => {
    setState((prev) => ({ ...prev, budget }));
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substring(2, 15) + Date.now().toString(36),
    };
    // Adiciona no topo da lista
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

  const totalItems = useMemo(() => state.products.reduce((sum, p) => sum + p.quantity, 0), [state.products]);
  const totalCost = useMemo(() => state.products.reduce((sum, p) => sum + p.price * p.quantity, 0), [state.products]);
  const remainingBudget = useMemo(() => state.budget - totalCost, [state.budget, totalCost]);

  return (
    <ShoppingContext.Provider
      value={{
        state,
        isLoading,
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
