import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'

const WarningAlert = ({ status, setStatus, description, cancelButton=false, mainTitle="Warning ... !" }) => {
  return (
    <>
        <AwesomeAlert
            show={status}
            showProgress={false}
            title={mainTitle}
            message={description}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={cancelButton}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Confirm"
            confirmButtonColor="#06CF00"
            onConfirmPressed={() => {
            console.log("confirm presed")
            setStatus(false)
            }} 
        />
    </>
  )
}
export default WarningAlert
