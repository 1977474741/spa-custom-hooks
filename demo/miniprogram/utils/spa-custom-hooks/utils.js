let store
/**
 * 根据动态字符串key获取属性，相当于eval
 * @param obj {Object objct} 在此对象上查找
 * @param keyStr {String} 要找的对象key，支持字符串调用链
 * @param LastFloor {Boolean} 是否保留最后一层
 * return {Any} 获取到的属性
 */
const getVal = (obj,keyStr,LastFloor)=>{
	try{
		if(keyStr){
			let keyArr = keyStr.split('.')
			// 是否保留最后一层，用于做数据监听
			const length = LastFloor?keyArr.length - 1:keyArr.length
			//兼容1.1.1以及之前的版本，结束
			for(let i = 0; i < length; i++) {
				obj = obj[keyArr[i]]
			}
		    return LastFloor?{
		    	key: keyArr[length],
		    	obj
		    } : obj
		}else{
			return obj
		}
	}catch(err){
		return
	}
}

/**
 * 暂存store对象
 * @param _store {Object store} store对象
 * return store {Object store} store对象
 */
const setStore = (_store)=>{
	store = _store
	return store
}

/**
 * 获取store对象
 * @param page {Object component} 组件实例
 * return store {Object store} store对象
 */
const getStore = (page) => {
	//有显式传入的store
	if(store && store.state){
		return store
	}
	// 否则使用组件里的store
	else if(page){
		return page.$store || {}
	}else{
		return {}
	}
}

export {
    getVal,
    setStore,
    getStore
}