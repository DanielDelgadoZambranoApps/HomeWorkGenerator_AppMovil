import React from 'react'
import { Picker } from '@react-native-picker/picker'

const SpecialPicker = ({pictures, setPictures, setWarningTime}) => {
  return (
    <>
        <Picker 
            selectedValue={pictures}
            style={{ height: 50, width:'40%' }}
            onValueChange={(value, itemIndex) =>{
              setPictures(value)
              if(value >5) setWarningTime(true)
              }}>
                <Picker.Item label="5 Photos" value={5} color="gray" /> 
                <Picker.Item label="10 Photos" value={10} color="gray" /> 
                <Picker.Item label="15 Photos" value={15} color="gray" /> 
                <Picker.Item label="20 Photos" value={20} color="gray" /> 
        </Picker>
    </>
  )
}

export default SpecialPicker