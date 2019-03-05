import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    Text,
    View
} from 'react-native';

export default class MyPage extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>MyPage</Text>
                <Button title='改变主题色'
                        onPress={() => {
                            const params = {
                                theme: {
                                    tintColor: 'red',
                                    updateTime: new Date().getTime()
                                }
                            };
                            console.log('MyPage-路由设置参数：', params);
                            navigation.setParams(params)
                        }}/>
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
