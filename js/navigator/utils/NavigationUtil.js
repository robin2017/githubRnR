/**
 * 导航工具类
 * 所有页面跳转都需要调用这个工具类，进行统一管理,如同axios
 * 操作作为类的static方法，不用实例化
 * */
export default class NavigationUtil {
    /**
     * 带参数的页面跳转
     * */
    static goPage(params, page) {
        const {navigation} = params;
        if (!navigation) {
            console.error('NavigationUtil.goPage参数中必须有navigation属性')
            return
        }
        navigation.navigate(page, {...params})
    }
}
