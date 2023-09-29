import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 14 }, 
        tabStyle: { width: 120, height: 45,  }, 
        showLabel: true,
        style: { backgroundColor: 'white'}, 
        indicatorStyle: { backgroundColor: 'black' }, 
        scrollEnabled: true, 
    }}
    >
      <Tab.Screen name="Dashbord" component={Dashbord} />
      <Tab.Screen name="Motoristas" component={Motoristas} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
