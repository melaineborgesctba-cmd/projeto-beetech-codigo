import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DEFAULT_TASKS = [
  { task_key: 'plant_flower', title: 'Plante uma flor hoje 🌸', description: 'Atraia abelhas para o seu jardim', target: 5, points_reward: 20, icon: '🌸', category: 'plantas' },
  { task_key: 'photograph_bee', title: 'Fotografe uma abelha 📸', description: 'Use o identificador para registrar espécies', target: 5, points_reward: 15, icon: '📸', category: 'abelhas' },
  { task_key: 'share_knowledge', title: 'Compartilhe Sabedoria 📢', description: 'Ensine alguém sobre abelhas nativas', target: 3, points_reward: 30, icon: '📢', category: 'comunidade' },
  { task_key: 'help_emergency', title: 'Ajude em uma Emergência 🚨', description: 'Responda a um pedido de socorro', target: 1, points_reward: 100, icon: '🚨', category: 'comunidade' },
];

const LEVEL_CONFIG = {
  'Aprendiz': { color: ['#FDE68A', '#F59E0B'], min: 0 },
  'Apicultor': { color: ['#FDBA74', '#F97316'], min: 100 },
  'Mestre das Abelhas': { color: ['#C084FC', '#9333EA'], min: 300 },
  'Guardião da Colmeia': { color: ['#34D399', '#059669'], min: 700 },
};

export default function Missoes() {
  const [points, setPoints] = useState(0);
  const [userTasks, setUserTasks] = useState({});

  // Lógica para definir o nível baseado nos pontos
  const getLevel = () => {
    if (points >= 700) return 'Guardião da Colmeia';
    if (points >= 300) return 'Mestre das Abelhas';
    if (points >= 100) return 'Apicultor';
    return 'Aprendiz';
  };

  const currentLevel = getLevel();
  const config = LEVEL_CONFIG[currentLevel];

  const handleIncrement = (task) => {
    const currentProgress = userTasks[task.task_key] || 0;
    
    if (currentProgress < task.target) {
      const newProgress = currentProgress + 1;
      setUserTasks({ ...userTasks, [task.task_key]: newProgress });
      
      // Se acabou de completar a missão, ganha pontos
      if (newProgress === task.target) {
        setPoints(points + task.points_reward);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header com Status de Nível */}
        <LinearGradient colors={config.color} style={styles.header}>
          <Text style={styles.headerTitle}>⭐ Missões BeeHub</Text>
          <Text style={styles.headerSubtitle}>Complete tarefas e suba de nível!</Text>

          <View style={styles.levelCard}>
            <View style={styles.levelRow}>
              <View>
                <Text style={styles.levelLabel}>Seu nível</Text>
                <Text style={styles.levelName}>{currentLevel}</Text>
              </View>
              <Text style={styles.pointsDisplay}>{points} ⭐</Text>
            </View>
            
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${Math.min((points / 1000) * 100, 100)}%` }]} />
            </View>
            <Text style={styles.progressText}>Rumo ao próximo nível!</Text>
          </View>
        </LinearGradient>

        {/* Lista de Missões */}
        <View style={styles.listContainer}>
          {DEFAULT_TASKS.map((task) => {
            const progress = userTasks[task.task_key] || 0;
            const isCompleted = progress >= task.target;
            const progressPercent = (progress / task.target) * 100;

            return (
              <View key={task.task_key} style={[styles.taskCard, isCompleted && styles.taskCardCompleted]}>
                <Text style={styles.taskIcon}>{task.icon}</Text>
                <View style={styles.taskInfo}>
                  <Text style={[styles.taskTitle, isCompleted && styles.textCompleted]}>{task.title}</Text>
                  <Text style={styles.taskDesc}>{task.description}</Text>
                  
                  <View style={styles.taskProgressRow}>
                    <View style={styles.taskBarBg}>
                      <View style={[styles.taskBarFill, { width: `${progressPercent}%`, backgroundColor: isCompleted ? '#4ADE80' : '#FBBF24' }]} />
                    </View>
                    <Text style={styles.taskCounter}>{progress}/{task.target}</Text>
                  </View>

                  <View style={styles.taskFooter}>
                    <Text style={styles.pointsReward}>+{task.points_reward} pts</Text>
                    {isCompleted ? (
                      <View style={styles.badgeCompleted}>
                        <MaterialIcons name="check-circle" size={16} color="#059669" />
                        <Text style={styles.badgeText}>Concluída</Text>
                      </View>
                    ) : (
                      <TouchableOpacity style={styles.regButton} onPress={() => handleIncrement(task)}>
                        <Text style={styles.regButtonText}>Registrar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECFDF5' },
  header: { padding: 25, paddingTop: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: 'white' },
  headerSubtitle: { color: 'rgba(255,255,255,0.8)', fontWeight: 'bold', marginBottom: 20 },
  levelCard: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 25, padding: 20 },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  levelLabel: { color: 'rgba(255,255,255,0.7)', fontWeight: 'bold', fontSize: 12 },
  levelName: { color: 'white', fontSize: 20, fontWeight: '900' },
  pointsDisplay: { color: 'white', fontSize: 24, fontWeight: '900' },
  progressBarBg: { backgroundColor: 'rgba(255,255,255,0.3)', height: 10, borderRadius: 5, overflow: 'hidden' },
  progressBarFill: { backgroundColor: 'white', height: '100%', borderRadius: 5 },
  progressText: { color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 5, textAlign: 'center', fontWeight: 'bold' },
  listContainer: { padding: 20 },
  taskCard: { backgroundColor: 'white', borderRadius: 25, padding: 15, flexDirection: 'row', marginBottom: 15, elevation: 3 },
  taskCardCompleted: { opacity: 0.7, borderColor: '#A7F3D0', borderWidth: 1 },
  taskIcon: { fontSize: 35, marginRight: 15 },
  taskInfo: { flex: 1 },
  taskTitle: { fontWeight: '900', color: '#1F2937', fontSize: 14 },
  textCompleted: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  taskDesc: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  taskProgressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },
  taskBarBg: { flex: 1, backgroundColor: '#F3F4F6', height: 8, borderRadius: 4, overflow: 'hidden' },
  taskBarFill: { height: '100%' },
  taskCounter: { fontSize: 10, fontWeight: 'bold', color: '#4B5563' },
  taskFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  pointsReward: { color: '#D97706', fontWeight: '900', fontSize: 12 },
  regButton: { backgroundColor: '#F97316', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 12 },
  regButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  badgeCompleted: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#D1FAE5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeText: { color: '#059669', fontWeight: 'bold', fontSize: 11 }
});