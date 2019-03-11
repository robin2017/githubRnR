import {AsyncStorage} from 'react-native'
import {QUERY_URL, PER_PAGE} from '../constant/constant'

export default class DataStore {
    /**
     * 覆盖性测试：
     * 1、没有数据时，pageIndex不为1：报错
     * 2、没有数据时，pageIndex为1：从网络上得到10数据
     * 3、有10数据，pageIndex为2：从网络得到10拼接10条得到20数据
     * 4、有20数据，pageindex为4：报错
     * 5、有20数据，pgeIndex为1：直接得到10条
     * */
    fetchData(storeName, pageIndex) {
        return this.fetchLocalData(storeName, pageIndex)
    }

    /**
     * 从本地获取数据
     * 返回promise-data
     * */
    fetchLocalData(storeName, pageIndex) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(storeName, (error, result) => {
                if (!result) {
                    //情况一：开始时，从网络取
                    if (pageIndex === 1) {
                        return resolve(this.fetchNetData(storeName, pageIndex))
                    }
                    reject('Error：pageIndex开始必须为1')
                } else {
                    //情况二：取到正常数据数据，
                    let data = JSON.parse(result);
                    if (data.pageIndex >= pageIndex) {
                        return resolve({
                            pageIndex,
                            timestamp: data.timestamp,
                            items: data.items.slice(0, pageIndex * PER_PAGE)
                        })
                    }
                    //情况三：增量加1
                    if (data.pageIndex === pageIndex - 1) {
                        return resolve(this.fetchNetData(storeName, pageIndex, data))
                    } else {
                        return reject("Error:pageIndex不能跳变")
                    }
                }
            })
        })
    }

    /**
     * 从网络获取数据
     * 返回promise-data
     * 流程：先和本地合并存入本地，然后从本地取
     * */
    fetchNetData(storeName, pageIndex, originData) {
        let url = QUERY_URL + storeName + `&page=${pageIndex}&per_page=${PER_PAGE}`;
        return new Promise((resolve, reject) => {
            fetch(url).then(response => {
                if (response.ok) {
                    return response.json()
                }
                return reject('Error:客户端/服务端错误!')
            }).then(response => {
                this.saveNetData(storeName, pageIndex, response, originData)
                    .then(success => {
                        if (success) {
                            AsyncStorage.getItem(storeName, (error, result) => {
                                resolve(JSON.parse(result))
                            })
                        }
                    }).catch(error => {
                    reject(error)
                })
            })
        });
    }

    /**
     * 保存网络数据到本地
     * 返回promise-true
     * 只有两种情况：本地没有；本地作增量
     * */
    saveNetData(storeName, pageIndex, response, originData) {
        return new Promise((resolve, reject) => {
            let originItems = originData ? originData.items : []
            let data = this.handleData(pageIndex, response, originItems);
            AsyncStorage.setItem(storeName, JSON.stringify(data), (error) => {
                if (error) {
                    return reject(error)
                }
                resolve(true)
            });
        })
    }

    /**
     * 处理网络数据
     * */
    handleData(pageIndex, response, originItems) {
        return {
            pageIndex,
            timestamp: new Date().getTime(),
            items: [...(originItems ? originItems : []), ...response.items]
        }
    }
}