import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useShopping } from '../context/ShoppingContext';

export default function Header() {
  const { state, setMarketName, setBudget } = useShopping();
  const [budgetText, setBudgetText] = useState('');

  // Sincroniza apenas quando o valor global muda externamente
  useEffect(() => {
    const formatted = state.budget > 0 ? state.budget.toFixed(2).replace('.', ',') : '';
    if (formatted !== budgetText && !isNaN(parseFloat(budgetText.replace(',', '.')))) {
       // Não atualiza se o usuário estiver digitando algo válido
    } else {
       setBudgetText(formatted);
    }
  }, [state.budget]);

  const handleBudgetBlur = () => {
    const value = parseFloat(budgetText.replace(',', '.'));
    const finalValue = isNaN(value) ? 0 : value;
    setBudget(finalValue);
    setBudgetText(finalValue > 0 ? finalValue.toFixed(2).replace('.', ',') : '');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Meu Carrinho</Text>
      
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Mercado</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Supermercado X"
            value={state.marketName}
            onChangeText={setMarketName}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Valor Disponível (R$)</Text>
          <TextInput
            style={styles.input}
            placeholder="0,00"
            keyboardType="decimal-pad"
            value={budgetText}
            onChangeText={setBudgetText}
            onBlur={handleBudgetBlur}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2563eb',
    padding: 16,
    paddingTop: 40,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  row: {
    marginBottom: 12,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    fontSize: 16,
    color: '#1f2937',
    padding: 0,
  },
});
