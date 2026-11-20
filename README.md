# BeeTech — Aplicativo Mobile, API e Base de Dados

Este repositório reúne o código-fonte do **BeeTech**, projeto desenvolvido no âmbito acadêmico com foco na preservação das abelhas sem ferrão, na educação ambiental e na conexão entre meliponicultura urbana, sustentabilidade e tecnologia.

A proposta une o cuidado com a biodiversidade e a organização de um projeto de software de verdade: interface *mobile* construída com React Native e Expo Router, serviço de *backend* em Java/Maven e modelagem de dados relacional em MySQL (`beetech_db.sql`).

---

## Arquitetura e Organização do Projeto

* **Aplicativo Mobile (`app/`, `components/`, `hooks/`, `constants/`, `assets/`):** estrutura de navegação e telas desenvolvidas em React Native com Expo Router, voltadas à experiência do usuário, catálogo/conteúdo do projeto e fluxos da aplicação.
* **API / Backend (`api/`):** estrutura de serviços em Java/Maven para processamento de regras e requisições da aplicação.
* **Banco de Dados (`beetech_db.sql`):** *script* SQL com a estrutura de dados do sistema.

---

## Logística e Operação (Contexto do Projeto)

Conforme definido no escopo do projeto, o **BeeTech** não opera com frota própria de veículos. O preparo dos pedidos prioriza práticas de logística verde, e o transporte é feito por serviços terceirizados: **motoboy** para entregas locais e **Correios/Sedex** para envios regionais e nacionais.

---

## Como Obter e Rodar o Projeto a Partir do Git

Para baixar o código deste repositório e executar o aplicativo *mobile* localmente:

### 1. Clonar o repositório
```bash
git clone [https://github.com/melaineborgesctba-cmd/projeto-beetech-codigo.git](https://github.com/melaineborgesctba-cmd/projeto-beetech-codigo.git)
cd projeto-beetech-codigo
This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
