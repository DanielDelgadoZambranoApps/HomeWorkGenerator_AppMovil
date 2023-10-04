import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProgressBar =({frecuency, message="Loading.....", hasTop=0, setSubTopicsAmount, setLoading, setSuccessfulRequest, setContent, setTotalWords, setSubTopicsArray, setMainTitle}) => {
  const [percentage , setPercentage] = useState(0)
  let index = 0

  useEffect(()=>{
    console.log("frecuency -------------> " +  frecuency)
    contar()
  },[] )

  const contar =()=>{
    if(index < 98){
      console.log("current index -------------> " +  index)
      index = index +1
      setPercentage(index + 1)
      setTimeout(contar , frecuency) 
    } else {
      if(setLoading)setLoading(false)
      if(setSuccessfulRequest) setSuccessfulRequest(true)
      if(setContent) setContent(null)
      if(setTotalWords) setTotalWords(0)
      if(setSubTopicsArray) setSubTopicsArray(null)
      if(setSubTopicsAmount)setSubTopicsAmount(0)
      if(setMainTitle) setMainTitle(null)
    }
  }

  return (
    <>
      <View style={styles.container}>
      <View style={{marginTop:'70%'}} />
        <View style={{alignItems:'center', marginBottom:5}} >
          <Text> {message} </Text>
        </View>
        <View style={{ height: 20, flexDirection: "row", width: '90%', backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, borderRadius:10, alignSelf:'center'}}>
          <View style={{width:(percentage + "%"), height:'100%', backgroundColor:'#06DF00', borderBottomRightRadius:10, borderTopRightRadius:10, borderRadius:10 }} />
        </View>
        <View style={{alignItems:'center', marginTop:5 }} >
        <Text> {percentage}% </Text>
        </View>
      </View>
    </>

  )
}

export default ProgressBar

const styles = StyleSheet.create({
  container:{
    marginTop:10,
    flex:1,
     backgroundColor:"#BFFFBC",
     width:'100%',
    height:'90%'
    }
})