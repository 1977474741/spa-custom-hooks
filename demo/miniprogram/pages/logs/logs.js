// logs.js
const util = require('../../utils/util.js')
const globalData = getApp().globalData
Page({
  data: {
    logs: []
  },
  onLoad() {
    setTimeout(()=>{
      // globalData.userInfo = 1
    },2000)
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
  onLaunch(){
    console.log('logs页onLaunch');
  },
  onLoadUser(){
    console.log('logs页onLoadUser');
  },
  onShowReady(){
    console.log('logs页onShowReady');
  }
})
