import { AsyncStorage } from 'react-native';

const userKey = 'com.fgvhelper.user';
const errorKey = 'com.fgvhelper.error';
const Storage = {
    _storeUser: async (obj) => {
        try {
            await AsyncStorage.setItem(userKey, JSON.stringify(obj));
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    },
    _removeUser: async () => {
        try {
            await AsyncStorage.setItem(userKey, null);
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    },
    _retrieveUser: async () => {
        try {
            return JSON.parse(await AsyncStorage.getItem(userKey));
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    },
    _storeError: async () => {
        try {
            await AsyncStorage.setItem(errorKey, JSON.stringify(true));
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    },
    _removeError: async () => {
        try {
            await AsyncStorage.setItem(errorKey, JSON.stringify(false));
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    },
    _retrieveError: async () => {
        try {
            return JSON.parse(await AsyncStorage.getItem(errorKey));
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }
}
export default Storage;