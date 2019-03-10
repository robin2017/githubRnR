import Types from '../types'
import DataStore from '../../../dao/DataStore'

const dataStore = new DataStore();

export function onPopularFresh(storeName, pageIndex) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName});
        dataStore.fetchData(storeName, pageIndex).then(data => {
            dispatch({type: Types.POPULAR_REFRESH_SUCCESS, storeName, data})
        })
    }
}