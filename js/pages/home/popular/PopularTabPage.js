/**
 * Created by robin on 2019/3/5
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux'
import action from '../../../redux/action'
import ListItem from "../../common/ListItem";

class PopularTabUiPage extends Component {
    constructor(props) {
        super(props);
        const {storeName} = this.props;
        //每个tab有两个属性
        this.storeName = storeName;
        this.pageIndex = 1

    }

    componentDidMount() {
        console.log('componentDidMount :', this.storeName);
        this.loadData(false)
    }

    /**
     * 此为页面的数据来源
     * 数据流程:loadData-->redux--->dataStore
     * 上拉刷新/下拉加载更多都由此控制
     * */
    loadData(isLoadMore) {
        const {onPopularFresh} = this.props;
        if (isLoadMore) {

        } else {
            onPopularFresh(this.storeName, this.pageIndex)
        }
    }

    renderItem(data) {
        const item = data.item;
        return <ListItem
            item={item}
            onSelect={() => {
            }}/>
    }

    render() {
        let data = this.props.popular[this.storeName];
        data = data || {items: []};
        console.log('FlatList数据：', this.pageIndex, data, this.storeName)
        return (
            <View style={styles.container}>
                <FlatList data={data.items}
                          renderItem={item => this.renderItem(item)}
                          keyExtractor={item => "" + item.id}
                          refreshControl={
                              <RefreshControl
                                  title='loading'
                                  refreshing={data.isLoading}
                                  onRefresh={() => this.loadData(false)}
                              />
                          }
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