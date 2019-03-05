import React from 'react'
import {createAppContainer, createBottomTabNavigator} from 'react-navigation'

import PopularTopNavigator from "./PopularTopNavigator";
import TrendingPage from "../pages/home/trending/TrendingPage";
import FavoritePage from "../pages/home/favorite/FavoritePage";
import MyPage from "../pages/home/my/MyPage";

import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {BottomTabBar} from "react-navigation-tabs";

const BOTTOM_TABS = {
    Popular: {
        screen: PopularTopNavigator,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons name={'whatshot'}
                               size={26}
                               style={{color: tintColor}}/>
            )
        }
    },
    Trending: {
        screen: TrendingPage,
        navigationOptions:
            {
                tabBarLabel: '趋势',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons name={'md-trending-up'}
                              size={26}
                              style={{color: tintColor}}/>
                )
            }
    },
    Favorite: {
        screen: FavoritePage,
        navigationOptions:
            {
                tabBarLabel: '收藏',
                tabBarIcon: ({tintColor, focused}) => (
                    <MaterialIcons name={'favorite'}
                                   size={26}
                                   style={{color: tintColor}}/>
                )
            }
    },
    My: {
        screen: MyPage,
        navigationOptions:
            {
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor, focused}) => (
                    <Entypo name={'user'}
                            size={26}
                            style={{color: tintColor}}/>
                )
            }
    }
};

const {Popular, Trending, Favorite, My} = BOTTOM_TABS;
const tabs = {Popular, Trending, Favorite, My};//根据需要配置


class TabBarComponent extends React.Component {
    constructor(props) {
        super(props)
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        const {routes, index} = this.props.navigation.state;
        console.log('HomeNavigator-render中接收参数routes,index', routes, index);
        if (routes[index].params) {
            const {theme} = routes[index].params;
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor || this.props.activeTintColor}
        />
    }
}

export default createAppContainer(createBottomTabNavigator(tabs,
    {tabBarComponent: TabBarComponent}
))
