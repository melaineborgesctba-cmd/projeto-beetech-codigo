import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  primary: '#E5A000',
  secondary: '#D97706',
  background: '#FFFFFF',
  cardBg: '#F9FAFB',
  textDark: '#1F2937',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
};

export default function IdentificadorScreen() {
  const [imagemUri, setImagemUri] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState(null);

  // Seleção de foto adaptada para Web e Celular
  const abrirSelecaoFoto = async () => {
    if (Platform.OS === 'web') {
      // No navegador do PC, abre direto a janela de arquivos/galeria
      await escolherDaGaleria();
    } else {
      // No aplicativo no celular, exibe o menu para escolher Câmera ou Galeria
      Alert.alert(
        'Capturar Foto',
        'Como deseja enviar a imagem do inseto?',
        [
          { text: '📷 Usar Câmera', onPress: tirarFoto },
          { text: '🖼️ Escolher da Galeria', onPress: escolherDaGaleria },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    }
  };

  // 1. Tirar foto com a Câmera
  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      alert('Precisamos de acesso à câmera para tirar a foto.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
      setResultado(null);
    }
  };

  // 2. Escolher foto da Galeria / Arquivos do PC
  const escolherDaGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
      setResultado(null);
    }
  };

  // Simular verificação de ASF
  const verificarAbelha = () => {
    if (!imagemUri) {
      if (Platform.OS === 'web') {
        alert('Capture ou selecione uma foto antes de verificar!');
      } else {
        Alert.alert('Atenção', 'Capture ou selecione uma foto antes de verificar!');
      }
      return;
    }

    setCarregando(true);

    setTimeout(() => {
      setCarregando(false);
      setResultado({
        eAbelha: true,
        especie: 'Jataí (Tetragonisca angustula)',
        confianca: '96.8%',
        descricao: 'Abelha sem ferrão mansa, muito comum em áreas urbanas e produtoras de mel clarinho e medicinal.',
      });
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Identificador de ASF 🐝</Text>
      <Text style={styles.subtitle}>
        Tire uma foto do inseto para verificar se é uma Abelha Sem Ferrão e descobrir a espécie.
      </Text>

      <View style={styles.imageBox}>
        {imagemUri ? (
          <Image source={{ uri: imagemUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <MaterialCommunityIcons name="camera-plus-outline" size={48} color={COLORS.textMuted} />
            <Text style={styles.placeholderText}>Nenhuma foto selecionada</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.btnCapture} onPress={abrirSelecaoFoto}>
        <Text style={styles.btnCaptureText}>
          {imagemUri ? '📷 Trocar Foto' : 'Captura de Foto'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btnVerify, !imagemUri && styles.btnDisabled]}
        onPress={verificarAbelha}
        disabled={carregando || !imagemUri}
      >
        {carregando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.btnVerifyText}>Verificar se é ASF</Text>
        )}
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <MaterialCommunityIcons name="check-decagram" size={24} color={COLORS.success} />
            <Text style={styles.resultTitle}>ASF Confirmada!</Text>
          </View>
          <Text style={styles.resultSpecies}>Espécie: {resultado.especie}</Text>
          <Text style={styles.resultBadge}>Precisão da IA: {resultado.confianca}</Text>
          <Text style={styles.resultDesc}>{resultado.descricao}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 40,
    alignItems: 'center',
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  imageBox: {
    width: '100%',
    height: 220,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    alignItems: 'center',
    gap: 8,
  },
  placeholderText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  btnCapture: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 12,
  },
  btnCaptureText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  btnVerify: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnVerifyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  resultCard: {
    width: '100%',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#065F46',
  },
  resultSpecies: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  resultBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  resultDesc: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },
});