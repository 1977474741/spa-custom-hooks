import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loginType: null, //是否登陆
		logs: [],//执行日志
		userinfo: {},//用户信息
	},
	mutations: {
		loginType(state, info) {
		    state['loginType'] = info;
		},
		logs(state, info) {
		    state['logs'].unshift(info);
		    state['logs'].unshift('line');
		    // const dom = document.getElementById("bottom");
		    // if(dom){
			   //  dom.scrollIntoView();
		    // }
		},
		userinfo(state, info) {
		    state['userinfo'] = info;
		},
	},
	actions: {
	},
	modules: {
	}
})
