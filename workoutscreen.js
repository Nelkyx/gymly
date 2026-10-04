import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  // Estados do Aplicativo (Gymky)
  const [currentTab, setCurrentTab] = useState('workout'); // 'workout' ou 'history'
  
  const [exercise, setExercise] = useState({
    name: "Supino Reto com Halteres",
    targetSets: 3,
    targetReps: "10-12 reps",
    tip: "Mantenha os cotovelos em um ângulo de 45 graus em relação ao tronco para proteger as articulações dos ombros."
  });

  const [currentSet, setCurrentSet] = useState(1);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [historyList, setHistoryList] = useState([]);

  const handleFinishSet = () => {
    if (!weight || !reps) {
      alert("Por favor, preencha a carga e as repetições!");
      return;
    }

    // Salva no histórico local
    const newLog = {
      id: Date.now().toString(),
      exercise: exercise.name,
      set: currentSet,
      weight: weight,
      reps: reps,
    };

    setHistoryList([newLog, ...historyList]);

    // Limpa campos
    setWeight('');
    setReps('');

    if (currentSet < exercise.targetSets) {
      setCurrentSet(currentSet + 1);
    } else {
      alert("Parabéns! Você concluiu este exercício.");
      setCurrentSet(1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Cabeçalho do App */}
      <View style={styles.appHeader}>
        <Text style={styles.appLogo}>GYMKY <Text style={styles.aiTag}>AI</Text></Text>
        <View style={styles.tabButtons}>
          <TouchableOpacity 
            style={[styles.tabBtn, currentTab === 'workout' && styles.tabBtnActive]} 
            onPress={() => setCurrentTab('workout')}
          >
            <Text style={[styles.tabText, currentTab === 'workout' && styles.tabTextActive]}>Treino</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabBtn, currentTab === 'history' && styles.tabBtnActive]} 
            onPress={() => setCurrentTab('history')}
          >
            <Text style={[styles.tabText, currentTab === 'history' && styles.tabTextActive]}>Histórico</Text>
          </TouchableOpacity>
        </View>
      </View>

      {currentTab === 'workout' ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Info do Exercício */}
          <View style={styles.header}>
            <Text style={styles.categoryTitle}>TREINO PERSONALIZADO (A)</Text>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.targetInfo}>Meta sugerida: {exercise.targetSets} séries de {exercise.targetReps}</Text>
          </View>

          {/* Espaço Multimídia / GIF */}
          <View style={styles.mediaContainer}>
            <Text style={styles.mediaPlaceholder}>🎬 [ Simulação de GIF / Execução Correta ]</Text>
          </View>

          {/* Dica da IA */}
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>💡 Dica do Personal IA:</Text>
            <Text style={styles.tipText}>{exercise.tip}</Text>
          </View>

          {/* Bloco de Registro da Série */}
          <View style={styles.setCard}>
            <Text style={styles.setTitle}>Registrar Série {currentSet} de {exercise.targetSets}</Text>
            
            <View style={styles.inputsRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Carga (kg)</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Ex: 12"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Repetições Feitas</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Ex: 12"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={reps}
                  onChangeText={setReps}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleFinishSet}>
              <Text style={styles.buttonText}>Salvar Série e Avançar</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      ) : (
        /* Tela de Histórico */
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.historyTitle}>Seu Histórico de Hoje</Text>
          {historyList.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum registro feito ainda. Vá treinar!</Text>
          ) : (
            historyList.map((item) => (
              <View key={item.id} style={styles.historyCard}>
                <Text style={styles.historyExercise}>{item.exercise}</Text>
                <Text style={styles.historyDetails}>Série {item.set} — {item.weight}kg x {item.reps} repetições</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:Peço desculpas pela frustração. Vamos resolver isso agora mesmo de forma direta e sem enrolação. 

Para que você possa copiar e colar tudo de uma vez num único arquivo funcional e testar o app inteiro imediatamente, unifiquei a estrutura em um código completo para o arquivo **`App.js`**. 

Este código contém:
* A tela de treino interativa (com o exercício, contador de séries e inputs de carga/repetições).
* A lógica de salvamento e transição de séries.
* Um **cronômetro de descanso automático** que dispara assim que você conclui uma série (o que todo bom app de musculação precisa).
* O visual completo com tema escuro (Dark Mode) otimizado para academia.

Substitua o conteúdo do seu arquivo por este código completo abaixo:

```javascript
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function App() {
  // Dados de exemplo do treino gerado pela IA
  const [exercise, setExercise] = useState({
    name: "Supino Reto com Halteres",
    targetSets: 3,
    targetReps: "10-12 reps",
    restTime: 45, // Tempo de descanso em segundos
    tip: "Mantenha os cotovelos em um ângulo de 45 graus em relação ao tronco para proteger os ombros."
  });

  const [currentSet, setCurrentSet] = useState(1);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  
  // Estados do Cronômetro de Descanso
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0);

  // Efeito para rodar o cronômetro de descanso
  useEffect(() => {
    let interval = null;
    if (isResting && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isResting) {
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [isResting, timer]);

  const handleFinishSet = () => {
    if (!weight || !reps) {
      alert("Preencha a carga e as repetições antes de avançar!");
      return;
    }

    // Limpa os campos e inicia o descanso
    setWeight('');
    setReps('');

    if (currentSet < exercise.targetSets) {
      setTimer(exercise.restTime);
      setIsResting(true);
      setCurrentSet(currentSet + 1);
    } else {
      alert("Parabéns! Exercício concluído com sucesso.");
      setCurrentSet(1);
    }
  };

  return (
    <SafeAreaView style="{styles.container}">
      <ScrollView contentContainerStyle="{styles.scrollContainer}">
        
        {/* Cabeçalho */}
        <View style="{styles.header}">
          <Text style="{styles.categoryTitle}">TREINO DE HOJE (A)</Text>
          <Text style="{styles.exerciseName}">{exercise.name}</Text>
          <Text style="{styles.targetInfo}">Meta: {exercise.targetSets} séries de {exercise.targetReps}</Text>
        </View>

        {/* Tela de Descanso Ativa (Se estiver descansando) */}
        {isResting ? (
          <View style="{styles.restContainer}">
            <Text style="{styles.restTitle}">⏱️ DESCANSANDO</Text>
            <Text style="{styles.restTimerText}">{timer}s</Text>
            <TouchableOpacity onPress="{()" style="{styles.skipButton}"> { setIsResting(false); setTimer(0); }}>
              <Text style="{styles.skipButtonText}">Pular Descanso</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Bloco de Vídeo / GIF simulado */}
            <View style="{styles.mediaContainer}">
              <Text style="{styles.mediaPlaceholder}">[ GIF de Execução do Exercício ]</Text>
            </View>

            {/* Dica da IA */}
            <View style="{styles.tipContainer}">
              <Text style="{styles.tipTitle}">💡 Dica de Segurança:</Text>
              <Text style="{styles.tipText}">{exercise.tip}</Text>
            </View>

            {/* Card de Registro da Série */}
            <View style="{styles.setCard}">
              <Text style="{styles.setTitle}">Série {currentSet} de {exercise.targetSets}</Text>
              
              <View style="{styles.inputsRow}">
                <View style="{styles.inputGroup}">
                  <Text style="{styles.inputLabel}">Carga (kg)</Text>
                  <TextInput keyboardType="numeric" onChangeText="{setWeight}" placeholder="Ex: 12" style="{styles.input}" value="{weight}"/>
                </View>

                <View style="{styles.inputGroup}">
                  <Text style="{styles.inputLabel}">Repetições</Text>
                  <TextInput keyboardType="numeric" onChangeText="{setReps}" placeholder="Ex: 12" style="{styles.input}" value="{reps}"/>
                </View>
              </View>

              <TouchableOpacity onPress="{handleFinishSet}" style="{styles.button}">
                <Text style="{styles.buttonText}">Concluir Série</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  categoryTitle: {
    color: '#00B4D8',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  targetInfo: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 4,
  },
  mediaContainer: {
    height: 180,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  mediaPlaceholder: {
    color: '#666666',
    fontSize: 14,
  },
  tipContainer: {
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#00B4D8',
  },
  tipTitle: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 2,
  },
  tipText: {
    color: '#CBD5E1',
    fontSize: 13,
  },
  setCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  setTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputGroup: {
    width: '48%',
  },
  inputLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00B4D8',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  restContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#00B4D8',
  },
  restTitle: {
    color: '#00B4D8',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restTimerText: {
    color: '#FFFFFF',
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  skipButton: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  skipButtonText: {
    color: '#A0A0A0',
    fontWeight: 'bold',
  },
});
