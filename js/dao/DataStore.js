import {AsyncStorage} from 'react-native'
import {QUERY_URL, PER_PAGE} from '../constant/constant'

export default class DataStore {
    fetchData(storeName, pageIndex) {
        return this.fetchLocalData(storeName, pageIndex)
    }

    /**
     * 从本地获取数据
     * */
    fetchLocalData(storeName, pageIndex) {
        //将回调形式转化为promise形式,resolve参数也可以为promise
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(storeName, (error, result) => {
                //没取到数据，从网络获取
                if (!result) {
                    return resolve(this.fetchNetData(storeName, pageIndex))
                }
                //取到正常数据数据，
                let data = JSON.parse(result)
                if (data.pageIndex >= pageIndex) {
                    return resolve(data)
                }
                //pageIndex小1
                if (data.pageIndex === pageIndex - 1) {
                    return resolve(this.fetchNetData(storeName, pageIndex))
                } else {
                    return reject("pageIndex不能调变")
                }
            })
        })
    }

    /**
     * 从网络获取数据
     * 返回promise-true
     * */
    fetchNetData(storeName, pageIndex) {
        let url = QUERY_URL + storeName + `&page=${pageIndex}&per_page=${PER_PAGE}`;
        return fetch(url).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(response => {
            return this.saveNetData(storeName, pageIndex, response).then(response => {
                if (response) {
                    return new Promise((resolve, reject) => {
                        AsyncStorage.getItem(storeName, (error, result) => {
                            resolve(JSON.parse(result))
                        })
                    })
                }
            })
        }).catch(error => {
            console.log('error')
        })
    }

    /**
     * 保存网络数据到本地
     * 返回promise-true
     * */
    saveNetData(storeName, pageIndex, response) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(storeName, (error, result) => {
                let items = null;
                if (!result) {
                    items = []
                } else {
                    items = JSON.parse(result).items
                }
                let data = {
                    items: [...items, ...response.items],
                    timestamp: new Date().getTime(),
                    pageIndex
                };
                AsyncStorage.setItem(storeName, JSON.stringify(data), () => {
                    resolve(true);
                });
            })
        })
    }
}