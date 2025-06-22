// screens/RadioPlayer.js
import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, useColorScheme, Alert, Modal, TextInput, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '../context/PlayerContext';

export default function RadioPlayer({ route, navigation }) {
  const { radio: routeRadio } = route.params;
  const { radio, isPlaying, play, toggle, volume, setVolume, setSleepTimer } = usePlayer();
  const scheme = useColorScheme();
  const styles = getStyles(scheme === 'dark');
  const [timerModal, setTimerModal] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: routeRadio.name });
    if (routeRadio.uri !== radio?.uri) play(routeRadio);
  }, [routeRadio]);



  const askTimer = () => {
    Alert.alert('Temporizador', 'Parar após:', [
      { text: 'Cancelar', style: 'cancel' },
      { text: '5m', onPress: () => setSleepTimer(300) },
      { text: '10m', onPress: () => setSleepTimer(600) },
      { text: '30m', onPress: () => setSleepTimer(1800) },
      { text: 'Personalizado', onPress: () => setTimerModal(true) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: routeRadio.logo }} style={styles.logo} />

      <View style={styles.controlsRow}>
        <TouchableOpacity onPress={toggle} style={styles.playButton}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={askTimer} style={styles.timerButton}>
          <Ionicons name="time" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={setVolume}
        minimumTrackTintColor="#4caf50"
      />

      <Modal
        visible={timerModal}
        transparent
        animationType="fade"
        onRequestClose={() => setTimerModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Minutos até parar</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={customMinutes}
              onChangeText={setCustomMinutes}
              placeholder="ex: 15"
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setTimerModal(false);
                  setCustomMinutes('');
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const mins = parseInt(customMinutes, 10);
                  if (!isNaN(mins) && mins > 0) {
                    setSleepTimer(mins * 60);
                    setTimerModal(false);
                    setCustomMinutes('');
                  }
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (dark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark ? '#000' : '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 24,
    marginBottom: 40,
    backgroundColor: dark ? '#333' : '#eee',
  },
  playButton: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: { width: '80%', marginTop: 20 },
  timerButton: {
    marginLeft: 20,
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 50,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: dark ? '#222' : '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  modalTitle: { fontSize: 16, marginBottom: 12, color: dark ? '#fff' : '#000' },
  modalInput: {
    backgroundColor: dark ? '#333' : '#f4f4f4',
    borderRadius: 8,
    padding: 10,
    color: dark ? '#fff' : '#000',
    marginBottom: 20,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  modalButton: { marginLeft: 16 },
  modalButtonText: { color: '#4caf50', fontSize: 16 },
});

