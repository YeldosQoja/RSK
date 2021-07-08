import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async(key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch(err) {
        console.log('Error occured while getting item', err)
    }
}

export const setData = async(key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch(err) {
        console.log('Error occured while setting item', err)
    }
}