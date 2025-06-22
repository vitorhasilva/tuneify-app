import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const defaultRadios = [
  { name: 'All Stars Radio', uri: 'http://radiotrucker.com/pt/play/182822/all-stars-radio', logo: '' },
  { name: 'Alvor FM', uri: 'http://radiotrucker.com/pt/play/182822/alvor-fm', logo: '' },
  { name: 'Amor Portugal', uri: 'http://radiotrucker.com/pt/play/182822/amor-portugal', logo: '' },
  { name: 'Antena 1', uri: 'http://radiotrucker.com/pt/play/182822/antena-1-portugal', logo: '' },
  { name: 'Antena 2', uri: 'http://radiotrucker.com/pt/play/182822/antena-2', logo: '' },
  { name: 'Antena 3', uri: 'http://radiotrucker.com/pt/play/182822/antena-3', logo: '' },
  { name: 'Cantinho Madeira', uri: 'http://radiotrucker.com/pt/play/182822/cantinho-madeira', logo: '' },
  { name: 'Cidade FM', uri: 'http://radiotrucker.com/pt/play/182822/cidade-fm', logo: 'https://th.bing.com/th/id/R.e1547fa8225f0808a3db5f0b1ab9cb66?rik=MxvAaEIS9hwGkw&riu=http%3a%2f%2fstatic.radiosdeportugal.pt%2fimg%2fcidade.jpg&ehk=h0h%2fpzH9xYh62wzsvSPsO%2bfl7MKQm92HAp8K7hBn4zY%3d&risl=&pid=ImgRaw&r=0' },
  { name: 'Comercial 80', uri: 'http://radiotrucker.com/pt/play/182822/comercial-80', logo: '' },
  { name: 'Hiper FM', uri: 'http://radiotrucker.com/pt/play/182822/hiper-fm', logo: '' },
  { name: 'Mega Hits FM', uri: 'http://radiotrucker.com/pt/play/182822/mega-hits-fm', logo: '' },
  { name: 'Nova Era', uri: 'http://radiotrucker.com/pt/play/182822/nova-era', logo: '' },
  { name: 'Orbital FM', uri: 'http://radiotrucker.com/pt/play/182822/orbital-fm', logo: '' },
  { name: 'Rádio Amália 92 FM', uri: 'http://radiotrucker.com/pt/play/182822/radio-amalia-92-fm', logo: '' },
  { name: 'Rádio Barca', uri: 'http://radiotrucker.com/pt/play/182822/radio-barca', logo: '' },
  { name: 'Rádio Cantinho Da Madeira', uri: 'http://radiotrucker.com/pt/play/182822/radio-cantinho-da-madeira', logo: '' },
  { name: 'Rádio Castelo Branco', uri: 'http://radiotrucker.com/pt/play/182822/radio-castelo-branco', logo: '' },
  { name: 'Rádio Clube de Monsanto', uri: 'http://radiotrucker.com/pt/play/182822/radio-clube-de-monsanto', logo: '' },
  { name: 'Rádio Condestável', uri: 'http://radiotrucker.com/pt/play/182822/radio-condestavel', logo: '' },
  { name: 'Rádio Cova da Beira', uri: 'http://radiotrucker.com/pt/play/182822/radio-cova-da-beira', logo: '' },
  { name: 'Rádio Nove3Cinco', uri: 'http://radiotrucker.com/pt/play/182822/radio-nove3cinco', logo: '' },
  { name: 'Radio Orbital', uri: 'http://radiotrucker.com/pt/play/182822/radio-orbital', logo: '' },
  { name: 'Rádio Regional De Arouca', uri: 'http://radiotrucker.com/pt/play/182822/radio-regional-de-arouca', logo: '' },
  { name: 'Rádio Renascença', uri: 'http://radiotrucker.com/pt/play/182822/radio-renascenca', logo: '' },
  { name: 'Radio RFM', uri: 'http://radiotrucker.com/pt/play/182822/radio-rfm', logo: '' },
  { name: 'Rádio Ritmos', uri: 'http://radiotrucker.com/pt/play/182822/radio-ritmos', logo: '' },
  { name: 'Radio TSF', uri: 'http://radiotrucker.com/pt/play/182822/radio-tsf', logo: '' },
  { name: 'Res.FM', uri: 'http://radiotrucker.com/pt/play/182822/res-fm', logo: '' },
  { name: 'Smooth FM', uri: 'http://radiotrucker.com/pt/play/182822/smooth-fm', logo: '' },
  { name: 'Smooth FM Portugal', uri: 'http://radiotrucker.com/pt/play/182822/smooth-fm-portugal', logo: '' },
  { name: 'Vodafone FM', uri: 'http://radiotrucker.com/pt/play/182822/vodafone-fm', logo: '' },
  { name: 'Miradouro', uri: 'http://radio.miradouro.pt:8000/', logo: '' },
  { name: 'Noite FM', uri: 'http://live.noite.pt:8080', logo: '' },
  { name: 'Mais Oeste', uri: 'https://centova.radio.com.pt/proxy/515?mp=/stream', logo: '' },
  { name: 'ABC PORTUGAL', uri: 'https://centova.radio.com.pt/proxy/547?mp=/stream', logo: '' },
  { name: 'Alvor FM (128k)', uri: 'https://centova.radio.com.pt/proxy/469?mp=/stream', logo: '' },
  { name: 'Rádio Cidade Hoje', uri: 'https://centova.radio.com.pt/proxy/119?mp=/stream', logo: '' },
];


