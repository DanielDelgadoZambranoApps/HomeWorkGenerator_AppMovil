import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native"
import { lauchCameraOrLibrary } from '../functions/general-functions'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const SubTopicsDescription = ({ setTopicAdded, setSubTopicsAmount, subTopicsAmount, subTopicsArray, setSubTopicsArray, mainHolder, secondaryHolder, setWarningEmptyTopic }) => {
  const [ temporalTopicPictureUrl, setTemporalTopicPictureUrl ] = useState(null)
  const [ localTopicTitle, setLocalTopicTitle ] = useState("")
  const [ showUrlInput, setShowUrlInput ] = useState(false)
  const [ localTopic, setLocalTopic ] = useState("")
  
  const addTopic =()=>{
    let subLocalArray = []
    if(subTopicsArray) subLocalArray = subTopicsArray
      if(localTopic){
        if(showUrlInput){
           let local_url = {'path' : temporalTopicPictureUrl }
           subLocalArray.push({titulo:localTopicTitle, contenido:localTopic, pictureUrl:local_url})
        } else {
          subLocalArray.push({titulo:localTopicTitle, contenido:localTopic, pictureUrl:temporalTopicPictureUrl})
        }
        setSubTopicsArray(subLocalArray) 
        setSubTopicsAmount(subTopicsArray.length)
        setLocalTopicTitle('') 
        setLocalTopic('')
        setTopicAdded(true)
        setShowUrlInput(false)
        setTemporalTopicPictureUrl(null)
          
      } else {
        setWarningEmptyTopic(true)
      }
  }

  return (
    <>
    <Text style={styles.subTopicsAddedStyle}> Secondary titles will be at the top of the content </Text>
      <View style={{marginTop:10}} />
        <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => {setLocalTopicTitle(text)} }
                value={localTopicTitle}
            // editable={!loading}
                underlineColorAndroid="transparent"
                placeholder={secondaryHolder}
        />
        <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => { setLocalTopic(text)} }
                value={localTopic}
            // editable={!loading}
                underlineColorAndroid="transparent"
                placeholder={mainHolder}
        /> 
        <View style={{flexDirection:'row'}} >
          <View style={{top:5}}>
          <Text style={styles.subTopicsAddedStyle}>{subTopicsAmount} Topics added </Text>
        </View>
         <TouchableOpacity onPress={()=>{}} >
          <MaterialCommunityIcons style={{left:40}}  name={'delete'} size={26} color="red" />
         </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', left:135, top:10, marginBottom:20}} >
          <View style={{flexDirection:'column' }} >
            <View style={{flexDirection:'row'}} >
              <Text style={styles.dateText} >Topic Picture </Text>
              { !showUrlInput &&
              <>
              <TouchableOpacity style={{left:30}} onPress={()=> lauchCameraOrLibrary("NewItem", setTemporalTopicPictureUrl, 'Pending Homeworks', null, '' ,'',setShowUrlInput) }>
                    <EvilIcons name={'camera'} size={40} color="#05AE00" />
                </TouchableOpacity>

              </>
              } 
            </View>
            { showUrlInput &&
                <TextInput
                style={styles.UrlInputStyle}
                onChangeText={(text) => {setTemporalTopicPictureUrl(text)} }
                value={temporalTopicPictureUrl}
             // editable={!loading}
                underlineColorAndroid="transparent"
                placeholder={'Picture Url'}
              />
            }
            <Text style={styles.topicPicture} > {'Pictures will be at the bottom of the content'} </Text>
          </View>
    

      </View>

      <View style={{marginTop:20}}  />
        <View style={{alignItems:'flex-end', right:30, marginBottom:20, marginTop:10, flexDirection:'column'}} >
          <TouchableOpacity  style={{right:10}} onPress={()=>{addTopic()} }>
                  <Foundation  name={'page-add'} size={40} color="#05AE00" />
          </TouchableOpacity>
        <Text style={styles.addTopicButtonStyle} >Add Topic</Text>
      </View>
    </>
  )
}

export default SubTopicsDescription

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#EAFFE9",
},
box:{
    width:'85%',
    height: 550,
    backgroundColor:'#BFFFBC',
    alignSelf:'center',
    borderRadius:10,
    marginTop:25,
    alignItems:'center',
    elevation:5
  },
text:{
    fontSize:16,
    color:'#616161',
    fontWeight:'bold',
    right:100,
},
dateText:{
    fontSize:16,
    color:'#616161',
    fontWeight:'bold',
    right:100,
    top:5   
},
wordsText:{
    fontSize:16,
    color:'#616161',
    fontWeight:'bold',
    top:8,
    left:25
},
textDescription:{
    fontSize:16,
    color:'#616161',
    fontWeight:'bold',
    alignSelf:'flex-start',
    left:30,
    top:10
},
subInfoText:{
    fontSize:14,
    fontStyle:'italic',
    alignSelf:'flex-start',
    left:-65
},
textObligatory:{
    fontSize:14,
    fontStyle:'italic',
    top:10
},
topicPicture:{
    fontSize:13,
    fontStyle:'italic',
    top:5,
    right:103
},
textObligatorySecondary:{
    fontSize:14,
    fontStyle:'italic',
    bottom:18
},
addTopicButtonStyle:{
    fontSize:14,
    fontStyle:'normal',
    fontWeight:'bold'
  },
  textInputStyle: {
    width:'80%',
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#06CF00',
    backgroundColor: '#F4F4F4',
    alignSelf:'center',
    borderRadius:5,
    marginTop:0
  },
  UrlInputStyle: {
    width:'105%',
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#06CF00',
    backgroundColor: '#F4F4F4',
    borderRadius:5,
    marginTop:20,
    left:-105
  },
  subTopicsAddedStyle:{
      fontSize:13,
      fontStyle:'italic',
      marginBottom:5,
      left:30,
  },
  subTopicsAddedStyle:{
    fontSize:13,
    fontStyle:'italic',
    alignSelf:'flex-start',
    left:30
},
})
