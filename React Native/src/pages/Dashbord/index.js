import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import * as Location from 'expo-location';
import { Svg, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const optionsList1 = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

function getDiaSemanaAtual() {
  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ];
  const diaSemanaAtual = new Date().getDay();
  return diasSemana[diaSemanaAtual];
}

const Dashbord = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isDaySelectorVisible, setIsDaySelectorVisible] = useState(false);
  const [lastSelectedDay, setLastSelectedDay] = useState(getDiaSemanaAtual());
  const [selectedDayOfMonth, setSelectedDayOfMonth] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');

  const tempoInatividade = 30 * 60 * 1000;
  let temporizadorInatividade;

  const navigation = useNavigation();

  useEffect(() => {
    async function verificaSessao() {
      try {
        const resultado = await verificarSessaoSimulada();

        if (resultado === 'sessao temporária') {
          iniciarTemporizador();
        } else if (resultado === 'Não há sessão') {
        }

        setIsPageLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      
      let enabled = await Location.hasServicesEnabledAsync();
      setLocationEnabled(enabled);

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getLocation();
    verificaSessao();
    
    const month = getCurrentMonth();
    setCurrentMonth(month);

  }, []);

  const verificarSessaoSimulada = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('sessao temporária');
      }, 2000);
    });
  };

  const iniciarTemporizador = () => {
    temporizadorInatividade = setTimeout(destruirSessao, tempoInatividade);
  };

  const destruirSessao = () => {
    // Implemente a lógica para destruir a sessão no React Native
    // Lembre-se de adaptar isso para o React Native
  };

  const getCurrentMonth = () => {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês atual no formato "MM"
    return month;
  };

  const calculateDayOfMonth = (selectedDay) => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // Dia da semana atual (0 = Domingo, 1 = Segunda, ...)
    const daysUntilSelectedDay = selectedDay - currentDayOfWeek;
    const selectedDate = new Date(today);
    selectedDate.setDate(today.getDate() + daysUntilSelectedDay);
    
    return selectedDate.getDate() + 1;
  };

  const toggleShowAllDays = () => {
    setIsDaySelectorVisible(!isDaySelectorVisible);
  };

  const clickHandler = (selectedValue) => {
    setSelectedOption(selectedValue);
    setLastSelectedDay(selectedValue);
    setIsDaySelectorVisible(false);

    // Calcula o dia do mês com base no dia da semana selecionado
    const dayOfMonth = calculateDayOfMonth(optionsList1.indexOf(selectedValue));

    const formattedDate = dayOfMonth.toString().padStart(2, '0') + '/' + currentMonth;
    
    setSelectedDayOfMonth(formattedDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.menus}>
      </View>
          <View style={styles.containerCarRegister}>
            <TouchableOpacity 
            style={styles.carRegisterButton} 
            id="Caroneiro"
            onPress={() => navigation.navigate('driverInfo')} >
              <Text style={styles.caroneiroText}>Quero Ser Caroneiro!</Text>
            </TouchableOpacity>
          </View>
        <View style={styles.rodapeMenu1}>
          <View style={styles.selectBox1}>
            <TouchableOpacity
              style={styles.selectBoxContent}
              onPress={toggleShowAllDays}
            >
              {isDaySelectorVisible ? (
                <Text>{selectedOption || lastSelectedDay} - {selectedDayOfMonth}</Text>
              ) : (
                <Text>{lastSelectedDay} - {selectedDayOfMonth}</Text>
              )}
              <Svg width={20} height={20} viewBox="0 0 20 20" style={styles.icon}>
                <Path d="M16.993 6.667H3.227l6.883 6.883 6.883-6.883z" fill="#000" />
              </Svg>
            </TouchableOpacity>
            {isDaySelectorVisible && (
              <View style={styles.selectBoxContentDashborder}>
                {optionsList1.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.diasSemana,
                      option === selectedOption && styles.selectedDiasSemana,
                    ]}
                    onPress={() => clickHandler(option)}
                  >
                    <View style={styles.dayButton}>
                      <Text style={styles.whiteText}>{option}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        
      </View>

      <View style={styles.pageLoader}>
        {isPageLoading && <Text>Carregando...</Text>}
      </View>

      {errorMsg && <Text>{errorMsg}</Text>}
      {location && (
        <View>
        </View>
      )}
      {!locationEnabled && (
        <View>
          <TouchableOpacity
            onPress={() => Location.requestForegroundPermissionsAsync()}
          >
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fae8b8',
  },
  menus: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  menu1: {
    width: '100%',
    alignItems: 'center',
  },  
  selectBoxContent: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectBoxContentDashborder: {
    backgroundColor: 'black',
    borderRadius: 8,
    width: '100%', 
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  whiteText: {
    color: 'white',
  },
  dayButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    marginLeft: 150,
    marginTop: -18,
  },
  diasSemana: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  selectedDiasSemana: {
    backgroundColor: 'black',
    color: 'white',
  },
  containerCarRegister: {
    marginTop: 20,
  },
  carRegisterButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  caroneiroText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pageLoader: {
    marginTop: 20,
  },
});

export default Dashbord ;
