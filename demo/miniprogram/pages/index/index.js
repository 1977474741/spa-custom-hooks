// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '注意看控制台console',
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoadLogin(options){
    // 已经登录，可以走依赖token的逻辑了
    console.log('首页的onLoadLogin',options,`{"token":"${app.globalData.token}"}`);
  },
  onShowLogin(options){
    // 每次显示页面时都会执行的逻辑在这里
    console.log('首页的onShowLogin',options,`{"token":"${app.globalData.token}"}`);
  },
  onLoadUser(options){
    const userinfo = JSON.stringify(app.globalData.userInfo)
    // 拿到用户信息了，可以走依赖用户信息的逻辑了
    console.log('首页的onLoadUser',options,userinfo);
  },
  onReadyUser(options){
    const userinfo = JSON.stringify(app.globalData.userInfo)
    // 渲染完毕，并且拿到了用户信息，可以去走类似在canvas上渲染用户头像的逻辑了
    console.log('首页的onReadyUser',options,userinfo);
  },
  onReadyShowUser(options){
    const userinfo = JSON.stringify(app.globalData.userInfo)
    // 渲染完完毕 && 每次显示页面 && 拿到用户信息
    console.log('首页的onReadyShowUser',options,userinfo);
  },
})
