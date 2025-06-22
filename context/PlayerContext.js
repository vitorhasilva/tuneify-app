// context/PlayerContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [radio, setRadio] = useState(null);
  const [requestedRadio, setRequestedRadio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [remainingTime, setRemainingTime] = useState(0);

  const timerRef = useRef(null);

  const player = useAudioPlayer(radio ? { uri: radio.uri } : null);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: 'mixWithOthers',
      interruptionModeAndroid: 'duckOthers',
      shouldPlayInBackground: true,
      allowsRecording: false,
      shouldRouteThroughEarpiece: false,
    });
  }, []);

  useEffect(() => {
    if (requestedRadio && requestedRadio.uri !== radio?.uri) {
      setRadio(requestedRadio);
      setIsPlaying(false);
    }
  }, [requestedRadio]);

  const play = async (newRadio) => {
    if (newRadio && newRadio.uri !== radio?.uri) {
      setRequestedRadio(newRadio);
      return;
    }

    try {
      await player.play();
      setIsPlaying(true);
    } catch (e) {
      console.warn('Erro ao tentar tocar:', e);
    }
  };

  const pause = async () => {
    try {
      await player.pause();
      setIsPlaying(false);
    } catch (e) {
      console.warn('Erro ao pausar:', e);
    }
  };

  const toggle = async () => {
    if (isPlaying) {
      await pause();
    } else if (radio) {
      await play(radio);
    }
  };

  const setVolume = (v) => {
    setVolumeState(v);
    try {
      player.volume = v
    } catch (e) {
      console.warn('Erro ao ajustar volume:', e);
    }
  };

  const setSleepTimer = (seconds) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (seconds > 0) {
      timerRef.current = setTimeout(() => {
        pause();
      }, seconds * 1000);
      setRemainingTime(seconds);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev > 0) return prev - 1;
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PlayerContext.Provider value={{ radio, isPlaying, play, pause, toggle, volume, setVolume, setSleepTimer, remainingTime }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
