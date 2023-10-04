import { Alert } from "react-native"
import auth from "@react-native-firebase/auth"

//import { GetSpecificValueFromAsyncStorage, SaveInStorage } from "../storage/storage-functions"
import { CheckConnectivity, SetCurrentUserSpecificInfo } from "./general-functions"
import { createUserIniatialDataInFirebase } from "./firebase-firestore-funtions"
import { GetAllPermissions} from "./permission-functions"

export const LoginAuthentification = (email, password, navigation, setErrortext, dispatch=null) => {
   if (CheckConnectivity()){
      setErrortext("")
        if (!email) {
          Alert.alert("Error", "Complete su correo electronico",
          [{ text: "Continuar", onPress: () => { return null }}],{ cancelable: false })
          return
        }
        if (!password) {
          Alert.alert("Error ", "Ingrese su contraseña",
          [{ text: "Continuar", onPress: () => { return null }}],{ cancelable: false })
          return
        }
         auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            console.log(user)
            navigation.navigate('ImageGenerator')
            GetAllPermissions()
            SetCurrentUserSpecificInfo()
          })
          .catch((error) => {
            console.log(error);
            if (error.code === "auth/invalid-email") {
              setErrortext(error.message);
              console.log("error 1 --> " + error.message)
            }
            else if (error.code === "auth/user-not-found"){
              setErrortext("El usuario no existe ...")
              console.log("error 2 --> " + error.message)
            }
            else if (error.code === 'auth/wrong-password'){
              setErrortext("Contraseña incorrecta, intentelo nuevamente ...")}
              console.log("error 3 --> " + error.message)
            })
     } else {
      Alert.alert("No hay Conexion ...", " ", [{ text: "Continuar", onPress: () => {return null}}])
    } 
  }


  export const RegisterInFirebase = (userName, email, password, setErrortext, navigation) => {
    if(CheckConnectivity()){
      setErrortext("");
      if (!userName || !email || !password){
        Alert.alert("Error", "Complete todos los campos",
                  [{ text: "Continuar", onPress: () => { return null }}],{ cancelable: false })
      } else {
        auth().createUserWithEmailAndPassword( email, password).then((user) => {

          if (user) {
            auth().currentUser.updateProfile({ displayName: userName, photoURL:"https://aboutreact.com/profile.png"})
              .then(() =>{
              // navigation.navigate("ImageGenerator")
                navigation.navigate("DrawerNavigator")
                Alert.alert("Bienvenido", "Registro realizado con exito !",
                  [{ text: "Continuar", onPress: () => { return null }}],{ cancelable: false })
                  createUserIniatialDataInFirebase(user, userName)
                } )
                .catch((error) => {
                alert(error);
                console.error(error)
              })
            }

          GetAllPermissions()
          SetCurrentUserSpecificInfo()
          
          Alert.alert("Bienvenido", "Registro realizado con exito !",
          [{ text: "Continuar", onPress: () => { return null }}],{ cancelable: false })
          createUserIniatialDataInFirebase(user, userName)
          })
          .catch((error) => {
          console.log(error);
          if (error.code === "auth/email-already-in-use") {
            setErrortext("Existe una cuenta asosiada a este correo !")
            Alert.alert("Correo en uso !")
          } else {
            setErrortext(error.message);
    }})}
    } else {
      Alert.alert("No hay Conexion ...", " ", [{ text: "Continuar", onPress: () => {return null}}])
    }
  }

  export const IsLogin = (setUser) =>{
    const subscriber = auth().onAuthStateChanged((user) => {
        console.log("user", JSON.stringify(user));
        if(setUser)setUser(user);
    })
      return subscriber;
}

export const GetCurrentSpecificInfo = (userValue, setFunction) =>{
  auth().onAuthStateChanged((user) => {
    if(user){
      switch(userValue){
        case 'id':
          setFunction(user.uid)
        break
        case 'userCompleteName':
          setFunction(user.displayName)
        break
        case 'email':
          setFunction(user.email)
        break
      }
    }
  })
}

export const Logout = (navigation) => {
  Alert.alert("Alerta ", "¿Esta seguro que desea cerrar sesion ?",[{text: "Cancelar", onPress: () => {return null;},}
      ,{ text: "Confirmar", onPress: () => { auth().signOut().then(() => navigation.navigate("LoginScreen"))
            .catch((error) => {console.log(error);
              if (error.code === "auth/no-current-user"){
                navigation.replace("LoginScreen");
              }
              else alert(error);
            });
        },
      },
    ],
    { cancelable: false }
  )
}
  
  