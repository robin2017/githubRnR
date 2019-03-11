import Types from '../../action/types'

export default function (state = {}, action) {
    switch (action.type) {
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isRefreshing: true,
                }
            };
        case Types.POPULAR_REFRESH_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isRefreshing: false,
                    items: action.data.items
                }
            };
        case Types.POPULAR_REFRESH_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isRefreshing: false,
                }
            };
        /**
         *加载load和刷新refresh逻辑一致
         * 只需要更换types和状态名
         * */
        case Types.POPULAR_LOAD:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                }
            };
        case Types.POPULAR_LOAD_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                    items: action.data.items
                }
            };
        case Types.POPULAR_LOAD_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                }
            };
        default:
            return state;
    }
}