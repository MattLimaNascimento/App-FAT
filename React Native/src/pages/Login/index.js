import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('Registro');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertMessage('Por favor, preencha seu email e senha antes de fazer login.');
      setShowAlert(true);
      return;
    }
    setIsLoading(true);

    try {
      const loginData = {
        email: email,
        password: password,
      };

      const requestOptions = {
        method: 'POST', // Usando o método POST para enviar dados de login
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), // Convertendo os dados para JSON
      };

      const response = await fetch('http://127.0.0.1:8000/rides/login/', requestOptions);

      if (response.status === 200) {
        // Login bem-sucedido
        setAlertMessage('Login bem-sucedido.');
        setShowAlert(true);

        if (rememberMe) {
          // Guarde o token de autenticação no AsyncStorage
          const responseData = await response.json();
          await AsyncStorage.setItem('authToken', responseData.token);
        } else {
          await AsyncStorage.removeItem('authToken');
        }

        navigation.navigate('DashbordAndMotoristas');
      } else {
        setAlertMessage('Email ou senha incorretos. Tente novamente.');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Erro:', error);
      setAlertMessage('Erro ao fazer login. Verifique seus dados e tente novamente.');
      setShowAlert(true);
    }

    setIsLoading(false);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const sendPasswordResetEmail = async () => {
    if (!email) {
      setAlertMessage('Por favor, insira seu email antes de redefinir a senha.');
      setShowAlert(true);
      return;
    }

    const resetLink = 'https://example.com/reset-password';

    const emailUrl = `mailto:${email}?subject=Redefinição de Senha&body=Use o seguinte link para redefinir sua senha:\n\n${resetLink}`;

    try {
      const supported = await Linking.canOpenURL(emailUrl);

      if (supported) {
        await Linking.openURL(emailUrl);
      } else {
        console.error('Não é possível abrir o cliente de email.');
      }
    } catch (error) {
      console.error('Erro ao abrir o cliente de email:', error);
    }
  };

  // Função para verificar a expiração do login
  const checkLoginExpiration = async () => {
    const loggedInUser = await AsyncStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const { loginTimestamp } = JSON.parse(loggedInUser);
      const currentTime = Date.now();
      const timeDifference = currentTime - loginTimestamp;
      const thirtyMinutesInMilliseconds = 30 * 60 * 1000;

      if (timeDifference > thirtyMinutesInMilliseconds) {
        await AsyncStorage.removeItem('loggedInUser');
      }
    }
  };

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const loggedInUser = await AsyncStorage.getItem('loggedInUser');

      if (loggedInUser) {
        navigation.navigate('DashbordAndMotoristas');
      }
    };

    checkLoggedInUser();

    checkLoginExpiration();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
      <Text style={styles.header}>Login</Text>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Digite seu email"
            onChangeText={setEmail}
            style={styles.input}
          />
          <FontAwesome name="envelope" size={20} color="black" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Senha</Text>
        <View style={styles.passwordInputBox}>
          <TextInput
            placeholder="Digite sua senha"
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          {password.length > 0 && (
            <TouchableOpacity
              style={styles.passwordVisibility}
              onPress={() => setShowPassword(!showPassword)}
            >
            </TouchableOpacity>
          )}
          <FontAwesome name="lock" size={20} color="black" style={styles.icon} />
        </View>
      </View>
      <View style={styles.rememberMeContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.checkBoxContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <FontAwesome
              name={rememberMe ? 'check-square' : 'square-o'}
              size={24}
              color="black"
              style={styles.checkBoxIcon}
            />
            <Text style={styles.checkBoxLabel}>Lembre-se de Mim</Text>
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={sendPasswordResetEmail} style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordButtonText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.loginRegister}>
        <Text>Ainda não possui uma conta?{' '}</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.RegistroButtonText}>Registrar</Text>
        </TouchableOpacity>
      </View>

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

      {/* Indicador de carregamento */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            style={styles.loading}
            color="rgba(255,255,255, 0.75)"
            size="small"
          />
        </View>
      )}
    </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    width: '95%',
    marginBottom: 10,
    alignSelf: 'center',
    Color: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputBox: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  passwordInputBox: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  passwordVisibility: {
    position: 'absolute',
    right: 10,
  },
  icon: {
    marginRight: 10,
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    height: 40,
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
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  RegistroButtonText: {
    marginTop: 0,
    color: '#1976D2',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loginRegister: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

  // Estilos para o indicador de carregamento
  loadingContainer: {
    position: 'absolute',
    zIndex: 999,
    height: 32,
    width: 32,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 1.5, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  loading: {
    fontSize: 10,
    width: 20,
    height: 20,
    marginVertical: -10,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: 'rgba(255, 255, 255, 0.75)',
    shadowOffset: { width: 1.5, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  passwordVisibility: {
    marginRight: 10,
  },
  termsCheckBoxContainer: {
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
  },
  checkBoxContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxIcon: {
    marginRight: 10,
  },
  checkBoxLabel: {
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 10,
  },  
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  forgotPasswordButton: {
    marginLeft: 95,
  },
  forgotPasswordButtonText: {
    color: '#1976D2',
    fontSize: 16,
  },
});

export default LoginScreen;
