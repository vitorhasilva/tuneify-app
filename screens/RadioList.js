// screens/RadioList.js
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
} from 'react-native';
import { useAudioPlayer } from 'expo-audio';

const radios = [
  { name: 'Antena 1', uri: 'http://radiotrucker.com/pt/play/182822/antena-1-portugal', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Antena1_logo_2020.png' },
  { name: 'Cidade FM', uri: 'http://radiotrucker.com/pt/play/182822/cidade-fm', logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/3/3b/CidadeFM_Logo.png/200px-CidadeFM_Logo.png' },
  { name: 'Mega Hits', uri: 'http://radiotrucker.com/pt/play/182822/mega-hits-fm', logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/5/59/MegaHits.png/200px-MegaHits.png' },
  { name: 'Smooth FM', uri: 'http://radiotrucker.com/pt/play/182822/smooth-fm', logo: 'https://cdn-radiotime-logos.tunein.com/s25093q.png' },
  { name: 'RFM', uri: 'http://radiotrucker.com/pt/play/182822/radio-rfm', logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/7/7f/RFM_Logo.png/200px-RFM_Logo.png' },
  { name: 'Antena 3', uri: 'http://radiotrucker.com/pt/play/182822/antena-3', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Antena_3_logo_2020.png' },
  { name: 'Amor Portugal', uri: 'http://radiotrucker.com/pt/play/182822/amor-portugal', logo: 'https://via.placeholder.com/100x100?text=Amor+PT' },
  { name: 'TSF', uri: 'http://radiotrucker.com/pt/play/182822/radio-tsf', logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/2/2e/TSF_logo.png/200px-TSF_logo.png' },
  { name: 'Nova Era', uri: 'http://radiotrucker.com/pt/play/182822/nova-era', logo: 'https://via.placeholder.com/100x100?text=Nova+Era' },
  { name: 'Smooth FM Jazz', uri: 'http://radiotrucker.com/pt/play/182822/smooth-fm-portugal', logo: 'https://cdn-radiotime-logos.tunein.com/s25093q.png' },
];

export default function RadioList({ navigation }) {
  const [search, setSearch] = useState('');
  const [playingUri, setPlayingUri] = useState(null);

  const filteredRadios = radios.filter(radio =>
    radio.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📻 Rádios Portuguesas</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Procurar rádio..."
        value={search}
        onChangeText={setSearch}
      />
      <ScrollView contentContainerStyle={styles.list}>
        {filteredRadios.map((radio) => {
          const isPlaying = playingUri === radio.uri;

          return (
            <TouchableOpacity
              key={radio.uri}
              style={styles.item}
              onPress={() => {
                setPlayingUri(radio.uri);
                navigation.navigate('Rádio', { radio });
              }}
            >
              <View style={styles.row}>
                <Image source={{ uri: radio.logo }} style={styles.logo} />
                <Text style={styles.name}>{radio.name}</Text>
                {isPlaying && <ActivityIndicator size="small" color="#4caf50" style={styles.loader} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  list: { gap: 12 },
  item: {
    backgroundColor: '#eee',
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
    backgroundColor: '#ccc',
  },
  name: { fontSize: 18, flex: 1 },
  loader: { marginLeft: 10 },
});