import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import { getFullStorageItemPath } from '../functions/firebase-storage-functions'

const  ChatListenItem = (props)=> {

   const [profilePicUrl, setProfilePicUrl] =useState(null)
   const userName = props['user']['item'].userCompleteName
   const contactID = props['user']['item'].userID
   const [loading, setLoading] = useState(true)
   const [iconSize, setIconSize] = useState('72%')

   useEffect(()=>{
    getFullStorageItemPath(contactID, setProfilePicUrl, setLoading) 
   },[props['superUpdate']])

  return (
        <View style={styles.container} >

          { loading ?
          <>
            <ActivityIndicator color="#4FAB1C"size="large" style={styles.activityIndicator}/>
          </> 
          : 
          <>
            { profilePicUrl ?
              <>
                <Image source={{uri:profilePicUrl}} style={styles.avatar} />
              </>
              :
              <>
                <Image source={require("../../assets/ProfilePic.png")} style={styles.avatar} />
              </>
            }
          </>
          }
            <View style={styles.midContainer} >
                <Text style={styles.username} > {userName} </Text>
                  <View style={{  marginLeft:iconSize, bottom:15}} >
                    <Entypo name={'chat'} size={30} color="#AFE28A" />
                  </View>
            </View>
        </View>
      )
}

export default ChatListenItem


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex:1,
    marginTop:10,
    marginBottom:10,
    left:10
  },
  midContainer: {
    justifyContent: 'space-around'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
})

