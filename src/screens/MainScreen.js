import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native"

import { BannerAd, TestIds, InterstitialAd, AdEventType  } from 'react-native-google-mobile-ads'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CheckBox from '@react-native-community/checkbox'
import DatePicker from 'react-native-date-picker'

import { GenerateHomeWork, isDatabaseAvailable } from '../functions/firebase-firestore-funtions'
import { GetSpecificValueFromAsyncStorage } from "../storage/storage-functions"
import { lauchCameraOrLibrary } from '../functions/general-functions'

import SubTopicsDescription from '../components/SubTopicsDescription'
import HomeworkDescription from '../components/HomeworkDescription'
import MyButtonAlternative from '../components/MyButtonAlternative'
import SpecialTextInput from '../components/SpecialTextInput'
import AuthorsTextInput from '../components/AuthorsTextInput'
import WarningAlert from '../components/WarningAlert'
import ProgressBar from '../components/ProgressBar'

const MainScreen =()=>{
    const [ warningNoValidNumber, setWarningNoValidNumber ] = useState(false)
    const [ warningEmptyAuthors, setWarningEmptyAuthors ] = useState(false)
    const [ warningEmptyFields, setWarningEmptyFields ] = useState(false)
    const [ successfulRequest, setSuccessfulRequest ] = useState(false)
    const [ warningEmptyTopic, setWarningEmptyTopic] = useState(false)
    const [ subTopicsAmount, setSubTopicsAmount ] = useState(0)
    const [ subTopicsArray, setSubTopicsArray ] = useState([])
    const [ warningServer, setWarningServer ] = useState(false)
    const [ hasFrontPage, setHasFrontPage ] = useState(true)
    const [ contentImage, setContentImage ] = useState(null) // --------------> probar luego de dejar funcional la generacion de pdfs
    const [ frontImages, setFrontImages ] = useState(null)  // ---------------> opcional, al menos por ahora
    const [ totalAuthors, setTotalAuthors ] = useState(0)
    const [ topicAdded, setTopicAdded ] = useState(false)
    const [ frecuency, setFrecuency ] = useState(60000)
    const [ mainTitle, setMainTitle ] = useState("")
    const [ userMail, setUserMail ] = useState(null)
    const [ loading , setLoading ] = useState(false)
    const [ hasDate, setHasDate ] = useState(false)
    const [ authors, setAuthors ] = useState([])
    const [ content, setContent ] = useState(0)

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    let collectionName ='Pending Homeworks'

    useEffect(()=>{
        GetSpecificValueFromAsyncStorage('email', setUserMail)
    },[])

    const changeValue =()=> setHasFrontPage(!hasFrontPage)

    const checkBeforeGenerate = async ()=> {
        const DatabaseAvailable = await isDatabaseAvailable()
        if(DatabaseAvailable){
            if(content){
                if(subTopicsArray.length > 0){
                    GenerateHomeWork(userMail, subTopicsArray, content, authors, hasFrontPage, hasDate, date, mainTitle)
                    setLoading(true)
                } else {
                    setWarningNoValidNumber(true)    
                }
            } else {
                setWarningEmptyFields(true)
            }
        } else {
            setWarningServer(true) 
        }
    }

    const cleanAuthors =()=>{
        setAuthors([])
        setTotalAuthors(0)
    }
    
    return(
        <>
        <View style={styles.container}>
            <View style={styles.box}>
            { !loading ?
                <>
                <ScrollView style={{width:'100%', height:'100%'}}>
                    <View style={{marginTop:10}} />
                    <View style={{left:130 ,flexDirection:'row'}} >
                        <Text style={styles.text} >Front Page               </Text>
                        <CheckBox disabled={false} tintColors={{ true: '#05AE00', false: '#05AE00' }} value={hasFrontPage} onValueChange={(value) => changeValue(value)} />
                    </View>

                    <WarningAlert status={warningServer} setStatus={setWarningServer} description={"Our servers are not available at the moment, please try again later ."} />
                    <WarningAlert status={warningNoValidNumber} setStatus={setWarningNoValidNumber} description={"You must write at least 3 sub-topics ."} />
                    <WarningAlert status={warningEmptyFields} setStatus={setWarningEmptyFields} description={"You must complete obligatory fields ."} />
                    <WarningAlert status={successfulRequest} setStatus={setSuccessfulRequest} mainTitle="Successful request" description={"You Homework has been generated, check your recent documents creen."} />
                    
                    { hasFrontPage &&
                    <>
                    <WarningAlert status={warningEmptyAuthors}  setStatus={setWarningEmptyAuthors} description={"You must write a name ..."} />
                    <SpecialTextInput mainTitle={mainTitle} setMainTitle={setMainTitle} holder={"Homework Title"} /> 
                    <AuthorsTextInput setTotalAuthors={setTotalAuthors} totalAuthors={totalAuthors} authors={authors} setAuthors={setAuthors} holder={"Author(s)"} setWarningEmptyAuthors={setWarningEmptyAuthors} /> 
                        
                        <View style={{flexDirection:'row',top:3, left:100}} >
                            <Text style={styles.subInfoText} > {totalAuthors} authors added </Text>
                            <TouchableOpacity onPress={()=>{cleanAuthors()}} >
                                <AntDesign style={{}}  name={'deleteusergroup'} size={25} color="red" />
                            </TouchableOpacity>
                        </View>

                        <View style={{left:130 ,flexDirection:'row', top:10}} >
                            <Text style={styles.dateText} >  Date                         </Text>
                            <CheckBox disabled={false} tintColors={{ true: '#05AE00', false: '#05AE00' }} value={hasDate} onValueChange={(value) => setOpen(true)} />
                        </View>

                    <DatePicker modal mode='date' open={open} date={date} onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        setHasDate(true)
                        }}
                        onCancel={() => {
                            setHasDate(false) 
                            setOpen(false)  }} />

                            <View style={{flexDirection:'row', left:138, top:12, marginBottom:20}} >
                                <Text style={styles.dateText} >Front Picture        </Text>
                                <TouchableOpacity onPress={()=>{ lauchCameraOrLibrary("NewItem", setFrontImages, collectionName, null)}}>
                                    <EvilIcons name={'camera'} size={40} color="#05AE00" />
                                </TouchableOpacity>
                            </View>
                        </>
                        }
                            <View style={{flexDirection:'row'}} >
                                <Text style={styles.textDescription} >Main Content Description   </Text> 
                                <Text style={styles.textObligatory} >           {'(Obligatory)'}        </Text>
                            </View>
                            <WarningAlert status={warningEmptyTopic}  setStatus={setWarningEmptyTopic} description={"You must describe the topic ..."} />
                           
                            <HomeworkDescription content={content} setContent={setContent} holder={"Summary of the document content"} /> 

                            <View style={{flexDirection:'row', marginBottom:20}} >
                                <Text style={styles.textDescription} >Sub-Topic   </Text> 
                                <Text style={styles.textObligatory} >                  {'(Obligatory, 3 minimum)'} </Text>
                            </View>
                             
                            <SubTopicsDescription setTopicAdded={setTopicAdded} subTopicsAmount={subTopicsAmount} setSubTopicsAmount={setSubTopicsAmount} subTopicsArray={subTopicsArray} setSubTopicsArray={setSubTopicsArray} mainHolder={"Content  (Obligatory) "}  secondaryHolder={"Sub-Title (Optional)"}  setWarningEmptyTopic={setWarningEmptyTopic} /> 
                            <WarningAlert status={topicAdded} mainTitle="Topic added successfully !" setStatus={setTopicAdded} description={" Remember, the greater the number of topics, the longer your task will take to be generated."} />
                            <MyButtonAlternative title={"Generate PDF"} customClick={()=>{ checkBeforeGenerate() }} />

                </ScrollView>
                </>
                :
                <>
                 <ProgressBar frecuency={100} setMainTitle={setMainTitle} setSubTopicsAmount={setSubTopicsAmount} setSubTopicsArray={setSubTopicsArray} setContent={setContent} setLoading={setLoading} setSuccessfulRequest={setSuccessfulRequest} />
                </>
                }
                <View style={{top:80}} >
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
        </View>
        </>
    )
}

export default MainScreen

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
})
