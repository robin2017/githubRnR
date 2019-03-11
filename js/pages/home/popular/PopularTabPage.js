/**
 * Created by robin on 2019/3/5
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux'
import action from '../../../redux/action'
import ListItem from "../../common/ListItem";

class PopularTabUiPage extends Component {
    constructor(props) {
        super(props);
        const {storeName} = this.props;
        //每个tab有两个个属性
        this.storeName = storeName;
        this.pageIndex = 1;


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
        console.log('-------loadData------', isLoadMore, this.pageIndex)
        const {onPopularRefresh, onPopularLoad} = this.props;
        if (isLoadMore) {
            onPopularLoad(this.storeName, ++this.pageIndex)
        } else {
            onPopularRefresh(this.storeName, this.pageIndex)
        }
    }

    genFootComponent(data) {
        return data.isLoading ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator style={styles.indicator}/>
                <Text>正在加载更多</Text>
            </View>
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
                          keyExtractor={(item, index) => "" + item.id + "-" + index}
                          refreshControl={
                              <RefreshControl
                                  title='loading'
                                  refreshing={data.isRefreshing}
                                  onRefresh={() => this.loadData(false)}
                              />
                          }
                          ListFooterComponent={() => this.genFootComponent(data)}
                          onEndReached={() => {
                              //不能两个loading同时，这样会导致pageIndex跳变
                              if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                  this.loadData(true);
                                  this.canLoadMore = false;
                              }

                          }}
                          onEndReachedThreshold={0.5}
                          onMomentumScrollBegin={() => {
                              this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                          }}
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
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});

const mapStateToProps = (state) => ({
    popular: state.popular //state.popular是在reducer中定义
});
const mapDispatchToProps = (dispatch) => ({
    onPopularRefresh: function () {
        dispatch(action.onPopularRefresh(...arguments))
    },
    onPopularLoad: function () {
        dispatch(action.onPopularLoad(...arguments))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularTabUiPage)