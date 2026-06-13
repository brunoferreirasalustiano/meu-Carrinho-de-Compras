import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useShopping } from '../context/ShoppingContext';
import { useTranslation } from '../i18n/useTranslation';
import { useCurrency } from '../utils/formatMoney';

export default function Footer() {
  const { t } = useTranslation();
  const { formatMoney } = useCurrency();
  const { totalItems, totalCost, remainingBudget, state, clearProducts } = useShopping();
  const isOverBudget = remainingBudget < 0 && state.budget > 0;
  const hasBudget = state.budget > 0;

  const handleClear = () => {
    Alert.alert(
      t('clearListTitle'),
      t('clearListMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('clear'),
          onPress: clearProducts,
          style: 'destructive',
        },
      ]
    );
  };

  if (totalItems === 0) return null;

  return (
    <View style={styles.container}>
      {/* Resumo rápido: Itens / Total / Restante */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>{t('items')}</Text>
          <Text style={styles.summaryValue}>{totalItems}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>{t('total')}</Text>
          <Text style={styles.summaryValue}>{formatMoney(totalCost)}</Text>
        </View>
        {hasBudget && (
          <>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{t('remaining')}</Text>
              <Text
                style={[
                  styles.summaryValue,
                  isOverBudget ? styles.overBudget : styles.underBudget,
                ]}
              >
                {formatMoney(remainingBudget)}
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Calculadora detalhada — exibe só se tiver orçamento definido */}
      {hasBudget && (
        <View style={styles.calculator}>
          <Text style={styles.calculatorTitle}>{t('calculatorTitle')}</Text>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>{t('budgetLabel')}</Text>
            <Text style={styles.calcValue}>{formatMoney(state.budget)}</Text>
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>{t('totalSpentLabel')}</Text>
            <Text style={[styles.calcValue, styles.negative]}>
              − {formatMoney(totalCost)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.calcRow}>
            <Text style={[styles.calcLabel, { fontWeight: '700' }]}>{t('balanceLabel')}</Text>
            <Text
              style={[
                styles.calcValue,
                { fontWeight: '700' },
                isOverBudget ? styles.negative : styles.positive,
              ]}
            >
              {formatMoney(remainingBudget)}
            </Text>
          </View>
          {isOverBudget && (
            <Text style={styles.overBudgetWarning}>
              {t('overBudgetWarning', { amount: formatMoney(Math.abs(remainingBudget)) })}
            </Text>
          )}
        </View>
      )}

      {/* Botão limpar lista */}
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>{t('clearList')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 10,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  summaryDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e5e7eb',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 1,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  summaryValue: {
    fontSize: 14,
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
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  calculatorTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
    textAlign: 'center',
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  calcLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  calcValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  positive: {
    color: '#059669',
  },
  negative: {
    color: '#ef4444',
  },
  overBudgetWarning: {
    marginTop: 4,
    fontSize: 11,
    color: '#ef4444',
    textAlign: 'center',
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#ef4444',
    fontWeight: '600',
    fontSize: 13,
  },
});
