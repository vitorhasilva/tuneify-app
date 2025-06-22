# Tuneify

Tuneify é uma aplicação móvel construída com [React Native](https://reactnative.dev/) e [Expo](https://expo.dev/) que permite ouvir rádios portuguesas.

## Funcionalidades

- Lista de estações de rádio pré-definidas.
- Pesquisa rápida de rádios pelo nome.
- Reprodução de stream de áudio diretamente na aplicação.
- Possibilidade de adicionar, editar ou remover rádios personalizadas (guardadas localmente).

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado usar a versão LTS)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) instalado globalmente (`npm install -g expo-cli`)

## Instalação e execução

1. Instale as dependências do projeto:

   ```bash
   yarn install
   # ou
   npm install
   ```

2. Inicie o projeto:

   ```bash
   expo start
   ```

   A aplicação poderá ser executada em um dispositivo físico com o aplicativo **Expo Go** ou em um emulador/simulador configurado.

## Estrutura do projeto

- `App.js` – Ponto de entrada da aplicação com configuração das rotas.
- `screens/` – Telas principais (lista de rádios, reprodutor e formulário de adição/edição).
- `context/` – Contexto de player de áudio utilizado para controlar a reprodução.
- `assets/` – Ícones e imagens usadas pelo Expo.

## Licença

Este projeto é disponibilizado sem uma licença específica. Sinta‑se livre para utilizar e modificar conforme necessário.

