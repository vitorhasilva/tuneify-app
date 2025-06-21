import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { Ionicons } from '@expo/vector-icons';

export default function RadioPlayer({ route }) {
  const { radio } = route.params;
  const player = useAudioPlayer({ uri: radio.uri });

  return (
    <View style={styles.container}>
      <Text style={styles.radioName}>{radio.name}</Text>
      <View style={styles.controls}>
        <Pressable onPress={() => player.play()} style={styles.button}>
          <Ionicons name="play-circle" size={64} color="#4caf50" />
        </Pressable>
        <Pressable onPress={() => player.pause()} style={styles.button}>
          <Ionicons name="pause-circle" size={64} color="#f44336" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
    padding: 20,
  },
  radioName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    gap: 30,
  },
  button: {
    padding: 10,
  },
});