export default function RadioList({ navigation }) {
  const [search, setSearch] = useState('');
  const [playingUri, setPlayingUri] = useState(null);
  const [radios, setRadios] = useState(defaultRadios);
  const [favorites, setFavorites] = useState([]);
  const scheme = useColorScheme();
  const styles = getStyles(scheme === 'dark');

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('customRadios').then((saved) => {
        if (saved) {
          setRadios([...defaultRadios, ...JSON.parse(saved)]);
        }
      });
      AsyncStorage.getItem('favoriteRadios').then((fav) => {
        if (fav) setFavorites(JSON.parse(fav));
      });
    }, [])
  );

  const filteredRadios = radios.filter(radio =>
    radio.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const favA = favorites.includes(a.uri);
    const favB = favorites.includes(b.uri);
    if (favA === favB) return 0;
    return favA ? -1 : 1;
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Adicionar')} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 16, color: '#4caf50' }}>➕</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLongPress = (radio) => {
    const isCustom = !defaultRadios.find(d => d.uri === radio.uri);
    if (isCustom) {
      navigation.navigate('Adicionar', { editRadio: radio });
    }
  };

  const toggleFavorite = async (radio) => {
    let favs = [...favorites];
    if (favs.includes(radio.uri)) {
      favs = favs.filter(u => u !== radio.uri);
    } else {
      favs.push(radio.uri);
    }
    setFavorites(favs);
    await AsyncStorage.setItem('favoriteRadios', JSON.stringify(favs));
  };

  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  }

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.searchInput}
        placeholder="Procurar rádio..."
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView contentContainerStyle={styles.list}>
        {filteredRadios.map((radio) => {
          const isPlaying = playingUri === radio.uri;
          radio.logo = radio.logo || `https://placehold.co/500x500/${stringToColor(radio.name)}/FFF.png?font=oswald&text=${encodeURIComponent(radio.name)}`;

          return (
            <TouchableOpacity
              key={radio.uri}
              style={styles.item}
              onPress={() => {
                setPlayingUri(radio.uri);
                navigation.navigate('Reproduzir', { radio });
              }}
              onLongPress={() => handleLongPress(radio)}
            >
              <View style={styles.row}>
                <Image source={{ uri: radio.logo }} style={styles.logo} />
                <Text style={styles.name}>{radio.name}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(radio)}>
                  <Ionicons
                    name={favorites.includes(radio.uri) ? 'star' : 'star-outline'}
                    size={24}
                    color="#ffd700"
                  />
                </TouchableOpacity>
                {isPlaying && (
                  <ActivityIndicator size="small" color="#4caf50" style={styles.loader} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const getStyles = (dark) => StyleSheet.create({
  container: { flex: 1, backgroundColor: dark ? '#000' : '#fff', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  searchInput: {
    backgroundColor: dark ? '#222' : '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  list: { gap: 12 },
  item: {
    backgroundColor: dark ? '#333' : '#eee',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: dark ? '#555' : '#ccc',
  },
  name: { fontSize: 18, flex: 1 },
  loader: { marginLeft: 10 },
});
