# 🛒 Meu Carrinho de Compras

Aplicativo de lista de compras para mercado, desenvolvido com **React Native** e **TypeScript**. Organize suas compras com facilidade, controle seu orçamento e nunca mais se esqueça de nada no mercado.

---

## ✨ Funcionalidades

| Recurso | Descrição |
|---------|-----------|
| 📝 Lista de compras | Adicione produtos com nome, preço e quantidade |
| 💰 Orçamento | Defina um orçamento total e acompanhe o gasto |
| 🏪 Mercado | Salve o nome do mercado para cada lista |
| 🧮 Calculadora | Total gasto, saldo restante e alerta de orçamento ultrapassado |
| 📊 Autocomplete | Sugestões de produtos comuns enquanto você digita |
| 💾 Persistência | Dados salvos localmente no celular (sem internet) |
| 🌍 Idiomas | Suporte a Português, Inglês e Espanhol |
| 🔄 Quantidade | Aumente, diminua ou remova itens diretamente na lista |

---

## 📁 Estrutura do Projeto

```
meu-carrinho-de-compras/
├── App.tsx                      # Componente principal
├── app.json                     # Configuração Expo (splash, ícone, pacote)
├── eas.json                     # Configuração EAS Build
├── package.json                 # Dependências
├── tsconfig.json                # Configuração TypeScript
├── assets/
│   ├── icon.png                 # Ícone do app
│   └── splash.png               # Tela de splash
└── src/
    ├── types.ts                 # Interfaces TypeScript
    ├── components/
    │   ├── Header.tsx           # Nome do mercado + orçamento
    │   ├── AddProductForm.tsx   # Formulário para adicionar produtos
    │   ├── ProductList.tsx      # Lista de produtos (scroll)
    │   ├── ProductItem.tsx      # Item de produto individual
    │   └── Footer.tsx           # Resumo + calculadora + limpar lista
    ├── context/
    │   └── ShoppingContext.tsx  # Estado global (Context API + AsyncStorage)
    ├── i18n/
    │   ├── translations.ts      # Traduções (PT, EN, ES)
    │   └── useTranslation.ts    # Hook de internacionalização
    ├── utils/
    │   └── formatMoney.ts       # Formatação de moeda por idioma
    └── data/
        └── commonProducts.ts    # Lista de produtos para autocomplete
```

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [Expo Go](https://expo.dev/go) no seu celular Android ou iOS

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o app

```bash
npx expo start
```

Escaneie o QR code com o **Expo Go** ou pressione:
- `a` — abrir emulador Android
- `i` — abrir simulador iOS

---

## 🛠️ Desenvolvimento

### Scripts disponíveis

```bash
npm run start     # Inicia o servidor de desenvolvimento
npm run android   # Inicia no emulador Android
npm run ios       # Inicia no simulador iOS
npm run web       # Inicia no navegador
```

### Build para produção

```bash
# Gerar APK (teste interno)
eas build --profile preview --platform android

# Gerar AAB (Google Play Store)
eas build --profile production --platform android

# Enviar para Google Play (requer configuração de Service Account)
eas submit --platform android
```

---

## 📝 Tecnologias

- **React Native** 0.72.6
- **TypeScript** 5.1
- **Expo SDK** 49
- **Context API** (estado global)
- **AsyncStorage** (persistência local)
- **React Native Safe Area Context**
- **EAS CLI** (builds e publicação)

---

## 📄 Licença

MIT © 2024

---

## 📧 Contato

Para sugestões, dúvidas ou reportar bugs, entre em contato pelo Google Play.
