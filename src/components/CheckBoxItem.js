import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import CheckBox from '@react-native-community/checkbox';

 const CheckBoxItem = ({item, setContactsArray, contactsArray, MyuserID}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  
  const addContact = (value) =>{
    let localArray = contactsArray
    let localArray2 = []
    
    if(!toggleCheckBox){
      localArray.push(item['item'].userID)
      setContactsArray(localArray)

    } else {
      
      for(const subItem of localArray){
        if(! (subItem === item['item'].userID)){
          localArray2.push(subItem)
        }
      }
      setContactsArray(localArray2)
    }
    setToggleCheckBox(!toggleCheckBox)
  }


  return (
    <>
      <TouchableOpacity style={{left:'85%', bottom:'40%'}} >
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(value) => addContact(value)}
          />
      </TouchableOpacity>
    </>
  )
}

export default CheckBoxItem

const styles = StyleSheet.create({})