# Tuneify

## 1. Visão Geral
Tuneify é uma aplicação móvel construída com [React Native](https://reactnative.dev/) e [Expo](https://expo.dev/) que permite ouvir rádios portuguesas.

## 2. Funcionalidades
- Lista de estações de rádio pré-definidas.
- Pesquisa rápida de rádios pelo nome.
- Reprodução de stream de áudio diretamente na aplicação.
- Possibilidade de adicionar, editar ou remover rádios personalizadas (guardadas localmente).
- Marcação de rádios favoritas para acesso rápido.
- Reprodução continua em segundo plano.
- Suporte a tema claro e escuro.
- Controle de volume e temporizador dentro do player.
- Comandos de reprodução a partir do fone de ouvido/centro de notificações.

## 5. Pré-requisitos
- [Node.js](https://nodejs.org/) (recomendado usar a versão LTS)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) instalado globalmente (`npm install -g expo-cli`)

## 6. Instalação
```bash
yarn install
# ou
npm install
```

## 7. Execução
```bash
expo start
```
A aplicação poderá ser executada em um dispositivo físico com o aplicativo **Expo Go** ou em um emulador/simulador configurado.

## 8. Estrutura do projeto
- `App.js` – Ponto de entrada da aplicação com configuração das rotas.
- `screens/` – Telas principais (lista de rádios, reprodutor e formulário de adição/edição).
- `context/` – Contexto de player de áudio utilizado para controlar a reprodução.
- `assets/` – Ícones e imagens usadas pelo Expo.

## Licença
Este projeto é disponibilizado sem uma licença específica. Sinta‑se livre para utilizar e modificar conforme necessário.
