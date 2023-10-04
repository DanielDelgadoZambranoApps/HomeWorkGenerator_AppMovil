import AsyncStorage from '@react-native-async-storage/async-storage'

export const GetSpecificValueFromAsyncStorage = async (key=null, setData) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value) {
        // console.log("El contenido en el AsyncStorage para "+ key + " es " +  JSON.parse( value) )
        if(setData){
          setData( JSON.parse( value) )
        }
        return  JSON.parse( value)
      }else{
        console.log("No existe contenido en el AsyncStorage para "+ key )
        return null
      }
    } catch (error) {
      console.log( " No se pudo realizar la buesqueda de "+ key + " en el AsyncStorage")
    }
  }

  export const SaveInStorage = async (key=null, value)=> {
    try{    
        if(key && value){
            await AsyncStorage.setItem(key, JSON.stringify(value))
            console.log(key + " saved sussesfully !")
        }   
    }catch(error){
        console.log(error)
    }
}