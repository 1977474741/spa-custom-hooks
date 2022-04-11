import CustomHook from 'spa-custom-hooks';
let globalData = {
  // 是否已拿到token
  token: '',
  // 用户信息
  userInfo: {
    userId: '',
    head: ''
  }
}
CustomHook.install({
 'Login':{
    name:'Login',
    watchKey: 'token',
    onUpdate(val){
      //有token则触发此钩子
      return !!val;
    }
  },
 'User':{
    name:'User',
    watchKey: 'userInfo.userId',
    onUpdate(val){
      //获取到userinfo里的userId则触发此钩子
      return !!val;
    }
  }
}, globalData || 'globalData')

App({
  onShow(){
    console.log('app.vue页onShow');
  },
  onLaunch() {
    console.log('app.vue页onLaunch');
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        setTimeout(()=>{
          // 拿到token后更改登录状态
          this.globalData.token = 'duy868h36732tyg216'

          // 使用token异步获取用户信息并存起来
          setTimeout(()=>{
            this.globalData.userInfo.userId = 999
            this.globalData.userInfo.head = 'dsahkjdkasjjdksaljkldkak'
          },1000)

        },1000)
      }
    })
  },
  onShowLogin(){
    console.log('app.vue页onShowLogin');
  },
  onLaunchLogin(){
    console.log('app.vue页onLaunchLogin');
  },
  globalData
})
