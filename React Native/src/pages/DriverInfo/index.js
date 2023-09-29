import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DriverInfo = ({ onUpdateDriverInfo }) => {
  const [cnhNumber, setCNH] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [UpdateDriverInfo, setonUpdateDriverInfo] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('CreateCarpool');
  };

  const handleRegister = () => {
    if (!cnhNumber.trim() || !carPlate.trim()) {
      setAlertMessage('Por favor, preencha todos os campos.');
      setShowAlert(true);
    } else if (!acceptedTerms) {
      setAlertMessage('Você precisa aceitar os termos e condições.');
      setShowAlert(true);
    } else {
      // Simulando uma chamada API (substitua por sua lógica real)
      const UpdateDriverInfo = { cnhNumber, carPlate };
      
      setonUpdateDriverInfo(UpdateDriverInfo);
      setAlertMessage('Registro bem-sucedido. Você pode fazer login agora.');
      setShowAlert(true);
      
      //setonUpdateDriverInfo(updatedDriverInfo);
      //setCNH('');
      //setCarPlate('');
      navigation.navigate('Motoristas', {
        cnhNumber,
        carPlate,
      });
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
      <Text style={styles.header}>Registro</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nº Registro (CNH)</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Digite seu número de registro da CNH"
            value={cnhNumber}
            onChangeText={setCNH}
            style={styles.input}
          />
          <FontAwesome name="id-card" size={24} color="black" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Placa do Carro</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Digite a placa do seu carro"
            value={carPlate}
            onChangeText={setCarPlate}
            style={styles.input}
          />
          <FontAwesome name="car" size={24} color="black" style={styles.icon} />
        </View>
      </View>
      <View style={styles.termsCheckBoxContainer}>
        <TouchableOpacity
          style={styles.checkBoxContainer}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        >
          <FontAwesome
            name={acceptedTerms ? 'check-square' : 'square-o'}
            size={24}
            color="black"
            style={styles.checkBoxIcon}
          />
          <Text style={styles.checkBoxLabel}>Eu aceito os termos & condições</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Registrar-se</Text>
      </TouchableOpacity>
      <View style={styles.loginRedirect}>
        <Text style={styles.loginText}>Já possui uma conta?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
      {/* Alerta Personalizado */}
      <Modal visible={showAlert} transparent animationType="fade">
        <View style={styles.alertOverlay}>
          <TouchableWithoutFeedback onPress={closeAlert}>
            <View style={styles.alertContent}>
              <Text style={styles.alertText}>{alertMessage}</Text>
              <TouchableOpacity onPress={closeAlert} style={styles.alertButton}>
                <Text style={styles.alertButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fae8b8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '95%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputBox: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  termsCheckBoxContainer: {
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxIcon: {
    marginRight: 10,
  },
  checkBoxLabel: {
    fontSize: 16,
  },
  loginRedirect: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    marginRight: 10,
  },
  loginLink: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  alertOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContent: {
    backgroundColor: '#fae8b8',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  alertText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  alertButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  alertButtonText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
});

export default DriverInfo;
