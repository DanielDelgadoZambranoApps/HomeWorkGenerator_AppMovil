import ImagePicker from 'react-native-image-crop-picker'
import firestore from '@react-native-firebase/firestore'
import NetInfo from "@react-native-community/netinfo"
import ImgToBase64 from 'react-native-image-base64';
import RNPrint from 'react-native-print'
import { Alert } from 'react-native'

import { uploadImageToStorage } from './firebase-storage-functions'
import { SaveInStorage } from '../storage/storage-functions'

export const CheckConnectivity = () => {
    return NetInfo.fetch().then((response) => {
      if(response.isConnected === true){
      //  console.log("Hay intenet !!")
      //  console.log("Connection type", response.type)
      //  console.log("Is connected?", response.isConnected)
      //  Alert.alert("Hay Internet !!")
        return true
  
      } else {
      //  console.log("No hay intenet !!")
     //   Alert.alert("No esta conectado a internet ...")
        return false
      }
    })
  } 

  export const lauchCameraOrLibrary = (isProfileImage="", setImages, update=null, setUpdate=null, userID, userMail="nomail", setShowUrlInput)=>{
    Alert.alert( "Choose an Option ", " How do you want to choose the photo?",[{text: "Cancel", onPress: () => { return },
        },{ text: "Select from library", onPress: () => { 
          ChooseProfilePick(isProfileImage, setImages, update, setUpdate, userID, userMail) },},
        { text: "Use Internet Url", onPress: () => {
          setShowUrlInput(true)} ,
        },
      ],{ cancelable: true })}


export const ChooseProfilePick = (isProfileImage="", setImages, update, setUpdate, userID, userMail) => {
  let multiplePictures = false
  let filename
    if(isProfileImage==="Profile") multiplePictures = false
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: false,
    multiple: multiplePictures
  }).then(images => {
    switch(isProfileImage){
      case "Profile":
       // SaveInStorage('ProfilePicturePath', images.path)
        filename = images.path.substring(images.path.lastIndexOf('/') + 1)
        uploadImageToStorage(images.path, userID, filename, setUpdate, update, userMail)
        
      break
      case "NewItem":
          setImages(images)
      break
      default:
      break
    }
  })
}

export const TakeProfilePick = (isProfileImage, setImages, update, setUpdate, userMail) => {
  let multiplePictures = false
  let filename
    if(isProfileImage==="Profile") multiplePictures = false
    ImagePicker.openCamera({
      width: 300,          
      height: 400,          
      cropping: false,      
      multiple:multiplePictures,
    }).then(image => {
    switch(isProfileImage){
      case "Profile":
        SaveInStorage('ProfilePicturePath', image.path)
        filename = image.path.substring(image.path.lastIndexOf('/') + 1)
        uploadImageToStorage(image.path, userID, filename,setUpdate, update, userMail)
       
      break
      case "NewItem":
        let imagesArray=[]
            imagesArray.push(image) 
            setImages(imagesArray)
      break
      default:
      break
    }
  })
}

export const SetCurrentUserSpecificInfo = () =>{
    auth().onAuthStateChanged((user) => {
      if(user){
        SaveInStorage('id', user.uid)
        SaveInStorage('userCompleteName', user.displayName)
        SaveInStorage('email', user.email)
    }})
}

export const checkWords =(imageDescription)=> {
  var value = imageDescription.includes("naked"&"porn"&&"porno"&&"nude"&&"nudes"&&"sex"&&"dick"&&"pussy"&&
                                        "Porn"&&"Porno"&&"Nude"&&"Nudes"&&"Sex"&&"Dick"&&"Pussy"&&"Naked")
  return vAll_Generated_Texts
}

export const GenerateProductionPDF = async (item, currentHomework, userMail )=>{
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

  // '<h3 align="center" > </h3>'+
  if(item['authors'].length >0)total_characters = total_characters - 4* item['authors'].length +2

   for(const current_Text_Generated of item['All_Generated_Texts']) {
    
      if(another_flag){
        if(item['subTopicsArray'][super_index]['titulo'].length>0){
          Generated_Texts = Generated_Texts + '<h3>' +item['subTopicsArray'][super_index]['titulo'] + '</h3>'
          if (item['subTopicsArray'][super_index]['pictureUrl']){
            if(item['subTopicsArray'][super_index]['pictureUrl']['path']){
              console.log("1.moscow --------------> " + JSON.stringify(item['subTopicsArray'][super_index]['pictureUrl']['path']))
              
              ImgToBase64.getBase64String(item['subTopicsArray'][super_index]['pictureUrl']['path'])
              .then(base64String => {
                   // Send the base64String to server
                   temporadaImageData = base64String
               })
              .catch(err => console.log(err))
             
            } else {
              console.log("2.moscow --------------> " + JSON.stringify(item['subTopicsArray'][super_index]['pictureUrl']))
s
            }
            console.log("che gevcarea ----> " + JSON.stringify(temporadaImageData))
          }
        } else{
        }
       // console.log("item['subTopicsArray']['title'] ---------> " + item['subTopicsArray'][super_index]['titulo'])
        super_index = super_index + 1
      } else{
        Generated_Texts = Generated_Texts + '<h3>Introduction </h3>'
      }
      Generated_Texts = Generated_Texts + '<h6>'+  current_Text_Generated + '</h6>'
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


    '<img src="data:image/png;base64,'+ temporadaImageData +'"  width="100%" height="90%"  />"'+
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
