import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import Foundation from 'react-native-vector-icons/Foundation'

const MyButtonAlternative2= ( props ) => {
  return (
    <>
    <View style={{width:'75%', height:'100%'}} >
          <TouchableOpacity
            style={styles.button}
            onPress={props.customClick}>
              <Text style={styles.text}>          </Text>
            <Foundation name={'page-export-pdf'} size={30} color={'#ffffff'} />
            <Text style={styles.text}>    {props.title}</Text>
          </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#06CF00',
    color: '#ffffff',
    width:'80%',
    height: 35,
    marginVertical: 10,
    borderRadius:10,
    flexDirection:'row',
    left:80
  },
  text: {
    color: '#ffffff',
    fontSize:16,
    fontWeight:'bold'
  },
})

export default MyButtonAlternative2