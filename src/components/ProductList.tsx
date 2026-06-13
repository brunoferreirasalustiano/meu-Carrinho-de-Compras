import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useShopping } from '../context/ShoppingContext';
import { useTranslation } from '../i18n/useTranslation';
import ProductItem from './ProductItem';

export default function ProductList() {
  const { t } = useTranslation();
  const { state } = useShopping();

  if (state.products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>{t('emptyCartTitle')}</Text>
        <Text style={styles.emptySubtitle}>
          {t('emptyCartSubtitle')}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {state.products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  list: {
    padding: 12,
    paddingBottom: 280, // espaço para o Footer não cobrir o último produto
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 20,
  },
});
