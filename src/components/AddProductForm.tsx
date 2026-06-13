import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useShopping } from '../context/ShoppingContext';
import { useTranslation } from '../i18n/useTranslation';
import { useCurrency } from '../utils/formatMoney';
import { commonProducts } from '../data/commonProducts';

export default function AddProductForm() {
  const { t } = useTranslation();
  const { symbol } = useCurrency();
  const { addProduct } = useShopping();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [priceError, setPriceError] = useState(false);

  const handleAdd = () => {
    if (!name.trim()) return;

    const priceValue = parseFloat(price.replace(',', '.'));
    const qtyValue = parseInt(quantity, 10) || 1;

    // Alerta visual se preço for 0 ou vazio
    if (!price.trim() || isNaN(priceValue) || priceValue <= 0) {
      setPriceError(true);
      setTimeout(() => setPriceError(false), 2000);
      // Adiciona mesmo assim com preço 0, mas avisa o usuário visualmente
    }

    addProduct({
      name: name.trim(),
      price: isNaN(priceValue) || priceValue < 0 ? 0 : priceValue,
      quantity: qtyValue,
    });

    setName('');
    setPrice('');
    setQuantity('1');
    setSuggestions([]);
    setPriceError(false);
  };

  const handleNameChange = (text: string) => {
    setName(text);

    if (text.trim().length >= 2) {
      const filtered = commonProducts
        .filter((item) =>
          item.toLowerCase().includes(text.toLowerCase()) &&
          item.toLowerCase() !== text.toLowerCase()
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setName(suggestion);
    setSuggestions([]);
  };

  return (
    <View style={styles.addForm}>
      <Text style={styles.addTitle}>{t('addProduct')}</Text>

      <View style={[styles.addRow, styles.suggestionRow]}>
        <View style={styles.nameInputContainer}>
          <TextInput
            style={[styles.addInput, styles.addNameInput]}
            placeholder={t('productNamePlaceholder')}
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={handleNameChange}
            onBlur={() => {
              setTimeout(() => setSuggestions([]), 200);
            }}
          />

          {suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((item, index) => (
                <TouchableOpacity
                  key={`${item}-${index}`}
                  style={[
                    styles.suggestionItem,
                    index === suggestions.length - 1 && styles.suggestionItemLast,
                  ]}
                  onPress={() => handleSelectSuggestion(item)}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.addRow}>
        <TextInput
          style={[
            styles.addInput,
            styles.addPriceInput,
            priceError && styles.addInputError,
          ]}
          placeholder={priceError ? `${t('priceErrorPlaceholder')} (${symbol})` : `${t('pricePlaceholder')} (${symbol})`}
          placeholderTextColor={priceError ? '#ef4444' : '#9ca3af'}
          keyboardType="decimal-pad"
          value={price}
          onChangeText={(text) => {
            setPrice(text);
            if (priceError) setPriceError(false);
          }}
        />
        <TextInput
          style={[styles.addInput, styles.addQtyInput]}
          placeholder={t('qtyPlaceholder')}
          placeholderTextColor="#9ca3af"
          keyboardType="number-pad"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>{t('addButton')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addForm: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  addTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionRow: {
    zIndex: 10,
  },
  nameInputContainer: {
    flex: 1,
    position: 'relative',
  },
  addInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
    fontSize: 16,
    color: '#1f2937',
  },
  addInputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fff5f5',
  },
  addNameInput: {
    flex: 1,
    width: '100%',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 999,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  suggestionItemLast: {
    borderBottomWidth: 0,
  },
  suggestionText: {
    fontSize: 15,
    color: '#1f2937',
  },
  addPriceInput: {
    flex: 1,
    marginRight: 8,
    minWidth: 0,
    flexShrink: 1,
  },
  addQtyInput: {
    width: 48,
    marginRight: 8,
    textAlign: 'center',
    flexShrink: 0,
  },
  addButton: {
    backgroundColor: '#2563eb',
    minHeight: 44,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
