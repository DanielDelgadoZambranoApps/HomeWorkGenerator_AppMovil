import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import CheckBoxItem2 from '../components/CheckBoxItem2'

const GroupInfoItem = ({item, setSelectedGroupsArray, selectedGroupsArray}) => {
  return (
    <>
        <View style={styles.container} >
          <View style={{flexDirection:'column' }} >
            <FontAwesome name={'group'} size={30} color="#AFE28A" />
          </View>
            <Text style={styles.groupName} > {item['item'].id} </Text> 
        </View>
        <View style={{ bottom:20}} >
          <CheckBoxItem2 item={item} setContactsArray={setSelectedGroupsArray} contactsArray={selectedGroupsArray}  />
        </View>
    </>

  )
}

export default GroupInfoItem

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex:1,
      marginTop:10,
      marginBottom:10,
      left:10,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      marginRight: 15,
    },
    groupName: {
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft:'10%'
    },
    activityIndicator: {
      alignItems: "center",
      height: 80,
    },
  })
  
  