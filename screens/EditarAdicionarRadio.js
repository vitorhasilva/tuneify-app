import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Adicionar({ navigation, route }) {
  const editRadio = route.params?.editRadio;
  const [name, setName] = useState(editRadio?.name || '');
  const [uri, setUri] = useState(editRadio?.uri || '');
  const [logo, setLogo] = useState(editRadio?.logo || '');

  useEffect(() => {
    if (editRadio) {
      navigation.setOptions({ title: 'Editar Rádio' });
    }
  }, [editRadio]);

  const guardar = async () => {
    if (!name.trim() || !uri.trim()) {
      Alert.alert('Erro', 'Nome e URL da rádio são obrigatórios.');
      return;
    }

    const newlogo = !logo.trim() ? `https://placehold.co/500x500.png?font=oswald&text=${encodeURIComponent(name)}` : logo;
    const novaRadio = { name, uri, logo: newlogo };

    const saved = await AsyncStorage.getItem('customRadios');
    let lista = saved ? JSON.parse(saved) : [];

    if (editRadio) {
      lista = lista.filter(r => r.uri !== editRadio.uri);
    }

    lista.push(novaRadio);
    await AsyncStorage.setItem('customRadios', JSON.stringify(lista));
    navigation.goBack();
  };

  const apagar = async () => {
    Alert.alert('Eliminar Rádio', 'Tens a certeza que queres eliminar esta rádio?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const saved = await AsyncStorage.getItem('customRadios');
          if (!saved) return;
          const parsed = JSON.parse(saved);
          const updated = parsed.filter(r => r.uri !== editRadio.uri);
          await AsyncStorage.setItem('customRadios', JSON.stringify(updated));
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome da Rádio</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>URL do Stream</Text>
      <TextInput style={styles.input} value={uri} onChangeText={setUri} />

      <Text style={styles.label}>URL do Logótipo (opcional)</Text>
      <TextInput style={styles.input} value={logo} onChangeText={setLogo} />

      <TouchableOpacity style={styles.saveButton} onPress={guardar}>
        <Text style={styles.saveText}>{editRadio ? 'Guardar Alterações' : 'Adicionar Rádio'}</Text>
      </TouchableOpacity>

      {editRadio && (
        <TouchableOpacity style={styles.deleteButton} onPress={apagar}>
          <Text style={styles.deleteText}>🗑 Eliminar Rádio</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: '500', marginTop: 12 },
  input: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  deleteButton: {
    backgroundColor: '#f44336',
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
