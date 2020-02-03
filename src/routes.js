import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainStyles from './MainStyles';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import AuthLoadingScreen from './AuthLoadingScreen';

const LoggedRoutes = createStackNavigator({
    Calendar: {
        screen: Calendar,
    }
}, {
    defaultNavigationOptions: {
        headerTintColor: MainStyles.variables.primary,
    }
});

const UnloggedRoutes = createStackNavigator({
    Login: { screen: Login }
}, {
    defaultNavigationOptions: {
        headerShown: false
    }
});

const Routes = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: LoggedRoutes,
        Auth: UnloggedRoutes,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

export default Routes;