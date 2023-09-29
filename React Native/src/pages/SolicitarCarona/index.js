import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SolicitarCarona = ({ onSolicitarCarona }) => {
  const [caronasDisponiveis, setCaronasDisponiveis] = useState([]);

  const handleSolicitarCarona = (caronaSelecionada) => {
    if (caronaSelecionada) {
      onSolicitarCarona(caronaSelecionada);
    } else {
      alert('Selecione uma carona para solicitar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Solicitar Carona</Text>
      <View style={styles.listaCaronas}>
        {caronasDisponiveis.map((carona, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.caronaItem,
              carona === caronaSelecionada && styles.caronaSelecionada,
            ]}
            onPress={() => setCaronaSelecionada(carona)}
          >
            <Text style={styles.nomeMotorista}>Motorista: {carona.motorista}</Text>
            <Text style={styles.destino}>Destino: {carona.destino}</Text>
            <Text style={styles.horaPartida}>Hora de Partida: {carona.horaPartida}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleSolicitarCarona} style={styles.botaoSolicitar}>
        <Text style={styles.textoBotaoSolicitar}>Solicitar Carona</Text>
      </TouchableOpacity>
    </View>
  );
};

const api = [
    {
      destino: 'Uerj',
      horaPartida: '16hs', 
      nome: 'joao',
    },
  ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listaCaronas: {
    marginBottom: 20,
  },
  caronaItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  caronaSelecionada: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  nomeMotorista: {
    fontWeight: 'bold',
  },
  destino: {},
  horaPartida: {},
  botaoSolicitar: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  textoBotaoSolicitar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SolicitarCarona; 
