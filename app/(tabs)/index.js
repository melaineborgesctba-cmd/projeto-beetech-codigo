import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
  bg: '#FDE047', 
  textBrown: '#78350F', 
  subtitle: '#92400E',
  cardLoja: ['#FBBF24', '#F97316'],
  cardIdentificar: ['#A78BFA', '#EC4899'],
  cardEmergencia: ['#FB7185', '#F43F5E'],
  cardMissoes: ['#34D399', '#10B981'],
};

const Card = ({ title, desc, colors, iconName, iconFamily, onPress }) => {
  const IconTag = iconFamily === 'MaterialIcons' ? MaterialIcons : MaterialCommunityIcons;
  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient colors={colors} style={styles.cardGradient} start={{x:0, y:0}} end={{x:1, y:1}}>
        <IconTag name={iconName} color="#FFF" size={28} />
        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDesc}>{desc}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const InfoBar = ({ emoji, text, bgColor, borderColor }) => (
  <View style={[styles.infoBar, { backgroundColor: bgColor, borderColor: borderColor }]}>
    <Text style={styles.infoEmoji}>{emoji}</Text>
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

export default function BeeTechHome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Padrão de fundo de colmeia */}
      <View style={styles.patternContainer}>
        {Array(20).fill('⬡').map((h, i) => (
          <Text key={i} style={styles.patternChar}>{h}</Text>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        
        <View style={styles.header}>
          <Text style={styles.beeEmoji}>🐝</Text>
          <Text style={styles.title}>BeeTech</Text>
          <Text style={styles.subtitle}>Sua comunidade de abelhas nativas 🌻</Text>
        </View>

        <View style={styles.grid}>
          <Card 
            title="Loja" desc="Caixas, mudas e sementes" colors={COLORS.cardLoja} 
            iconName="shopping-cart" iconFamily="MaterialIcons"
            onPress={() => router.push('/loja')}
          />
          <Card 
            title="Identificar" desc="Tire foto de um inseto" colors={COLORS.cardIdentificar} 
            iconName="photo-camera" iconFamily="MaterialIcons"
            onPress={() => router.push('/identificar')}
          />
          <Card 
            title="Emergência" desc="Pedir ajuda da comunidade" colors={COLORS.cardEmergencia} 
            iconName="alarm-light" iconFamily="MaterialCommunityIcons"
            onPress={() => router.push('/emergencia')}
          />
          <Card 
            title="Missões" desc="Complete tarefas e ganhe pontos" colors={COLORS.cardMissoes} 
            iconName="star" iconFamily="MaterialIcons"
            onPress={() => router.push('/missoes')}
          />
        </View>

        <View style={styles.promoBanner}>
          <Text style={styles.promoText}>🍯 Juntos protegemos as abelhas sem ferrão do Brasil!</Text>
          <TouchableOpacity style={styles.linkContainer} onPress={() => router.push('/loja')}>
            <Text style={styles.linkText}>Ver produtos em destaque</Text>
            <Feather name="chevron-right" size={16} color={COLORS.subtitle} />
          </TouchableOpacity>
        </View>

        <InfoBar 
          emoji="🌸" 
          text="Abelhas nativas não têm ferrão e são essenciais para a biodiversidade!" 
          bgColor="#DCFCE7" borderColor="#86EFAC" 
        />
        
        <InfoBar 
          emoji="🌳" 
          text="Plante flores e árvores nativas para atrair polinizadores naturais." 
          bgColor="#F3E8FF" borderColor="#D8B4FE" 
        />
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  patternContainer: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', flexWrap: 'wrap', opacity: 0.1, padding: 10 },
  patternChar: { fontSize: 40, color: COLORS.textBrown, margin: 5 },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 30 },
  beeEmoji: { fontSize: 70 },
  title: { fontSize: 36, fontWeight: '900', color: COLORS.textBrown },
  subtitle: { fontSize: 16, fontWeight: '700', color: COLORS.subtitle },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, justifyContent: 'space-between' },
  cardWrapper: { width: '48%', height: 130, marginBottom: 15 },
  cardGradient: { flex: 1, borderRadius: 25, padding: 15, justifyContent: 'space-between' },
  cardTitle: { color: '#FFF', fontSize: 18, fontWeight: '900' },
  cardDesc: { color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: '600' },
  promoBanner: { backgroundColor: '#FFFBEB', margin: 15, borderRadius: 25, padding: 15, borderWidth: 2, borderColor: '#FEF3C7', alignItems: 'center' },
  promoText: { color: COLORS.textBrown, fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
  linkContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  linkText: { color: '#B45309', fontWeight: '900', fontSize: 14, marginRight: 5 },
  infoBar: { flexDirection: 'row', marginHorizontal: 15, marginBottom: 10, padding: 12, borderRadius: 20, borderWidth: 1.5, alignItems: 'center' },
  infoEmoji: { fontSize: 24, marginRight: 10 },
  infoText: { flex: 1, color: '#166534', fontWeight: 'bold', fontSize: 13 },
});