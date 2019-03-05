import React, {Component} from 'react';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation'

import PopularPage from "../pages/home/popular/PopularPage";
import TrendingPage from "../pages/home/trending/TrendingPage";
import FavoritePage from "../pages/home/favorite/FavoritePage";
import MyPage from "../pages/home/my/MyPage";

import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BOTTOM_TABS = {
    Popular: {
        screen: PopularPage,
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

export default createAppContainer(createBottomTabNavigator(tabs))
