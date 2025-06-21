// context/PlayerContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAudioPlayer } from 'expo-audio';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [radio, setRadio] = useState(null);
  const [requestedRadio, setRequestedRadio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useAudioPlayer(radio ? { uri: radio.uri } : null);

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

  return (
    <PlayerContext.Provider value={{ radio, isPlaying, play, pause, toggle }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
