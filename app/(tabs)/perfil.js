import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PerfilScreen() {
  const router = useRouter();

    const [nomeCompleto, setNomeCompleto] = useState('Melaine Borges');
  const [apelido, setApelido] = useState('melaine');
  const [telefone, setTelefone] = useState('(41) 99999-9999');
  const [endereco, setEndereco] = useState('Curitiba - PR');
  const [fotoPerfil, setFotoPerfil] = useState('https://via.placeholder.com/120');

  const handleSalvar = () => {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  const handleLogout = () => {
    // Redireciona o usuário de volta para a tela de Login
    router.replace('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Meu Perfil 🐝</Text>

      {/* Foto de Perfil */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: fotoPerfil }} style={styles.avatar} />
        <TouchableOpacity style={styles.changePhotoButton} onPress={() => Alert.alert('Em breve', 'Integração com câmera/galeria.')}>
          <Text style={styles.changePhotoText}>Alterar Foto</Text>
        </TouchableOpacity>
      </View>

      {/* Formulário de Edição */}
      <Text style={styles.label}>Apelido (Login)</Text>
      <TextInput 
        style={[styles.input, styles.disabledInput]} 
        value={apelido} 
        editable={false} 
      />

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput 
        style={styles.input} 
        value={nomeCompleto} 
        onChangeText={setNomeCompleto} 
        placeholder="Seu nome completo"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput 
        style={styles.input} 
        value={telefone} 
        onChangeText={setTelefone} 
        keyboardType="phone-pad"
        placeholder="(00) 00000-0000"
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput 
        style={styles.input} 
        value={endereco} 
        onChangeText={setEndereco} 
        placeholder="Rua, Número, Bairro, Cidade"
      />

      {/* Botões de Ação */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E5A000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#EEE',
    borderWidth: 3,
    borderColor: '#E5A000'
  },
  changePhotoButton: {
    marginTop: 8
  },
  changePhotoText: {
    color: '#E5A000',
    fontWeight: 'bold',
    fontSize: 14
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#FAFAFA'
  },
  disabledInput: {
    backgroundColor: '#EFEFEF',
    color: '#888'
  },
  saveButton: {
    backgroundColor: '#E5A000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  logoutButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D32F2F',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24
  },
  logoutButtonText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 16
  }
});