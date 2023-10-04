import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
import { SaveInStorage } from '../storage/storage-functions'

const SpecialWarningAlert = ({ status, setStatus, description, cancelButton=false, runFunction, setUpdate, update }) => {
  return (
    <>
        <AwesomeAlert
            show={status}
            showProgress={false}
            title="Warning"
            message={description}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={cancelButton}
            showConfirmButton={true}
            cancelText="Confirm"
            confirmText="No, cancel"
            confirmButtonColor="gray"
            cancelButtonColor='#06CF00'
            onCancelPressed={ async() => {
              console.log("confirm presed")
               await SaveInStorage("currentImages", [])
               runFunction()
               setStatus(false)
               setUpdate(!update)
            }}
            onConfirmPressed={() => {
              setStatus(false)
            }} 
        />
    </>
  )
}
export default SpecialWarningAlert
