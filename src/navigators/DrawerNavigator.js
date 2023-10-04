import React from 'react';
import { LogBox } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CustomSidebarMenu from '../../CustomSidebarMenu'
import CurrentDocuments from '../screens/CurrentDocuments'
import MainScreen from '../screens/MainScreen'
import AboutUs from '../screens/AboutUs'

const Drawer = createDrawerNavigator();

const  DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    initialRouteName="MainScreen"
    drawerContent={(props) =>{
      LogBox.ignoreAllLogs();
      return(
        <>
        <CustomSidebarMenu {...props} />
        </>
         )
    } }
      screenOptions={({route}) =>({
        headerTintColor:'white',
        activeTintColor: '#06DF00',
        headerTitleAlign:'center',
        headerStyle:{backgroundColor:'#06DF00'},
        drawerStyle:{width:220},
        headerTitleStyle:{fontSize:20},
        drawerLabel:route.name ,
      })}>
      <Drawer.Screen name="MainScreen" component={MainScreen} options={{title :"Homework Generator", drawerLabel :"Homework Generator", groupName: 'HomeworkGPT', unmountOnBlur:false}} />
      <Drawer.Screen name="CurrentDocuments" component={CurrentDocuments} options={{title :"Recent Documents", drawerLabel :"Current Documents", groupName: 'HomeworkGPT', unmountOnBlur:true}} />
      <Drawer.Screen name="AboutUs" component={AboutUs} options={{title :"About Us", drawerLabel :"About Us", groupName: 'HomeworkGPT', unmountOnBlur:false}} />
    </Drawer.Navigator> 
  )
}

export default DrawerNavigator
