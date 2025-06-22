// screens/RadioPlayer.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Modal,
  TextInput,
  Text,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '../context/PlayerContext';

export default function RadioPlayer({ route, navigation }) {
  const { radio: routeRadio } = route.params;
  const {
    radio,
    isPlaying,
    play,
    toggle,
    volume,
    setVolume,
    setSleepTimer,
    remainingTime = 0,
    setRemainingTime
  } = usePlayer();
  const scheme = useColorScheme();
  const styles = getStyles(scheme === 'dark');
  const [timerModal, setTimerModal] = useState(false);
  const [customHours, setCustomHours] = useState('');
  const [customMinutes, setCustomMinutes] = useState('');
  const [customSeconds, setCustomSeconds] = useState('');
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: routeRadio.name });
    if (routeRadio.uri !== radio?.uri) play(routeRadio);
  }, [routeRadio]);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h > 0 ? h + 'h ' : ''}${m > 0 ? m + 'm ' : ''}${s}s`;
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: routeRadio.logo }} style={styles.logo} />

      {typeof remainingTime === 'number' && remainingTime > 0 && (
        <Text style={styles.remainingText}>⏳ {formatTime(remainingTime)}</Text>
      )}

      <View style={styles.controlsRow}>
        <TouchableOpacity
          onPress={() => setShowVolume((v) => !v)}
          style={[styles.volumeButton, showVolume && styles.activeButton]}
        >
          <Ionicons name="volume-high" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggle}
          style={[styles.playButton, isPlaying && styles.activeButton]}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTimerModal(true)}
          style={[styles.timerButton, timerModal && styles.activeButton]}
        >
          <Ionicons name="time" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {showVolume && (
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={setVolume}
          minimumTrackTintColor="#4caf50"
        />
      )}

      <Modal
        visible={timerModal}
        transparent
        animationType="fade"
        onRequestClose={() => setTimerModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Parar após</Text>
            <View style={styles.timeInputs}>
              <TextInput
                style={[styles.modalInput, styles.timeInput]}
                keyboardType="numeric"
                value={customHours}
                onChangeText={setCustomHours}
                placeholder="horas"
                placeholderTextColor="#999"
              />
              <TextInput
                style={[styles.modalInput, styles.timeInput]}
                keyboardType="numeric"
                value={customMinutes}
                onChangeText={setCustomMinutes}
                placeholder="min"
                placeholderTextColor="#999"
              />
              <TextInput
                style={[styles.modalInput, styles.timeInput]}
                keyboardType="numeric"
                value={customSeconds}
                onChangeText={setCustomSeconds}
                placeholder="seg"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setTimerModal(false);
                  setCustomHours('');
                  setCustomMinutes('');
                  setCustomSeconds('');
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const hrs = parseInt(customHours, 10) || 0;
                  const mins = parseInt(customMinutes, 10) || 0;
                  const secs = parseInt(customSeconds, 10) || 0;
                  const total = hrs * 3600 + mins * 60 + secs;
                  if (total > 0) {
                    setSleepTimer(total);
                    setTimerModal(false);
                    setCustomHours('');
                    setCustomMinutes('');
                    setCustomSeconds('');
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
    marginBottom: 20,
    backgroundColor: dark ? '#333' : '#eee',
  },
  remainingText: {
    color: '#999',
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#388e3c',
  },
  slider: { width: '80%', marginTop: 20 },
  timerButton: {
    marginLeft: 20,
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 50,
  },
  volumeButton: {
    marginRight: 20,
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
  timeInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeInput: {
    flex: 1,
    marginHorizontal: 4,
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
