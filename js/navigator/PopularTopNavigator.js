import React from 'react'
import {createAppContainer, createMaterialTopTabNavigator} from 'react-navigation'
import {
    StyleSheet,
} from 'react-native';
import PopularTabPage from '../pages/home/popular/PopularTabPage'


const TOP_TABS_NAMES = ['Java', 'Android', 'Ios', 'React', 'React Native', 'Vue'];

function genTabs() {
    const tabs = {};
    TOP_TABS_NAMES.forEach((item, index) => {
        tabs[`tab${index}`] = {
            screen: props => <PopularTabPage {...props} storeName={item}/>,
            navigationOptions: {
                title: item,
            }
        }
    });
    return tabs;
}

//样式必须放在这里，比较难看
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabStyle: {
        minWidth: 50
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6
    }
});

export default createAppContainer(createMaterialTopTabNavigator(genTabs(), {
        tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,
            scrollEnabled: true,//可以滚动，很重要属性
            style: {
                backgroundColor: '#678'
            },
            indicatorStyle: styles.indicatorStyle,//标签指示器样式
            labelStyle: styles.labelStyle
        }
    }
))




