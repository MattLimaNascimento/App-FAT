import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Registro from '../pages/Registro';
import Dashbord from '../pages/Dashbord'; 
import Motoristas from '../pages/Motoristas';
import DriverInfo from '../pages/DriverInfo';
import SolicitarCarona from '../pages/SolicitarCarona';
import CreateCarpool from '../pages/CreateCarpool';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Carona FAT"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DashbordAndMotoristas"
        component={TabNavigator}
        options={{
          headerTransparent: true, 
          title: '',
          headerBackVisible: false, 
          headerShown: false
          
        }}
      />
      <Stack.Screen
        name="driverInfo"
        component={DriverInfo
      }
        options={{ headerShown: false }}
      />
      <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ headerShown: false }}
        />
      <Stack.Screen
        name="SolicitarCarona"
        component={SolicitarCarona}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateCarpool"
        component={CreateCarpool}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          marginTop: 24, 
          backgroundColor: '#1976D2', 
          height: 50, 
          headerShown: false,
        },
      }}
    >
      <Tab.Screen name="Dashbord" component={Dashbord} 
      />
      <Tab.Screen name="Motoristas" component={Motoristas} />
    </Tab.Navigator>
  );
}
