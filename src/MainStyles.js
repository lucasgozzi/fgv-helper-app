
import { StyleSheet } from 'react-native';

const variables = {
    primary: "#035D91",
    secondary: "#0079BC",
    default: "#BFBFBF"
};

const MainStyles = {
    styles: StyleSheet.create({
        content: {
            flex: 1,
            backgroundColor: variables.primary
        },
        displayRow: {
            flexDirection: 'row',
        },
        displayColumn: {
            flexDirection: 'column',
        }
    }),
    variables
};
export default MainStyles;