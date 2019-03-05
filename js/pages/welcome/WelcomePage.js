/**
 * Created by robin on 2019/3/5
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import NavigationUtil from "../../navigator/utils/NavigationUtil";
export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            const params = {
                navigation: this.props.navigation
            };
            NavigationUtil.goPage(params, 'Home')
        }, 200)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>WelcomePage</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
