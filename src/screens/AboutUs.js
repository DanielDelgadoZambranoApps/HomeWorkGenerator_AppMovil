import { StyleSheet, Image, View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

const url = "https://www.flaticon.es/iconos-gratis/protesis"

 const AboutUs = () => {
  return (
    <>
      <View style={styles.container} >
        <View style={styles.box} > 
          <Image style={styles.LogoImage} source={require('../../assets/imagegeneratorLogo.png')} /> 
        <View style={{marginTop:10}} />
        <Text style={styles.mainText} >This application was developed by PolarisApps team and is completely free, the icons and images were provided by</Text>
        <TouchableOpacity onPress={()=>{ Linking.openURL(url) }} >
          <View style={{left:60, bottom:19.5}} >
          <Text style={{fontSize:15, fontStyle:'italic', alignSelf:'flex-end'}}> Flaticon Icons .</Text>
          </View>

        </TouchableOpacity>
        <View style={{marginTop:130}} />
        <Text style={styles.text} >You need an applicaction ? Contact Us !</Text>
        <View style={{flexDirection:'row', right:10}} >
          <Text style={styles.subText} >     Send us an email to </Text>
          <Text style={styles.subTextMail} >PolarisTeamApps@gmail.com</Text>
        </View>
        </View>
      </View>
    </>
  )
}

export default AboutUs

const styles = StyleSheet.create({
  container:{
    flex:1,
     backgroundColor:"#EAFFE9",
  },
  box:{
    width:'85%',
    height:'85%',
    backgroundColor:'#BFFFBC',
    alignSelf:'center',
    borderRadius:10,
    marginTop:40,
    alignItems:'center',
    elevation:5
  },
  LogoImage:{
    width: "75%", 
    height: "50%",
    resizeMode: "contain",
    right:10,
    marginTop:10
  },
  text:{
    alignSelf:'flex-start',
    marginBottom:5,
    fontStyle:'italic',
    left:10
  },
  subText:{
    alignSelf:'flex-start',
    fontStyle:'italic',
  },
  subTextMail:{
    alignSelf:'flex-start',
    fontStyle:'italic',
    color:'blue'
  },
  mainText:{
    fontSize:15,
    textAlign:'justify',
  }
})