import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View } from 'react-native';
import MainStyles from '../MainStyles';
import ListItem from './CalendarUtils/ListItem';
import Header from '../Header';
import api from '../service/api';
import Storage from '../service/Storage';

// import { Container } from './styles';

export default function Calendar({ navigation }) {
    Calendar.nav = navigation;
    const [events, setEvents] = useState([]);
    const [lastDateFGV, setlastDateFGV] = useState("");
    const [lastDateMe, setlastDateMe] = useState("");
    Calendar.refreshSchedule = async () => {
        const usr = await Storage._retrieveUser();
        api.get('/get-classes', {
            headers: {
                token: usr.sessionId
            }
        }).then(response => {
            setlastDateFGV(response.data.lastUpdatedByFGV);
            setlastDateMe(response.data.lastUpdatedByMe);
            setEvents(response.data.schedule);
        })
    }
    useEffect(() => {
        Calendar.refreshSchedule();
    }, [])
    let keyIndex = 0;
    return (
        <SafeAreaView>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.header}>Últimas Atualizações:</Text>
            </View>
            <View style={[MainStyles.styles.displayRow, styles.fullWidth]}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.label}>Da FGV: </Text>
                    <Text>{lastDateFGV}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.label}>Do App: </Text>
                    <Text>{lastDateMe}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={events}
                    keyExtractor={() => (keyIndex++).toString()}
                    renderItem={(item) => (<ListItem event={item.item}></ListItem>)}
                    horizontal={false}
                    style={{ marginBottom: 150 }}>
                </FlatList>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    },
    header: {
        fontSize: 24,
        color: MainStyles.variables.primary,
        fontWeight: "bold"
    },
    label: {
        fontSize: 18,
        color: MainStyles.variables.primary,
        fontWeight: "bold"
    },
    container: {
        marginTop: 20,
        marginRight: "5%",
        marginLeft: "5%",
        width: '90%',
        borderRadius: 10
    }
});


Calendar.navigationOptions = {
    headerStyle: {
        backgroundColor: "#FFF"
    },
    headerTitle: () => <Header text={"Calendário"} navigation={Calendar.nav} />,
};