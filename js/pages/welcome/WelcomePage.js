/**
 * Created by robin on 2019/3/5
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from 'react-native';
import NavigationUtil from "../../navigator/utils/NavigationUtil";
export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            const params = {
                navigation: this.props.navigation
            };
            NavigationUtil.goPage(params, 'Home')
        })
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Text>Hello</Text>
            </View>
            // {/*<ImageBackground style={styles.container}*/}
            //                  {/*source={require('../../../assets/images/github_cat.jpg')}>*/}
            // {/*</ImageBackground>*/}
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
