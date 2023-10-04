import React from 'react'
import { LogBox } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import DrawerNavigator from './DrawerNavigator'

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
const MainNavigator = ({navigation}) => {

  return(
    <>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='SplashScreen'
            screenOptions={({route}) =>({
              headerTintColor:'white',
              activeTintColor: '#06CF00',
              headerTitleAlign:'center',
              headerStyle:{backgroundColor:'#06CF00'},
              drawerStyle:{width:220},
              headerTitleStyle:{fontSize:20},
            // drawerLabel:route.name
            headerShown:true
            })}>
            <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} options={{ headerShown:false }} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown:false }} />   
            <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown:false }} /> 
        </Stack.Navigator>
      </NavigationContainer> 
    </>
  )}

export default MainNavigator;