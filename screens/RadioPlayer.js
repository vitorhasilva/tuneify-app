// screens/RadioPlayer.js
import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '../context/PlayerContext';

export default function RadioPlayer({ route, navigation }) {
  const { radio: routeRadio } = route.params;
  const { radio, isPlaying, play, toggle } = usePlayer();

  useEffect(() => {
    navigation.setOptions({ title: routeRadio.name });
    if (routeRadio.uri !== radio?.uri) play(routeRadio);
  }, [routeRadio]);



  return (
    <View style={styles.container}>
      <Image
        source={{ uri: routeRadio.logo }}
        style={styles.logo}
      />

      <TouchableOpacity onPress={toggle} style={styles.playButton}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 24,
    marginBottom: 40,
    backgroundColor: '#eee',
  },
  playButton: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
