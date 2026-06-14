import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types';
import { useShopping } from '../context/ShoppingContext';
import { useTranslation } from '../i18n/useTranslation';
import { useCurrency } from '../utils/formatMoney';

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { t } = useTranslation();
  const { formatMoney, symbol } = useCurrency();
  const { updateProduct, removeProduct } = useShopping();
  const [priceText, setPriceText] = useState('');
  const subtotal = product.price * product.quantity;

  useEffect(() => {
    const formatted = product.price > 0
      ? product.price.toFixed(2).replace('.', ',')
      : '';
    setPriceText(formatted);
  }, [product.price]);

  const handlePriceChange = (text: string) => {
    // Permite apenas números, vírgula e ponto; no máximo um separador decimal
    let cleaned = text.replace(/[^0-9.,]/g, '');
    const firstDot = cleaned.indexOf('.');
    const firstComma = cleaned.indexOf(',');
    if (firstDot !== -1 && firstComma !== -1) {
      if (firstDot < firstComma) {
        cleaned = cleaned.replace(/,/g, '');
      } else {
        cleaned = cleaned.replace(/\./g, '');
      }
    }
    const sep = cleaned.includes('.') ? '.' : cleaned.includes(',') ? ',' : null;
    if (sep) {
      const parts = cleaned.split(sep);
      cleaned = parts[0] + sep + parts.slice(1).join('');
    }
    setPriceText(cleaned);
  };

  const handlePriceBlur = () => {
    const value = parseFloat(priceText.replace(',', '.'));
    updateProduct(product.id, { price: isNaN(value) || value < 0 ? 0 : value });
  };

  const handleDecrement = () => {
    const newQty = product.quantity - 1;
    if (newQty <= 0) {
      // Remove o produto quando a quantidade chegar a 0
      removeProduct(product.id);
    } else {
      updateProduct(product.id, { quantity: newQty });
    }
  };

  const handleIncrement = () => {
    updateProduct(product.id, { quantity: product.quantity + 1 });
  };

  return (
    <View style={styles.container}>
      {/* Linha 1: Nome + Botão excluir */}
      <View style={styles.row}>
        <View style={styles.nameContainer}>
          <Text style={styles.label}>{t('productLabel')}</Text>
          <TextInput
            style={styles.nameInput}
            value={product.name}
            onChangeText={(text) => updateProduct(product.id, { name: text })}
            placeholder={t('productNamePlaceholder')}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeProduct(product.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.deleteText}>{t('delete')}</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 2: Preço + Qtd + Subtotal */}
      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>{t('priceLabel')} ({symbol})</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={priceText}
            onChangeText={handlePriceChange}
            onBlur={handlePriceBlur}
            placeholder={`0,00`}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t('qtyLabel')}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                product.quantity === 1 && styles.quantityButtonDanger,
              ]}
              onPress={handleDecrement}
            >
              <Text
                style={[
                  styles.quantityButtonText,
                  product.quantity === 1 && styles.quantityButtonTextDanger,
                ]}
              >
                {product.quantity === 1 ? t('decrementDelete') : '−'}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              keyboardType="number-pad"
              value={product.quantity.toString()}
              onChangeText={(text) => {
                // Remove tudo que não é dígito
                const cleaned = text.replace(/[^0-9]/g, '');
                if (cleaned === '') return;
                const value = parseInt(cleaned, 10);
                if (!isNaN(value) && value > 0) {
                  updateProduct(product.id, { quantity: value });
                } else if (value === 0) {
                  // Remove o produto se o usuário digitar explicitamente 0
                  removeProduct(product.id);
                }
              }}
            />
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrement}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.subtotalContainer}>
          <Text style={styles.label}>{t('subtotalLabel')}</Text>
          <Text style={styles.subtotal}>{formatMoney(subtotal)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
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
    minWidth: 0,
  },
  label: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  nameInput: {
    minHeight: 36,
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  deleteButton: {
    marginLeft: 8,
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  field: {
    flex: 1,
    marginRight: 8,
    minWidth: 0,
  },
  input: {
    minHeight: 36,
    fontSize: 14,
    color: '#1f2937',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  quantityContainer: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 2,
  },
  quantityButton: {
    width: 26,
    height: 26,
    backgroundColor: '#f3f4f6',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonDanger: {
    backgroundColor: '#fee2e2',
  },
  quantityButtonText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  quantityButtonTextDanger: {
    fontSize: 11,
    color: '#ef4444',
  },
  quantityInput: {
    width: 36,
    textAlign: 'center',
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
    padding: 0,
  },
  subtotalContainer: {
    alignItems: 'flex-end',
    minWidth: 64,
    flexShrink: 0,
  },
  subtotal: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#059669',
  },
});
