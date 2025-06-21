import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { Ionicons } from '@expo/vector-icons';

export default function RadioPlayer({ route, navigation }) {
  const { radio } = route.params;
  const player = useAudioPlayer({ uri: radio.uri });
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({ title: radio.name });
  }, [radio.name]);

  const togglePlayPause = async () => {
    if (isPlaying) {
      await player.pause();
    } else {
      await player.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: radio.logo || 'https://via.placeholder.com/300x300?text=Rádio' }}
        style={styles.logo}
      />

      <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
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