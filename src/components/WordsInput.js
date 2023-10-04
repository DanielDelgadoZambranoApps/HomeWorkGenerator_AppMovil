import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const WordsInput = ({ data,  setData, holder }) => {
  return (
    <>
        <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => {setData(text)} }
                value={data}
            // editable={!loading}
                underlineColorAndroid="transparent"
                placeholder={holder}
            />
    

    </>
  )
}

export default WordsInput

const styles = StyleSheet.create({
    textInputStyle: {
      width:'42%',
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#06CF00',
      backgroundColor: '#F4F4F4',
      alignSelf:'center',
      borderRadius:5,
      left:20
    }
  })
  
  