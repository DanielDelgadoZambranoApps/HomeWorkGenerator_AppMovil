import React, { useEffect, useState } from 'react'

import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native'
import ImgToBase64 from 'react-native-image-base64';
import RNPrint from 'react-native-print'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'

import { set_All_Generated_Text } from "../functions/firebase-firestore-funtions"
import { GenerateProductionPDF } from "../functions/general-functions"

const HomeworkGenerator =({item, userMail})=> {
    const [ currentHomework, setCurrentHomework ] = useState('')
    const [ canGeneratePDF, setCanGeneratePDF ] = useState(false)
    const [ finalTitle, setFinalTitle ] = useState('')
    const [ temporaldata, setTemporaldata ] = useState(null)

    useEffect(()=>{
        set_All_Generated_Text(setCurrentHomework, userMail, item)
    },[])
    useEffect(()=>{
      console.log("los ebatles -----------> "  + temporaldata )
  },[])

    useEffect(()=>{
      let temporal_title =""
      let index = 0
      let max = 11
      let show = false

      if(item['All_Generated_Texts'] ){
          if(item['All_Generated_Texts'].length > 0 ) show = true
      }
      
      for(const letra of item['mainTitle']){
        temporal_title = temporal_title + letra
        index = index + 1
  
          if(index > max ){
            temporal_title = temporal_title + "\n" + " " 
            index= 0
        }
      }
      setFinalTitle(temporal_title)
      setCanGeneratePDF(show)
  },[])

  const checkBeforeGeneratePDF=()=>{
    if(canGeneratePDF){
      GenerateProductionPDF2(item, userMail)
    }else {
      Alert.alert( "Error ", "Your homework has arrive to our servers but still procesing, please try again in a few minutes ...",[{text: "Continue", onPress: () => { return },
    },
  ],{ cancelable: true })}
  }

  const GenerateProductionPDF2 = async (item, currentHomework, userMail )=>{
    const fecha = new Date(item['date']['seconds'])
    let newDate = fecha.toString()
    let space_lines = '<br>'+'<br>'+'<br>'+'<br>'+'<br>'+'<br>'+'<br>'+'<br>'+'<br>'+'<br>'+'<br>'+'<br>'
    let total_characters = 49
    let new_space_lines = ''
    let another_index = 0
    let all_authors = ""
    let final_date = ""
    let flag = true
    let index = 0
    let super_index = 0
    let Generated_Texts = ""
    let another_flag = false
    let temporadaImageData =""

    if(item['authors'].length >0)total_characters = total_characters - 4* item['authors'].length +2
  
     for(const current_Text_Generated of item['All_Generated_Texts']) {
      let image64_Data = null
        if(another_flag){
          if(item['subTopicsArray'][super_index]['titulo'].length > 0){
            Generated_Texts = Generated_Texts + '<h3>' +item['subTopicsArray'][super_index]['titulo'] + '</h3>'

            if (item['subTopicsArray'][super_index]['pictureUrl']) {
              if(item['subTopicsArray'][super_index]['pictureUrl']['path']){
                Generated_Texts = Generated_Texts + '<h6>'+  current_Text_Generated + '</h6>'
                await ImgToBase64.getBase64String(item['subTopicsArray'][super_index]['pictureUrl']['path'])
                .then(base64String => {
                     image64_Data=base64String
                 })
                .catch(err => console.log(err))
                Generated_Texts = Generated_Texts +     '<div style="text-align: center;">'+
                '<img   src="data:image/png;base64,'+ image64_Data +'"   width="35%"  />"'+
               '</div>'
              } else {
                console.log("2.moscow --------------> " + JSON.stringify(item['subTopicsArray'][super_index]['pictureUrl']))
              }
            }
          } 
          super_index = super_index + 1
        } else{
          Generated_Texts = Generated_Texts + '<h3>Introduction </h3>'
          Generated_Texts = Generated_Texts + '<h6>'+  current_Text_Generated + '</h6>'
        }

        another_flag=true
     }
  
    for(const name of item['authors'] ){
      if(!flag){
        all_authors = all_authors + name + '<br>'
      } else {
        all_authors = 'Authors : ' + all_authors + name + '<br>'
        flag = false
      }
    }
  
    for(const current_letter of space_lines){
      new_space_lines = new_space_lines + current_letter
      another_index= another_index + 1
      if(another_index > total_characters) break
    }
  
    console.log("item['authors'].length ----------> "  +  total_characters)
    console.log("millones ----------> "  +  new_space_lines)
  
    for(const letra of newDate){
      final_date = final_date + letra
      index = index + 1
      if(index>10){
        break
      }
    }
  
    
  
    await RNPrint.print({
      html:
      '<!doctype html>'+
      '<html lang="en">'+
      '<head>'+
      '<meta charset="utf-8">'+
      '<meta name="viewport" content="width=1024">'+
      '<title>Example 01: No CSS</title>'+
      '</head>'+
      '<body>'+
      '<div id="wrapper">'+
      '<div class="chart">'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<h1 align="center" > ' + item['mainTitle'] + '</h1>'+

   


      
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      new_space_lines +
      '<h3 align="center" > ' + all_authors + '</h3>'+
      '<h3 align="center" >Date :' +  final_date + '</h3>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      '<br>'+
      Generated_Texts +
  
      '<p3 style="text-align:center">Center this text!</p3>' + 
      '<p style="text-align:center">Center this text!</p>' + 
      '<p1 style="text-align:center">Center this text!</p1>' + 
  
  
      '<table  align="center"  id="data-table" border="1" cellpadding="15" cellspacing="10"'+
      'summary="The effects of the zombie outbreak on the populations'+
     
  
      'of endangered species from 2012 to 2016">'+
      
      '<thead>'+
      '<tr>'+
      '<td>&nbsp;</td>'+
      '<h3 align="center" >Produccion medida en Kilogramos </h3>'+
      
      '</tr>'+
      '</tbody>'+
      '</table>'+
      '</div>'+
      '</div>'+
     '</body>'+
     '<br>'+'<br>'+'<br>'+
          '<h4 align="center" >Fecha de Emision :' +  "ninguna po ctm" + '</h4>'+
     '</html>'
    })
  }

  return (
    <>
      <View style={{marginLeft:10, marginTop:20, marginBottom:10}} > 
        <TouchableOpacity onPress={()=>{checkBeforeGeneratePDF()} } > 
          <View style={{left:60}} >
            { false &&
              <Foundation name={'page-export-pdf'} size={40} color={'#FF4A4A'} />
            }
          </View>
          <View style={{ marginBottom:40}} >
            <View style={{alignItems:'center'}} > 
              <FontAwesome name={'book'} size={50} color={'black'} />
            </View>
            <View  style={{marginTop:5}} />
            <Text style={styles.titleStyle} > {finalTitle} </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default HomeworkGenerator

const styles = StyleSheet.create({
    container:{
      flex:1,
       backgroundColor:"#EAFFE9",
       alignItems:'center'
    },
    box:{
      width:'85%',
      height:550,
      backgroundColor:'#BFFFBC',
      alignSelf:'center',
      borderRadius:10,
      marginTop:25,
      alignItems:'center',
      marginBottom:10,
      elevation:5
    },
    image: {
      height: 90,
      width: 90,
      marginLeft:10,
      marginRight:10,
      marginTop:20,
      alignSelf:'center',
      borderRadius:10
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#06CF00',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 150,
      right: 13,
      elevation: 5,
    },
    activityStyle:{
      size:"large",
      marginTop:250
    },
    titleStyle:{
      fontSize:14,
      color:'#616161',
      fontWeight:'bold',
      top:10
  },
  })