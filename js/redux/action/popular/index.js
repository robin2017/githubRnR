import Types from '../types'
import DataStore from '../../../dao/DataStore'

const dataStore = new DataStore();

export function onPopularRefresh(storeName, pageIndex) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName});
        dataStore.fetchData(storeName, pageIndex).then(data => {
            console.log('dao层获取数据：', storeName, pageIndex, data);
            dispatch({type: Types.POPULAR_REFRESH_SUCCESS, storeName, data})
        })
    }
}

/**
 * 上拉load和下拉refresh逻辑一致，代码一样
 * */
export function onPopularLoad(storeName, pageIndex) {
    return dispatch => {
        dispatch({type: Types.POPULAR_LOAD, storeName});
        dataStore.fetchData(storeName, pageIndex).then(data => {
            console.log('dao层获取数据：', storeName, pageIndex, data);
            dispatch({type: Types.POPULAR_LOAD_SUCCESS, storeName, data})
        })
    }
}