import { PermissionsAndroid, Platform } from 'react-native';

const GetWriteExternalStoragePermissions = async () =>{
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Permisos de Almacenamiento",
            message:
              "La aplicacion nesesita permisos para guardar en la memoria",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permisos para guardar en memoria concedidos");
        } else {
          console.log("Memory Write permisses denied");
        }
      } catch (err) {
        console.warn(err);
      }
}

const GetReadExternalStoragePermissions = async () =>{
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Permisos de Almacenamiento",
            message:
              "La aplicacion nesesita permisos para usar la memoria",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permisos para leer memoria concedidos");
        } else {
          console.log("Memory Read permisses denied");
        }
      } catch (err) {
        console.warn(err)
      }
}

const GetCameraPermisssion = async () =>{
  try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permisos de Camara dados concedidos");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
}


const GetWriteStoragePermissions = async  ()=> {      
  try {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'Storage Permission Required',
      message:
        'App needs access to your storage to download Photos',
    }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    // Once user grant the permission start downloading
    console.log('Storage Permission Granted.');
  } else {
    // If permission denied then show alert
    alert('Storage Permission Not Granted');
  }
  } catch (err) {
    // To handle permission related exception
    console.warn(err);
  }

}


export const GetAllPermissions = async () =>{
    if (!(Platform.OS === 'ios')) {
      await GetWriteExternalStoragePermissions()
      await GetReadExternalStoragePermissions()
      GetWriteStoragePermissions()
      await GetCameraPermisssion()
  }
}