import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const defaultRadios = [
  { name: 'Antena 1', uri: 'http://radiotrucker.com/pt/play/182822/antena-1-portugal', },
  { name: 'Cidade FM', uri: 'http://radiotrucker.com/pt/play/182822/cidade-fm', logo: 'https://th.bing.com/th/id/R.e1547fa8225f0808a3db5f0b1ab9cb66?rik=MxvAaEIS9hwGkw&riu=http%3a%2f%2fstatic.radiosdeportugal.pt%2fimg%2fcidade.jpg&ehk=h0h%2fpzH9xYh62wzsvSPsO%2bfl7MKQm92HAp8K7hBn4zY%3d&risl=&pid=ImgRaw&r=0' },
  { name: 'Mega Hits', uri: 'http://radiotrucker.com/pt/play/182822/mega-hits-fm', },
  { name: 'Smooth FM', uri: 'http://radiotrucker.com/pt/play/182822/smooth-fm', },
  { name: 'RFM', uri: 'http://radiotrucker.com/pt/play/182822/radio-rfm', },
  { name: 'Antena 3', uri: 'http://radiotrucker.com/pt/play/182822/antena-3', },
  { name: 'Amor Portugal', uri: 'http://radiotrucker.com/pt/play/182822/amor-portugal', },
  { name: 'TSF', uri: 'http://radiotrucker.com/pt/play/182822/radio-tsf', },
  { name: 'Nova Era', uri: 'http://radiotrucker.com/pt/play/182822/nova-era', },
  { name: 'Smooth FM Jazz', uri: 'http://radiotrucker.com/pt/play/182822/smooth-fm-portugal', },
];

export default function RadioList({ navigation }) {
  const [search, setSearch] = useState('');
  const [playingUri, setPlayingUri] = useState(null);
  const [radios, setRadios] = useState(defaultRadios);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('customRadios').then((saved) => {
        if (saved) {
          setRadios([...defaultRadios, ...JSON.parse(saved)]);
        }
      });
    }, [])
  );

  const filteredRadios = radios.filter(radio =>
    radio.name.toLowerCase().includes(search.toLowerCase())
  );

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
                navigation.navigate('Reproduzir', { radio });
              }}
              onLongPress={() => handleLongPress(radio)}
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
