import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

// Definição das Cores do Tema BeeHub
const COLORS = {
  active: '#D97706',   // Laranja/Âmbar (Cor de Mel) para o item selecionado
  inactive: '#9CA3AF', // Cinza para itens não selecionados
  border: '#FCD34D',   // Amarelo claro para a borda superior
  bg: '#FFFFFF',       // Fundo branco da barra
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          backgroundColor: COLORS.bg,
          borderTopWidth: 2,
          borderTopColor: COLORS.border,
          height: 65,          // Altura um pouco maior para acomodar os ícones e textos
          paddingBottom: 10,   // Espaçamento inferior para o texto
          paddingTop: 8,       // Espaçamento superior para o ícone
          elevation: 8,        // Sombra no Android
          shadowColor: '#000', // Sombra no iOS
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          marginTop: 2,        // Pequeno ajuste entre ícone e texto
        },
        headerShown: false,    // Remove o cabeçalho padrão do topo de cada tela
      }}
    >
      
      {/* 1. Tela Início (index.js) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? 'home-variant' : 'home-variant-outline'} 
              size={26} 
              color={color} 
            />
          ),
        }}
      />

      {/* 2. Tela Loja (loja.js) */}
      <Tabs.Screen
        name="loja"
        options={{
          title: 'Loja',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? 'storefront' : 'storefront-outline'} 
              size={26} 
              color={color} 
            />
          ),
        }}
      />

      {/* 3. Tela ID Abelha (identificar.js) */}
      <Tabs.Screen
        name="identificar"
        options={{
          title: 'ID Abelha',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? 'beehive-outline' : 'magnify'} 
              size={26} 
              color={color} 
            />
          ),
        }}
      />

      {/* 4. Tela Missões (missoes.js) */}
      <Tabs.Screen
        name="missoes"
        options={{
          title: 'Missões',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? 'star-circle' : 'star-circle-outline'} 
              size={26} 
              color={color} 
            />
          ),
        }}
      />

      {/* 5. Tela SOS (emergencia.js) */}
      <Tabs.Screen
        name="emergencia"
        options={{
          title: 'SOS',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? 'alert-octagon' : 'alert-octagon-outline'} 
              size={26} 
              color={color} 
            />
          ),
        }}
      />

      {/* 6. Tela Perfil (perfil.js) */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? 'account-circle' : 'account-circle-outline'} 
              size={26} 
              color={color} 
            />
          ),
        }}
      />

    </Tabs>
  );
}