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
        console.log('componentDidMount :',this.storeName)
        this.props.onPopularFresh(this.storeName, 1)
    }

    renderItem(data) {
        const item = data.item;
        return (<View>{item}</View>)
    }

    render() {
        const items = this.props.popular[this.storeName];
        console.log('FlatList数据：', items)
        return (
            <View style={styles.container}>
                <FlatList data={items}
                          renderItem={data => this.renderItem(data)}
                />
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