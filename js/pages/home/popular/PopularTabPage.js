/**
 * Created by robin on 2019/3/5
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class PopularTabPage extends Component {
    render() {
        const {tabLabel} = this.props;
        return (
            <View style={styles.container}>
                <Text>PopularTabPage</Text>
                <Text>tab参数:{tabLabel}</Text>
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
