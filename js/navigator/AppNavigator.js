import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation'
import WelcomePage from "../pages/welcome/WelcomePage";
import HomeNavigator from "./HomeBottomNavigator";


const WelcomeStack = createStackNavigator({
    Welcome: {
        screen: WelcomePage,
        navigationOptions: {
            header: null//欢迎页全屏
        }
    }
});
const HomeStack = createStackNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            header: null//主页全屏
        }
    }
});
export default createAppContainer(createSwitchNavigator(
    {
        Welcome: WelcomeStack,
        Home: HomeStack
    },
    {
        initialRouteName: 'Welcome'
    }
))
