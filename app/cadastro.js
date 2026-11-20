import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function CadastroScreen() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const router = useRouter();

  const handleCadastro = () => {
    if (!nomeCompleto || !apelido || !senha || !confirmarSenha) {
      if (Platform.OS === 'web') alert('Atenção: Preencha todos os campos obrigatórios.');
      else Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (senha !== confirmarSenha) {
      if (Platform.OS === 'web') alert('Erro: As senhas não coincidem.');
      else Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Sucesso e Redirecionamento
    if (Platform.OS === 'web') {
      alert('Cadastro realizado com sucesso! Faça seu login.');
      router.replace('/login');
    } else {
      Alert.alert(
        'Sucesso!',
        'Cadastro realizado com sucesso. Faça seu login.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta 🐝</Text>
      <Text style={styles.subtitle}>Junte-se à comunidade BeeTech</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Nome Completo" 
        value={nomeCompleto} 
        onChangeText={setNomeCompleto} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Apelido / Login" 
        value={apelido} 
        onChangeText={setApelido} 
        autoCapitalize="none"
      />

      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry 
        value={senha} 
        onChangeText={setSenha} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Confirmar Senha" 
        secureTextEntry 
        value={confirmarSenha} 
        onChangeText={setConfirmarSenha} 
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Já tem uma conta? Voltar ao Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 24, 
    backgroundColor: '#FFF' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#E5A000', 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#666', 
    textAlign: 'center', 
    marginBottom: 32 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#DDD', 
    padding: 14, 
    borderRadius: 8, 
    marginBottom: 16,
    fontSize: 16
  },
  button: { 
    backgroundColor: '#E5A000', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  linkText: { 
    color: '#666', 
    textAlign: 'center', 
    marginTop: 20 
  }
});