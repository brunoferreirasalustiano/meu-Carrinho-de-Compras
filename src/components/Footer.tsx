import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useShopping } from '../context/ShoppingContext';

export default function Footer() {
  const { totalItems, totalCost, remainingBudget, state, clearProducts } = useShopping();
  const isOverBudget = remainingBudget < 0 && state.budget > 0;

  const handleClear = () => {
    Alert.alert(
      "Limpar Lista",
      "Tem certeza que deseja remover todos os produtos?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Limpar", 
          onPress: clearProducts, 
          style: "destructive" 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Itens</Text>
          <Text style={styles.summaryValue}>{totalItems}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>R$ {totalCost.toFixed(2).replace('.', ',')}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Restante</Text>
          <Text style={[styles.summaryValue, isOverBudget ? styles.overBudget : styles.underBudget]}>
            R$ {remainingBudget.toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </View>

      <View style={styles.calculator}>
        <Text style={styles.calculatorTitle}>📟 Calculadora</Text>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Orçamento:</Text>
          <Text style={styles.calcValue}>R$ {state.budget.toFixed(2).replace('.', ',')}</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Total gasto:</Text>
          <Text style={[styles.calcValue, styles.negative]}>− R$ {totalCost.toFixed(2).replace('.', ',')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Saldo:</Text>
          <Text style={[styles.calcValue, isOverBudget ? styles.negative : styles.positive]}>
            R$ {remainingBudget.toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </View>

      {totalItems > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Limpar Lista</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  overBudget: {
    color: '#ef4444',
  },
  underBudget: {
    color: '#059669',
  },
  calculator: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  calculatorTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  calcLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  calcValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  positive: {
    color: '#059669',
  },
  negative: {
    color: '#ef4444',
  },
  clearButton: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#ef4444',
    fontWeight: '600',
    fontSize: 14,
  },
});
