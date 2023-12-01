let store;
/**
 * 根据动态字符串key获取属性，相当于eval
 * @param1 <object> 在此对象上查找
 * @param2 <string> | Array<string> 要找的对象key，支持字符串调用链
 * @param3 <boolean> 是否保留最后一层
 * return <any> 获取到的属性
 */
const getVal = (obj, keys, LastFloor) => {
    try {
        if (keys) {
            let keyArr = keys;
            if (typeof keys === 'string') {
                keyArr = keys.split('.');
            }
            // 是否保留最后一层，用于做数据监听
            const length = LastFloor ? keyArr.length - 1 : keyArr.length;
            //兼容1.1.1以及之前的版本，结束
            for (let i = 0; i < length; i++) {
                obj = obj[keyArr[i]];
            }
            return LastFloor
                ? {
                      key: keyArr[length],
                      obj,
                  }
                : obj;
        } else {
            return obj;
        }
    } catch (err) {
        return;
    }
};

/**
 * 暂存store对象
 * @param <object> 传入的store对象
 * return <object> 传入的store对象
 */
const setStore = (_store) => {
    store = _store;
    return store;
};

/**
 * 获取store对象
 * @param <App> | <Page> | <Component> 组件实例
 * return <object> store对象
 */
const getStore = (page) => {
    //有显式传入的store
    if (store && store.state) {
        return store;
    }
    // 否则使用组件里的store
    else if (page) {
        return page.$store || {};
    } else {
        return {};
    }
};

export { getVal, setStore, getStore };
