import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const HomeworkDescription = ({ content,  setContent, holder }) => {
 
  return (
    <>
        <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => {setContent(text)} }
                value={content}
             // editable={!loading}
                underlineColorAndroid="transparent"
                placeholder={holder}
        />
    </>
  )
}

export default HomeworkDescription

const styles = StyleSheet.create({
    textInputStyle: {
      width:'80%',
      height: 50,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#06CF00',
      backgroundColor: '#F4F4F4',
      alignSelf:'center',
      borderRadius:5,
      marginTop:30
    }
  })
  
  