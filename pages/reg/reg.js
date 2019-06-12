// pages/reg/reg.js
import Toast from '../../vantweapp/toast/toast'
const app = getApp()
const Bmob = require('../../utils/bmob.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 4,
    usermobile: '',
    sms: '',
    checked: false,
    disabled: true,
    usermobileError: '',
    smsError: ''
  },
  usermobileInput(e) {
    this.setData({
      usermobile: e.detail,
      usermobileError: /^1[3456789]\d{9}$/.test(e.detail) ? '' : '手机号格式错误'
    })
  },
  smsInput(e) {
    this.setData({
      sms: e.detail,
      smsError: /^[0-9]+$/.test(e.detail) ? '' : '验证码格式有误'
    })
  },
  checkInput(event) {
    this.setData({
      checked: event.detail,
      disabled: !event.detail
    })
  },
  // 发送验证码
  sendSms() {
    if (this.data.usermobileError || !this.data.usermobile) {
      Toast('请输入正确的手机号！')
      return
    }
    Bmob.requestSmsCode({
      mobilePhoneNumber: this.data.usermobile
    }).then(res => {
      Toast.success('短信验证码已发送')
    }).catch(err => {
      Toast.fail(err.error)
    })
  },
  // 注册
  reg() {
    console.log('注册执行11')
    if (this.data.usermobileError || this.data.smsError || !this.data.usermobile || !this.data.sms)
      return Toast('请输入正确的手机号或者验证码！')
    this.setData({
      disabled: true
    })
    Bmob.verifySmsCode(this.data.sms, {
      mobilePhoneNumber: this.data.usermobile
    })
    .then(res => {
      return Bmob.User.register({
        username: this.data.usermobile,
        password: '123456',
        email: new Date().getTime() + '@test.com',
        phone: this.data.usermobile
      })
    })
    .then(res => {
      console.log('注册 后端res', res)
      app.data.user = res
      Toast.success('绑定成功')
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/mine/mine',
        })
      }, 800)
    })
    .catch(err => {
      console.log('注册 err', err)
      if (err.code === 202) 
      return Bmob.User.login(this.data.usermobile, '123456')
      .then(res => {
        console.log('验证码登录res', res)
        Toast.success('登录成功')
        app.data.user = res
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/mine/mine',
          })
        }, 800)
      })
      .catch(err => {
        console.log('验证码登录err', err)
        this.setData({
          disabled: false
        })
        Toast.fail(err.error)
      })
      this.setData({
        disabled: false
      })
      Toast.fail(err.error)
    })
  },
  onChange(e) {
    console.log('reg tabbar监听', e.detail)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})