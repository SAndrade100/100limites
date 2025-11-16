# 100limites

Aplicativo mobile de treino e acompanhamento fitness, criado com Expo + React Native + TypeScript.

Este repositório contém uma versão protótipo do app "100limites" com telas principais, navegação via `expo-router`, componentes reutilizáveis e um tema em tons de rosa para a interface.

## Principais funcionalidades

- Tela Home com acesso rápido (Treinos, Planos, Histórico, Perfil)
- Lista de treinos e execução de treino ativo com checklist e progresso
- Tela de Planos (ABC split) com detalhe de exercícios e botão "Iniciar Treino"
- Histórico com calendário mensal e indicadores de consistência
- Perfil do usuário com estatísticas e opções de menu
- Modais customizados com tema da aplicação

## Stack técnico

- Expo (SDK) + Expo Router (file-based routing)
- React 19 / React Native 0.81.x
- TypeScript (strict)
- react-native-safe-area-context
- @expo/vector-icons
- EAS Build (para builds Android / iOS)

## Estrutura do projeto (resumo)

- `app/` - telas e rotas (index.tsx, treinos.tsx, planos.tsx, historico.tsx, perfil.tsx, treino-ativo/*)
- `components/` - componentes reutilizáveis (Header, QuickAccess, PlanCard, WorkoutCard, CustomModal)
- `assets/` - imagens e ícones
- `constants/`, `hooks/`, `scripts/` - utilitários e configurações auxiliares
- `eas.json` - configuração de build EAS
- `app.json` - configuração Expo (bundleIdentifier, package, plugins)

## Como rodar em desenvolvimento (Linux/macOS/Windows)

1. Instale dependências:

```bash
npm install
# ou
pnpm install
```

2. Inicie Metro / Expo:

```bash
npx expo start
```

Abra o app no Expo Go (Android) escaneando o QR code. No iOS o Expo Go também funciona, mas depende do fluxo de bibliotecas nativas usadas no projeto.

## Gerar APK Android (EAS Build, via nuvem) — recomendado no Linux

1. Instale/Autentique no EAS (caso ainda não tenha):

```bash
npx eas login
```

2. Inicie build para Android (perfil `preview` já configurado para gerar APK):

```bash
npx eas build --platform android --profile preview
```

Ao final do processo o EAS retornará um link para baixar o APK gerado.

Observações:
- O build roda na nuvem, não é necessário Android Studio localmente.
- O perfil `preview` em `eas.json` está configurado para `android.buildType: "apk"` para facilitar sideload.

## iOS — notas importantes

- iOS usa arquivos `.ipa` (não APK). Para gerar builds iOS na nuvem com EAS é possível rodar o mesmo comando no Linux:

```bash
npx eas build --platform ios --profile preview
```

- Entretanto, para instalar em dispositivos físicos ou enviar para TestFlight/App Store, é necessário **Apple Developer Account** (US$99/ano). O EAS auxilia na criação de certificados e provisioning profiles.
- Para testar de graça localmente, use o **simulador do Xcode** (requer macOS) com o profile `development`.

## Scripts úteis

- `npx expo start` — iniciar servidor de desenvolvimento
- `npx eas build --platform android --profile preview` — gerar APK Android
- `npx eas build --platform ios --profile development` — gerar build iOS para simulador (macOS)

## Dados e persistência

O projeto atualmente usa dados mockados para treinos, planos e histórico. Próximos passos sugeridos incluem persistência local (AsyncStorage) e sincronização com backend.

## Contribuição

1. Fork e clone o repositório
2. Crie uma branch para a feature/bugfix
3. Abra PR com descrição clara das mudanças

## Licença

README e código estão sob a licença do repositório (verifique LICENSE se presente).

---

Se quiser, eu adapto o README para incluir capturas de tela, comandos extras (pnpm/yarn), ou instruções detalhadas para CI/CD (GitHub Actions) para builds automáticos. Quer que eu acrescente screenshots e os comandos exatos que você usa localmente (por exemplo `pnpm` em vez de `npm`)?
# Welcome to your Expo app 👋

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
