/**
 * Created by robin on 2019/3/5
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import {connect} from 'react-redux'
import action from '../../../redux/action'

class PopularTabUiPage extends Component {
    constructor(props) {
        super(props);
        const {storeName} = this.props;
        this.storeName = storeName;
    }

    componentDidMount() {
        console.log('componentDidMount :', this.storeName)
        this.props.onPopularFresh(this.storeName, 1)
    }

    renderItem(data) {
        const item = data.item;
        return (
            <View>
                <Text>{item.description}</Text>
            </View>
        )
    }

    render() {
        let data = this.props.popular[this.storeName];
        data = data || {items: []};
        console.log('FlatList数据：', data)
        return (
            <View style={styles.container}>
                <FlatList data={data.items}
                          renderItem={item => this.renderItem(item)}
                          keyExtractor={item => "" + item.id}/>
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

const mapStateToProps = (state) => ({
    popular: state.popular //state.popular是在reducer中定义
});
const mapDispatchToProps = (dispatch) => ({
    onPopularFresh: function () {
        dispatch(action.onPopularFresh(...arguments))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PopularTabUiPage)