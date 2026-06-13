import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useShopping } from '../context/ShoppingContext';
import { commonProducts } from '../data/commonProducts';

export default function AddProductForm() {
  const { addProduct } = useShopping();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleAdd = () => {
    if (!name.trim()) return;
    const priceValue = parseFloat(price.replace(',', '.'));
    const qtyValue = parseInt(quantity) || 1;
    addProduct({
      name: name.trim(),
      price: isNaN(priceValue) ? 0 : priceValue,
      quantity: qtyValue,
    });
    setName('');
    setPrice('');
    setQuantity('1');
    setSuggestions([]);
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
      <Text style={styles.addTitle}>➕ Adicionar Produto</Text>
      <View style={[styles.addRow, { zIndex: 10 }]}>
        <View style={styles.nameInputContainer}>
          <TextInput
            style={[styles.addInput, styles.addNameInput]}
            placeholder="Nome do produto"
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
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => handleSelectSuggestion(item)}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </div>
      </View>
      <View style={[styles.addRow, { zIndex: 1 }]}>
        <TextInput
          style={[styles.addInput, styles.addPriceInput]}
          placeholder="Preço (R$)"
          keyboardType="decimal-pad"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={[styles.addInput, styles.addQtyInput]}
          placeholder="Qtd"
          keyboardType="number-pad"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Adicionar</Text>
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
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  addTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameInputContainer: {
    flex: 1,
    position: 'relative',
  },
  addInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    color: '#1f2937',
  },
  addNameInput: {
    flex: 1,
    marginBottom: 8,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 40,
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
  suggestionText: {
    fontSize: 14,
    color: '#1f2937',
  },
  addPriceInput: {
    flex: 1,
    marginRight: 8,
  },
  addQtyInput: {
    width: 50,
    marginRight: 8,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
