import React, { useState, useEffect } from "react";
import { SafeAreaView, ActivityIndicator, View, StyleSheet, Image } from "react-native";
import { GetSpecificValueFromAsyncStorage } from "../storage/storage-functions"

const SplashScreen = ({ navigation }) => {
  const [userMail, setUserMail] = useState(null)
  const [animating, setAnimating] = useState(true)

  useEffect(()=>{
    GetSpecificValueFromAsyncStorage('email', setUserMail)
  },[])

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false)
      if(userMail){
        navigation.replace("DrawerNavigator") 
      }else{
        navigation.replace("LoginScreen")
      }
    }, 3000);
  }, [userMail])  

  return (
    <SafeAreaView style={styles.stylesheet}>
      <View style={styles.container}>
        <Image source={require("../../assets/imagegeneratorLogo.png")} style={styles.image} />
        <ActivityIndicator animating={animating} color="#06CF00"size="large" style={styles.activityIndicator}/>
      </View>
    </SafeAreaView>
  )}

export default SplashScreen;

const styles = StyleSheet.create({
  stylesheet:{
    flex:1,
    backgroundColor:'#EAFFE9'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  image:{
    width: "90%",
    resizeMode: "contain",
    margin: 30,
    right:10
  }
})