
import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import Storage from './service/Storage';
import api from './service/api';
import loading from './animations/loading.json';
import LottieView from 'lottie-react-native';

export default function AuthLoadingScreen({ navigation }) {
    useEffect(() => {
        const _bootstrapAsync = async () => {
            const user = await Storage._retrieveUser();
            if (user && user.isLoggedIn) {
                api.post('/is-logged-in', null, {
                    headers: {
                        token: user.sessionId
                    }
                }).then(async data => {
                    if (data.data.status) {
                        const usr = await Storage._retrieveUser();
                        api.get('/update-calendar', {
                            headers: {
                                token: usr.sessionId
                            }
                        }).then(async response => {
                            if (response.data.status) {
                                navigation.navigate('App');
                            } else {
                                await Storage._storeError();
                                navigation.navigate('Auth', { error: true });
                            }
                        }, async err => {
                            console.log('123457', err)
                            await Storage._storeError();
                            navigation.navigate('Auth', { error: true });
                        });
                    } else {
                        navigation.navigate('Auth');
                    }
                });
            } else {
                navigation.navigate('Auth');
            }
        };
        _bootstrapAsync();
    })
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <LottieView
                autoPlay
                loop
                source={loading}
            />
            <StatusBar barStyle="default" />
        </View>
    );
}

