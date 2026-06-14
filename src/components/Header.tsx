import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useShopping } from '../context/ShoppingContext';
import { useTranslation } from '../i18n/useTranslation';

export default function Header() {
  const { t } = useTranslation();
  const { state, setMarketName, setBudget } = useShopping();
  const [budgetText, setBudgetText] = useState('');

  // Sincroniza o texto quando o budget muda externamente (ex: limpar lista)
  useEffect(() => {
    const formatted = state.budget > 0
      ? state.budget.toFixed(2).replace('.', ',')
      : '';
    setBudgetText(formatted);
  }, [state.budget]);

  const handleBudgetChange = (text: string) => {
    // Permite apenas números, vírgula e ponto; no máximo um separador decimal
    let cleaned = text.replace(/[^0-9.,]/g, '');
    const firstDot = cleaned.indexOf('.');
    const firstComma = cleaned.indexOf(',');
    if (firstDot !== -1 && firstComma !== -1) {
      // Mantém o que vier primeiro como separador, remove o outro
      if (firstDot < firstComma) {
        cleaned = cleaned.replace(/,/g, '');
      } else {
        cleaned = cleaned.replace(/\./g, '');
      }
    }
    // Remove separadores extras do mesmo tipo
    const sep = cleaned.includes('.') ? '.' : cleaned.includes(',') ? ',' : null;
    if (sep) {
      const parts = cleaned.split(sep);
      cleaned = parts[0] + sep + parts.slice(1).join('');
    }
    setBudgetText(cleaned);
  };

  const handleBudgetBlur = () => {
    const value = parseFloat(budgetText.replace(',', '.'));
    const finalValue = isNaN(value) || value < 0 ? 0 : value;
    setBudget(finalValue);
    setBudgetText(finalValue > 0 ? finalValue.toFixed(2).replace('.', ',') : '');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('appTitle')}</Text>

      <View style={styles.row}>
  <View style={[styles.inputContainer, { marginRight: 8 }]}>
  <Text style={styles.label}>{t('market')}</Text>
  <TextInput
    style={styles.input}
    value={state.marketName}
    onChangeText={setMarketName}
    placeholder={t('marketPlaceholder')}
    placeholderTextColor="#9ca3af"
  />
</View>

  <View style={styles.inputContainer}>
  <Text style={styles.label}>{t('budget')}</Text>
  <TextInput
    style={styles.input}
    keyboardType="decimal-pad"
    value={budgetText}
    onChangeText={handleBudgetChange}
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
  padding: 12,
  paddingTop: 20,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
},

title: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
  marginBottom: 10,
},

row: {
  flexDirection: 'row',
  marginBottom: 8,
},

inputContainer: {
  flex: 1,
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 6,
  paddingHorizontal: 10,
},

label: {
  fontSize: 11,
  color: '#6b7280',
  marginBottom: 2,
  fontWeight: '600',
},

input: {
  fontSize: 16,
  color: '#1f2937',
  padding: 0,
},
});
