import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'

import { GetAllPermissions} from "../functions/permission-functions"
import { SaveInStorage } from '../storage/storage-functions'
import WarningAlert from '../components/WarningAlert'

import FormInput from '../components/FormInput.js'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [show, setShow] = useState(false)

    const checkMailFormat =(mail)=> {
      var value = mail.includes("@")
      return value
    }

    const temporalfunction = ()=>{
      if(email){
        if(checkMailFormat(email)){
          SaveInStorage('email', email)
          GetAllPermissions()
          navigation.navigate('DrawerNavigator')
          } else {
            setShow(true)
          }
        } else {
          setShow(true)
        } 
    }
    
    return(
      <View style={styles.container} >
        <ScrollView>
          <Image source={require("../../assets/imagegeneratorLogo.png")} style={styles.image}/>
          <View style={{marginTop:40}} />

          <FormInput
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholderText="Email"
            iconType="mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.subInfoText}> We will not send you any kind of mail, spam or advertising .</Text>

          <WarningAlert status={show} mainTitle="Error ..." setStatus={setShow} description={"Please write a valid mail."} />

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={()=>temporalfunction()}>
            <Text style={styles.buttonTextStyle}> Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:"#BFFFBC"
},
text:{
    fontSize:20,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    alignSelf:'center'
},
image:{
    width: "80%",
    height: 300,
    resizeMode: "contain",
    margin: 30,
    alignItems: "center",
    marginTop:60,
    marginBottom:0
  },
  buttonStyle: {
    backgroundColor: "#3ACD34",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3ACD34",
    height: 42, 
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 180,
    marginBottom: 25,
    elevation:10
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 17.5,
    fontWeight:'600',
  },
  registerTextStyle: {
    color: "#05AE00",
    textAlign:'center',
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
    marginLeft:160,
    marginTop:5
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  subInfoText:{
    fontSize:14,
    fontStyle:'italic',
    alignSelf:'flex-start',
    left:15
  }
})

