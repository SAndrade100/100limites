import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#87084E", // rosa magenta principal
        },
        headerTintColor: "#FFF", // texto branco
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerShadowVisible: false, // remove sombra
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Home não mostra header (tem Header próprio)
        }}
      />
      <Stack.Screen
        name="treinos"
        options={{
          title: "Meus Treinos",
        }}
      />
      <Stack.Screen
        name="planos"
        options={{
          title: "Planos de Treino",
        }}
      />
      <Stack.Screen
        name="planos/[id]"
        options={{
          title: "Detalhes do Treino",
        }}
      />
      <Stack.Screen
        name="historico"
        options={{
          title: "Histórico",
        }}
      />
      <Stack.Screen
        name="perfil"
        options={{
          title: "Perfil",
        }}
      />
      <Stack.Screen
        name="treino-ativo/[id]"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
      />
    </Stack>
  );
}
