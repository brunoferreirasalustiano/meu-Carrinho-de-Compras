import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useShopping } from '../context/ShoppingContext';
import ProductItem from './ProductItem';

export default function ProductList() {
  const { state } = useShopping();

  return (
    <View style={styles.container}>
      <FlatList
        data={state.products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 12,
    paddingBottom: 80,
  },
});
