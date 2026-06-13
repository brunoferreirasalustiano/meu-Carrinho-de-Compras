# 🛒 Meu Carrinho de Compras

Aplicativo de lista de compras de mercado feito com **React Native** e **TypeScript**.

## ✨ Funcionalidades

- ✅ Adicionar produtos com nome, preço e quantidade
- ✅ Definir nome do mercado e orçamento disponível
- ✅ Aumentar/diminuir quantidade diretamente no item
- ✅ Calculadora automática mostrando:
  - Total de itens no carrinho
  - Total gasto
  - Orçamento restante (com alerta em vermelho se ultrapassar)
- ✅ Subtotal por produto
- ✅ Limpar lista de compras

## 📁 Estrutura de Arquivos

```
meu carrinho de compras/
├── App.tsx                           # Componente principal
├── package.json                      # Dependências
├── tsconfig.json                     # Configuração TypeScript
└── src/
    ├── types.ts                      # Interfaces TypeScript
    ├── context/
    │   └── ShoppingContext.tsx       # Estado global (Context API)
    └── components/
        ├── Header.tsx                # Nome do mercado + orçamento
        ├── ProductItem.tsx           # Item de produto individual
        ├── ProductList.tsx           # Lista de produtos
        └── Footer.tsx                # Resumo + calculadora
```

## 🚀 Como Executar

### 1. Instalar dependências
```bash
npm install
# ou
yarn install
```

### 2. Iniciar o app
```bash
npx expo start
```

Escaneie o QR code com o app **Expo Go** no seu celular ou pressione:
- `a` para abrir no emulador Android
- `i` para abrir no simulador iOS

## 📝 Tecnologias

- React Native 0.72.6
- TypeScript 5.1
- Expo SDK 49
- Context API (estado global)
- React Native Safe Area Context
