import React, {Component} from 'react';
import DataStore from '../../../dao/DataStore'
import {
    Platform,
    StyleSheet,
    Button,
    Text,
    View
} from 'react-native';

export default class MyPage extends Component {
    constructor(props) {
        super(props)
        this.dataStore = new DataStore()
    }

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
                <Button title='网络测试'
                        onPress={() => {
                            this.dataStore.fetchData('python', 4).then(data => {
                                console.log('myPage获取数据::', data)
                            }).catch(error => {
                                console.error('myPage报错:', error)
                            })
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
