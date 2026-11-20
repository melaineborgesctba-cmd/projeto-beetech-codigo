import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 1. Tela Inicial de carregamento/redirecionamento */}
      <Stack.Screen name="index" />

      {/* 2. Tela de Login */}
      <Stack.Screen name="login" />

      {/* 3. Tela de Cadastro: com botão de voltar no topo */}
      <Stack.Screen 
        name="cadastro" 
        options={{ 
          headerShown: true,
          title: 'Criar Conta',
          headerTintColor: '#E5A000',
          headerBackTitle: 'Voltar',
          headerShadowVisible: false,
        }} 
      />

      {/* 4. Grupo de Abas Principais (Início, Loja, Perfil, etc.) */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}