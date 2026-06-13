import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types';
import { useShopping } from '../context/ShoppingContext';

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { updateProduct, removeProduct } = useShopping();
  const [priceText, setPriceText] = useState('');
  const subtotal = product.price * product.quantity;

  useEffect(() => {
    const formatted = product.price > 0 ? product.price.toFixed(2).replace('.', ',') : '';
    setPriceText(formatted);
  }, [product.price]);

  const handlePriceBlur = () => {
    const value = parseFloat(priceText.replace(',', '.'));
    updateProduct(product.id, { price: isNaN(value) ? 0 : value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.nameContainer}>
          <Text style={styles.label}>Produto</Text>
          <TextInput
            style={styles.nameInput}
            value={product.name}
            onChangeText={(text) => updateProduct(product.id, { name: text })}
            placeholder="Nome do produto"
          />
        </View>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeProduct(product.id)}
        >
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>Preço (R$)</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={priceText}
            onChangeText={setPriceText}
            onBlur={handlePriceBlur}
            placeholder="0,00"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Qtd</Text>
          <div style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                if (product.quantity > 1) {
                  updateProduct(product.id, { quantity: product.quantity - 1 });
                }
              }}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              keyboardType="number-pad"
              value={product.quantity.toString()}
              onChangeText={(text) => {
                const value = parseInt(text) || 0;
                updateProduct(product.id, { quantity: value });
              }}
            />
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateProduct(product.id, { quantity: product.quantity + 1 })}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </div>
        </View>

        <View style={styles.subtotalContainer}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.subtotal}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameContainer: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 2,
    fontWeight: '600',
  },
  nameInput: {
    fontSize: 16,
    color: '#1f2937',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 4,
  },
  deleteButton: {
    marginLeft: 8,
    padding: 4,
  },
  deleteText: {
    fontSize: 18,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  field: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    fontSize: 14,
    color: '#1f2937',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: '#f3f4f6',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  quantityInput: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#1f2937',
    padding: 0,
  },
  subtotalContainer: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
  },
});
