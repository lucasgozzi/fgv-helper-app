import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import MainStyles from './MainStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Storage from './service/Storage';
import api from './service/api';


export default function Header(props) {
    const [menuVisible, setMenuVisible] = useState(false);
    const { text } = props;
    const { navigation } = props;
    const { refreshScreen } = props;

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.headerText}>{text}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                setMenuVisible(!menuVisible);
            }}>
                <MaterialIcons name="account-circle" style={[styles.icon]} size={40} color={MainStyles.variables.primary} ></MaterialIcons>
            </TouchableOpacity>
            {menuVisible && (<View style={styles.menu}>
                <TouchableOpacity onPress={async () => {
                    let usr = await Storage._retrieveUser();
                    Storage._storeUser({
                        isLoggedIn: false,
                        password: usr.password,
                        sessionId: usr.sessionId,
                        user: usr.user
                    });
                    navigation.navigate('Auth');
                }}><Text style={styles.menuItem}>Logout</Text></TouchableOpacity>
            </View>)}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    titleContainer: {
        width: Math.round(Dimensions.get('window').width) - 80,
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        fontSize: 20,
        color: MainStyles.variables.primary
    },
    icon: {
        flex: 1
    },
    menu: {
        width: 100,
        position: "absolute",
        right: 0,
        top: 40,
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 10
    },
    menuItem: {
        fontSize: 19,
        marginBottom: 10
    }
});
