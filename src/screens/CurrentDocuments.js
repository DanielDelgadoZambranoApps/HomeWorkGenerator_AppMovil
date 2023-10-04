import React, { useEffect, useState } from 'react'

import { StyleSheet, View, TouchableOpacity, ActivityIndicator, LogBox, Button, FlatList, Text } from 'react-native'
import { BannerAd, TestIds, InterstitialAd, AdEventType  } from 'react-native-google-mobile-ads'

import Fontisto from 'react-native-vector-icons/Fontisto'
import RNPrint from 'react-native-print'

import { GetSpecificValueFromAsyncStorage } from "../storage/storage-functions"
import { GetHomework } from "../functions/firebase-firestore-funtions"

import SpecialWarningAlert from '../components/SpecialWarningAlert'
import HomeworkGenerator from '../components/HomeworkGenerator'
import WarningAlert from "../components/WarningAlert"
import ProgressBar from '../components/ProgressBar'

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection'])

 const CurrentDocuments = () => {
  const [ warningConnection, setWarningConnection ] = useState(true)
  const [ warningDelete, setWarningDelete ] = useState(false)
  const [ downloading, setDownloading ] = useState(false)
  const [ homeworks , setHomeworks ] = useState(null)
  const [ frecuency, setFrecuency ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ download, setDownload ] = useState(false)
  const [ userMail, setUserMail ] = useState(null)
  const [ update, setUpdate ] = useState(false)
  
  const beforeDelete =() => console.log("realiar funcion para borrar todas las tareas y preguntar antes")

  useEffect(()=>{
    GetSpecificValueFromAsyncStorage('email', setUserMail)
  },[])

  useEffect(()=>{
    if(userMail)  firstHomework()
  },[userMail])

  const firstHomework =()=>{
    if(userMail) GetHomework(userMail, setHomeworks)
  }

  const render =  ({item}) => { 
    return <HomeworkGenerator item={item} userMail={userMail} />
  }

  return (
    <>
      <View style={styles.container}>
        { !downloading ?
          <>
            <View style={styles.box} >
              <SpecialWarningAlert status={warningDelete} cancelButton={true} setStatus={setWarningDelete} description={"Are you sure you want to delete the current images ? "} runFunction={beforeDelete} setUpdate={setUpdate} update={update} />
              <WarningAlert status={!warningConnection} setStatus={setWarningConnection} description={"There is no conection, try again later ."} />
              <WarningAlert status={download} setStatus={setDownload} description={"All the photos are now in your photo library ."} mainTitle={"Download Successful ! "} />
              { homeworks ?
                <FlatList data={homeworks} renderItem={(item) => render(item)}  numColumns={3}  keyExtractor={(item, index) => index.toString()} />
                :
                <ActivityIndicator color="#06CF00" style={styles.activityStyle} />
              }
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>{setWarningDelete(true)} } > 
              <Fontisto name={'trash'} size={30} color={'#ffffff'} />
            </TouchableOpacity>
        </>
        :
        <>
          <ProgressBar frecuency={frecuency} setDownload={setDownload}  hasTop={"65%"}  downloading="Downloading ..." setDownloading={setDownloading} message={"Dowloading ..."}/>
        </>
        }

        <View style={{top:10}} >
          <BannerAd 
                        size={"330x60"} 
                        // size={BannerAdSize.BANNER}  // --> dafault 320x50
                        unitId={TestIds.BANNER} 
                        // unitId={"ca-app-pub-2584779830071009/6515980228"} 
                        // requestOptions={{
                        //   requestNonPersonalizedAdsOnly:true,
                        // }}
                    />
        </View>
      </View>
    </>
  )
}
export default CurrentDocuments

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