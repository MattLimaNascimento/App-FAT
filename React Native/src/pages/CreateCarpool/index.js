import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateCarpool = ({ onCaronaCriada }) => {
  const [destino, setDestino] = useState('');
  const [horaPartida, setHoraPartida] = useState('');
  const navigation = useNavigation();

  const handleCriarCarona = () => {
    if (!destino.trim() || !horaPartida.trim()) {
      alert('Por favor, preencha todos os campos.');
    } else {
      const carona = {
        destino,
        horaPartida,
      };
      onCaronaCriada(carona);
      setDestino('');
      setHoraPartida('');
      navigation.navigate('Motoristas', { carona });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Criar Carona</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Destino</Text>
        <TextInput
          placeholder="Digite o destino"
          value={destino}
          onChangeText={setDestino}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hora de Partida</Text>
        <TextInput
          placeholder="Digite a hora de partida"
          value={horaPartida}
          onChangeText={setHoraPartida}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleCriarCarona} style={styles.botaoCriar}>
        <Text style={styles.textoBotaoCriar}>Criar Carona</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  botaoCriar: {
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  textoBotaoCriar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateCarpool;
