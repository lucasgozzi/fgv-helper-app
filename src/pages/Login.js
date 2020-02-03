import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, TextInput, Button } from 'react-native';
import MainStyles from '../MainStyles';
import api from '../service/api';
import Storage from '../service/Storage';


export default function Login({ navigation }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getUser() {
            const user = await Storage._retrieveUser();
            const error = await Storage._retrieveError();
            await Storage._removeError();
            setError(error);
            if (user) {
                setLogin(user.user);
                setPassword(user.password);
            }
        }
        getUser();
    }, [])

    return (
        <SafeAreaView style={MainStyles.styles.content}>
            <View style={styles.logo}>
                <Image source={require('../../assets/logo.png')}></Image>
            </View>
            {error && (<Text style={styles.error}>Erro ao pegar as informações da sua conta</Text>)}
            <View style={styles.center}>
                <View style={styles.boxLogin}>
                    <Text style={styles.label}>Usuário FGV:</Text>
                    <TextInput
                        style={[styles.input]}
                        value={login} onChange={(str) => setLogin(str.nativeEvent.text)}></TextInput>
                    <Text style={styles.label}>Senha FGV:</Text>
                    <TextInput secureTextEntry={true}
                        style={[styles.input]}
                        value={password} onChange={(str) => setPassword(str.nativeEvent.text)}></TextInput>

                    <Button title="Enviar" color={MainStyles.variables.secondary} style={styles.button}
                        onPress={async () => {
                            api.post('/login', { user: login.toLowerCase(), password }).then(async (val) => {
                                if (val.data.status) {
                                    await Storage._storeUser({
                                        user: login.toLowerCase(), password,
                                        sessionId: val.data.sessionId,
                                        isLoggedIn: true
                                    });
                                    navigation.navigate('AuthLoading');
                                }
                            },
                                rej => {
                                    console.log('rej', rej);

                                })
                        }}
                    ></Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    error:
    {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#F00"
    },
    logo: {
        height: '18%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    boxLogin: {
        width: '80%',
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 30,

        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 5,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    label: {
        fontSize: 20
    },
    input: {
        marginBottom: 20,
        backgroundColor: MainStyles.variables.default,
        borderRadius: 5,
        marginTop: 5,
        fontSize: 20,
        height: 40,
        padding: 5
    }
});
