import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!apelido || !senha) {
      Alert.alert('Atenção', 'Informe seu apelido e senha.');
      return;
    }

    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BeeTech 🐝</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Apelido / Login" 
        value={apelido} 
        onChangeText={setApelido} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry 
        value={senha} 
        onChangeText={setSenha} 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/cadastro')} style={{ marginTop: 15, padding: 10 }}>
  <Text style={{ textAlign: 'center', color: '#666' }}>
    Não tem conta? <Text style={{ color: '#D97706', fontWeight: 'bold' }}>Cadastre-se</Text>
  </Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#FFF' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#E5A000', textAlign: 'center', marginBottom: 32 },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, marginBottom: 16 },
  button: { backgroundColor: '#E5A000', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#666', textAlign: 'center', marginTop: 16 }
});