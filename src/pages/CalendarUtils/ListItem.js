import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainStyles from '../../MainStyles';

// import { Container } from './styles';

export default function ListItem(props) {
    const { event } = props;

    function resolveColor(event) {
        const [day, month, year] = event.date.split('/');
        const curDate = new Date();
        const strDate = `${curDate.getFullYear().toString().padStart(4, '0')}${(curDate.getMonth() + 1).toString().padStart(2, '0')}${(curDate.getDate()).toString().padStart(2, '0')}`
        const otherDate = `${year.padStart(4, '0')}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
        if (strDate > otherDate)
            return { backgroundColor: '#CCC' };
        if (event.type !== 'Aula')
            return { backgroundColor: '#FFD300' };

        return null;
    }
    return (
        <View style={styles.content}>
            <View style={[styles.type, resolveColor(event)]}>
                <Text style={styles.textType}>{event.type}</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.date}>{`${event.date} (${event.dayOfWeek})`}</Text>
                <Text style={styles.hour}>{event.hour}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.class}>{event.class}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    type: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: MainStyles.variables.secondary
    },
    textType: {
        fontSize: 24,
        color: "#FFF"
    },
    content: {
        marginBottom: 10,
        backgroundColor: "#FFF",
    },
    header: {
        width: '100%',
        flexDirection: 'row',
    },
    date: {
        flex: 4,
        fontSize: 16,
        color: MainStyles.variables.primary,
        paddingLeft: 10,
        borderRadius: 5,
        fontSize: 18
    },
    hour: {
        flex: 1,
        backgroundColor: MainStyles.variables.primary,
        color: "#FFF",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold"
    },
    body: {
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#fff"
    },
    class: {
        fontStyle: "italic",
        padding: 5,
        fontSize: 14
    }
});
