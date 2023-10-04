import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const SpecialTextInput = ({mainTitle,  setMainTitle, holder }) => {

  return (
    <>
        <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => {setMainTitle(text)} }
            value={mainTitle}
           // editable={!loading}
            underlineColorAndroid="transparent"
            placeholder={holder}
        />
    </>
  )
}

export default SpecialTextInput

const styles = StyleSheet.create({
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
    }
  })
  
  