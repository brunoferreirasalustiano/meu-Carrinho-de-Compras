import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ShoppingProvider } from './src/context/ShoppingContext';
import Header from './src/components/Header';
import AddProductForm from './src/components/AddProductForm';
import ProductList from './src/components/ProductList';
import Footer from './src/components/Footer';

function AppContent() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Topo fixo — não rola */}
      <Header />
      <AddProductForm />

      {/* Área do meio — só ela rola */}
      <View style={styles.listArea}>
        <ProductList />
      </View>

      {/* Footer fixo na base */}
      <Footer />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ShoppingProvider>
        <AppContent />
      </ShoppingProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    position: 'relative',
  },
  listArea: {
    flex: 1,
    overflow: 'hidden',
  },
});
