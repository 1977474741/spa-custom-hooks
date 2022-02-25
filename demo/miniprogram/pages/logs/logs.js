// logs.js
const util = require('../../utils/util.js')
const globalData = getApp().globalData
Page({
  data: {
    logs: []
  },
  onLoad() {
    console.log('logs页onLoad');
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  },
  onLoadUser(options){
    const userinfo = JSON.stringify(globalData.userInfo)
    // 拿到用户信息了，可以走依赖用户信息的逻辑了
    console.log('logs页onLoadUser',options,userinfo);
  },
  onShowReady(options){
    // 渲染完页面并且每次显示页面执行
    console.log('logs页onShowReady');
  }
})
