// screens/RadioPlayer.js
import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, useColorScheme, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '../context/PlayerContext';

export default function RadioPlayer({ route, navigation }) {
  const { radio: routeRadio } = route.params;
  const { radio, isPlaying, play, toggle, volume, setVolume, setSleepTimer } = usePlayer();
  const scheme = useColorScheme();
  const styles = getStyles(scheme === 'dark');

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
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: routeRadio.logo }} style={styles.logo} />

      <TouchableOpacity onPress={toggle} style={styles.playButton}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="white" />
      </TouchableOpacity>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={setVolume}
        minimumTrackTintColor="#4caf50"
      />

      <TouchableOpacity onPress={askTimer} style={styles.timerButton}>
        <Ionicons name="time" size={28} color="#fff" />
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  slider: { width: '80%', marginTop: 20 },
  timerButton: {
    marginTop: 30,
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 50,
  },
});

