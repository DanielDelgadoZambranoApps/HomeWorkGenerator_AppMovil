import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const MyButton = ( props ) => {
  return (
    <>
    <View style={{width:'75%', height:'100%'}} >
          <TouchableOpacity
            style={styles.button}
            onPress={props.customClick}>
              <Text style={styles.text}>   </Text>
            <SimpleLineIcons name={'cloud-download'} size={30} color={'#ffffff'} />
            <Text style={styles.text}>   {props.title}</Text>
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
    width:'50%',
    height: 35,
    marginVertical: 10,
    borderRadius:10,
    alignSelf:'center',
    flexDirection:'row'
  },
  text: {
    color: '#ffffff',
    fontSize:16,
    fontWeight:'bold'
  },
})

export default MyButton;