let store;
/**
 * 根据动态字符串key获取对象
 * @param    在此对象上查找
 * @param    要找的对象key，支持字符串调用链
 * return Object||undefined
 */
const getVal = (obj,keyStr)=>{
	try{
		let keyArr = keyStr.split('.');
		//兼容1.1.1以及之前的版本，结束
	    return keyArr.reduce((obj,val) => obj[val],obj);
	}catch(err){
		return;
	}
}

/**
 * 暂存store对象
 * return store
 */
const setStore = (_store)=>{
	store = _store;
	return store;
}

/**
 * 获取store对象
 * return store
 */
const getStore = (page) => {
	//有显式传入的store
	if(store && store.state){
		return store;
	}
	// 否则使用组件里的store
	else if(page){
		return page.$store || {};
	}else{
		return {};
	}
}

export {
    getVal,
    setStore,
    getStore
}