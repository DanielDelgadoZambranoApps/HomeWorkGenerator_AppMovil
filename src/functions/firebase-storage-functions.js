import storage from '@react-native-firebase/storage'
import { downloadImage } from '../functions/general-functions'

import { SaveInStorage, GetSpecificValueFromAsyncStorage } from '../storage/storage-functions'

export function uploadImageToStorage  (pathMain, userID,filename, setUpdate, update, userMail ) {
    let reference
    reference = storage().ref('Usuarios' + "/" + userMail + "/" + filename); // linea de los dioses
    let task =  reference.putFile( pathMain );
     task.then(() => {
        console.log('Image uploaded to the bucket!');
        setUpdate(!update)

    }).catch((e) => {
        console.log('uploading image error => ', e)
    })
}

export const getFullStorageItemPath = async (userID, setProfilePicUrl, setLoading) => {
    const url = await storage().ref('Usuarios' + '/' + userID + "/" + 'ProfilePic').getDownloadURL().catch((e) => {
       //  console.error(e);
        console.log("no hay picture from the user")
        if (setLoading) setLoading(false)
     //   if(url)setProfilePicUrl(url)
      })
      if(url){
        setProfilePicUrl(url)
      }    
      if (setLoading) setLoading(false)
  }

  export const getFullUrlAndDownload = async (collection='', itemID, fileName) => {
    const url = await storage().ref(collection + '/' + itemID + "/" + fileName).getDownloadURL().catch((e) => {
        console.error("super error -->" + e);
      })
      console.log("descargando ------------> " + JSON.stringify(url))
      if(url)downloadImage(url)
  }
  
  export const listFilesAndDirectoriesGeneric = async (pageToken, collection="", id="", setListData) => {
    const reference = storage().ref(collection + '/' + id );
    await reference.list({ pageToken }).then((result) => {
      result.items.forEach((ref) => {
      })
      if(result.items)setListData(result.items)
       console.log("result['_items'].length ---------------> " + result['_items'].length)
      if(result['_items'].length>0){
        return true
      } 
        return false
    });
  }


  export const getFullStorageItemPathAlternative = async (collection='', itemID, fileName, imagesUrlsArray, setIsLoading=null) => {
    const url = await storage().ref(collection + '/' + itemID + "/" + fileName).getDownloadURL().catch((e) => {
        console.error(e);
      })
      console.log("pusheando ------------> ")
      imagesUrlsArray.push({url:url}) 
      if(setIsLoading) setIsLoading(false)
      
  }

export const getUrl = async (setUrl) => {
  const url = await storage().ref('Loading_Animation/animation.gif').getDownloadURL().catch((e) => {
      //  console.error(e);
      console.log("no hay picture from the user")
      if (setLoading) setLoading(false)
    //   if(url)setProfilePicUrl(url)
    })
    if(url)setUrl(url)   
}

export const DownloadAllPictures = async (collection, itemId, pageToken="", setDownload, setDownloading) => {
  setDownloading(true)
  const reference = storage().ref(collection + '/' + itemId );
  await reference.list({ pageToken }).then((result) => {
    result.items.forEach((ref) => {
    })

    if(result['_items'].length>0) { 
      let filename 
      for (const subitem of result['_items']){
        console.log(" subitem -------------> " + subitem )
        filename = subitem.path.substring(subitem.path.lastIndexOf('/') ) // + 1 ????
        getFullUrlAndDownload(collection, itemId, filename)
      } 
      if(setDownload) setDownload(true)
      return true
    } 
      return false
  });
}

export const DeletetePictures  =async (pageToken="", collection, id)=>{
  const reference = storage().ref(collection + '/' + id )
    await reference.list({ pageToken }).then((result) => {
      result.items.forEach((ref) => {
      ref.delete()
      console.log('Foto Eliminadas del Storage exitosamente ') 
      })    
    }
  )
}


export const SaveRecentPictures = async (collection, itemId, pageToken="") => {
  const reference = storage().ref(collection + '/' + itemId );
  await reference.list({ pageToken }).then((result) => {
    result.items.forEach((ref) => {
    })

    if(result['_items'].length>0) { 
      let filename 
      let imagesArray = []
      for (const subitem of result['_items']){
        filename = subitem.path.substring(subitem.path.lastIndexOf('/') ) // + 1 ???
        getFullUrlAndSaveRecentPictures(collection, itemId, filename, imagesArray )
      } 
    } 
  });
}