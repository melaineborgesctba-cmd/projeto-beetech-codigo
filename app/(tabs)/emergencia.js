import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { base44 } from '../api/base44Client'; // Descomente quando configurar o client

export default function Emergencia() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Estado do Formulário Completo (baseado no "lixo" que prestava!)
  const [form, setForm] = useState({
    type: 'outro',
    description: '',
    address: 'Obtendo localização...',
    reporter_name: '',
    reporter_phone: ''
  });
  const [photo, setPhoto] = useState(null);

  const [emergencies, setEmergencies] = useState([
    { id: 1, title: 'Ataque de Formigas', status: 'aberto', location: 'Parque Barigui', time: '10min atrás' },
  ]);

  // Pegar localização automática ao abrir o modal
  useEffect(() => {
    if (showModal) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setForm(f => ({ ...f, address: 'Permissão de GPS negada' }));
          return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        setForm(f => ({ ...f, address: `Lat: ${loc.coords.latitude.toFixed(4)}, Lon: ${loc.coords.longitude.toFixed(4)}` }));
      })();
    }
  }, [showModal]);

  const tirarFoto = async () => {
    let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.7 });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const addEmergency = async () => {
    if (!form.description) return;
    setLoading(true);

    // Lógica de salvar (Simulada por enquanto, depois conectamos no base44)
    const newEmergency = {
      id: Date.now(),
      title: form.description,
      status: 'aberto',
      location: form.address,
      time: 'Agora',
      type: form.type
    };

    setEmergencies([newEmergency, ...emergencies]);
    setLoading(false);
    setShowModal(false);
    setPhoto(null);
    setForm({ type: 'outro', description: '', address: '', reporter_name: '', reporter_phone: '' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <LinearGradient colors={['#EF4444', '#F43F5E']} style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.headerTitle}>🚨 Central SOS</Text>
              <Text style={styles.headerSubtitle}>Ajuda para enxames em perigo</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
              <MaterialIcons name="add" size={30} color="#EF4444" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{emergencies.filter(e=>e.status==='aberto').length}</Text>
              <Text style={styles.statLabel}>Abertas</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{emergencies.filter(e=>e.status==='em_atendimento').length}</Text>
              <Text style={styles.statLabel}>Em Atend.</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.infoBox}>
            <MaterialIcons name="info" size={20} color="#9A3412" />
            <Text style={styles.infoText}>Relate ataques ou vandalismo imediatamente.</Text>
          </View>

          {/* Lista de Cards (Mantendo seu design) */}
          {emergencies.map(e => (
            <View key={e.id} style={[styles.card, { borderLeftColor: e.status === 'aberto' ? '#EF4444' : '#F59E0B' }]}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{e.title}</Text>
                <Text style={styles.cardLoc}><MaterialIcons name="place" size={12}/> {e.location} • {e.time}</Text>
              </View>
              <TouchableOpacity style={styles.helpButton}>
                <Text style={styles.helpButtonText}>Ajudar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal Turbinado */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🚨 Pedir Socorro</Text>
            
            <ScrollView>
              <TextInput 
                placeholder="Descrição da emergência..."
                style={styles.input}
                multiline
                value={form.description}
                onChangeText={(v) => setForm(f => ({...f, description: v}))}
              />

              <View style={styles.miniInputRow}>
                <MaterialIcons name="my-location" size={16} color="#EF4444" />
                <Text style={styles.locText}>{form.address}</Text>
              </View>

              {/* Botão de Foto */}
              <TouchableOpacity style={styles.photoBtn} onPress={tirarFoto}>
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.previewImage} />
                ) : (
                  <>
                    <MaterialIcons name="camera-alt" size={24} color="#6B7280" />
                    <Text style={styles.photoBtnText}>Tirar Foto do Local</Text>
                  </>
                )}
              </TouchableOpacity>

              <TextInput 
                placeholder="Seu Nome"
                style={styles.smallInput}
                value={form.reporter_name}
                onChangeText={(v) => setForm(f => ({...f, reporter_name: v}))}
              />
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowModal(false)}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.confirmBtn, loading && {opacity: 0.7}]} 
                onPress={addEmergency}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.confirmBtnText}>ENVIAR AGORA</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Adicionei apenas os estilos novos, mantendo os seus originais embaixo
const styles = StyleSheet.create({
  // ... SEUS ESTILOS ORIGINAIS FICAM AQUI ...
  container: { flex: 1, backgroundColor: '#FFF5F5' },
  header: { padding: 25, paddingTop: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: 'white' },
  headerSubtitle: { color: 'rgba(255,255,255,0.8)', fontWeight: 'bold' },
  addButton: { backgroundColor: 'white', padding: 10, borderRadius: 20, elevation: 5 },
  statsGrid: { flexDirection: 'row', gap: 10, marginTop: 25 },
  statBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 20, alignItems: 'center' },
  statNumber: { color: 'white', fontSize: 22, fontWeight: '900' },
  statLabel: { color: 'white', fontSize: 10, fontWeight: 'bold', opacity: 0.8 },
  content: { padding: 20 },
  infoBox: { backgroundColor: '#FFEDD5', padding: 15, borderRadius: 20, borderLeftWidth: 5, borderLeftColor: '#F97316', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 20 },
  infoText: { flex: 1, color: '#9A3412', fontSize: 12, fontWeight: 'bold' },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderLeftWidth: 6, elevation: 2 },
  cardInfo: { flex: 1 },
  cardTitle: { fontWeight: 'bold', color: '#1F2937', fontSize: 14 },
  cardLoc: { color: '#6B7280', fontSize: 11, marginTop: 4 },
  helpButton: { backgroundColor: '#EF4444', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
  helpButtonText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', borderRadius: 30, padding: 25, maxHeight: '80%' },
  modalTitle: { fontSize: 20, fontWeight: '900', color: '#EF4444', marginBottom: 15, textAlign: 'center' },
  input: { backgroundColor: '#F3F4F6', borderRadius: 15, padding: 15, height: 80, textAlignVertical: 'top', marginBottom: 10 },
  smallInput: { backgroundColor: '#F3F4F6', borderRadius: 12, padding: 12, marginBottom: 10, fontWeight: 'bold' },
  miniInputRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 15, paddingHorizontal: 5 },
  locText: { color: '#6B7280', fontSize: 12, fontWeight: 'bold' },
  photoBtn: { height: 100, borderWeight: 2, borderStyle: 'dashed', borderColor: '#FECACA', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 15, backgroundColor: '#FEF2F2' },
  photoBtnText: { color: '#9CA3AF', fontSize: 12, fontWeight: 'bold', marginTop: 5 },
  previewImage: { width: '100%', height: '100%', borderRadius: 20 },
  modalButtons: { flexDirection: 'row', gap: 10, marginTop: 10 },
  cancelBtn: { flex: 1, padding: 15, alignItems: 'center' },
  cancelBtnText: { color: '#6B7280', fontWeight: 'bold' },
  confirmBtn: { flex: 2, backgroundColor: '#EF4444', padding: 15, borderRadius: 15, alignItems: 'center' },
  confirmBtnText: { color: 'white', fontWeight: '900' }
});