// pages/addMail/addMail.js
import Toast from '../../vantweapp/toast/toast'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    userMobile: '',
    taMobile: '',
    sms: '',
    message: '',
    userMobileError: ' ',
    taMobileError: ' ',
    smsError: ' ',
    messageError: ' ',
    mobileVisible: false,
    checked: false,
    disabled: true,
  },
  checkInput(event) {
    this.setData({
      checked: event.detail,
      disabled: !event.detail
    })
  },
  mobileVisibleInput(event) {
    this.setData({
      mobileVisible: event.detail,
    })
  },
  userMobileInput(e) {
    this.setData({
      userMobile: e.detail,
      userMobileError: /^1[3456789]\d{9}$/.test(e.detail) ? '' : '手机号格式错误'
    })
  },
  taMobileInput(e) {
    this.setData({
      taMobile: e.detail,
      taMobileError: /^1[3456789]\d{9}$/.test(e.detail) ? '' : '手机号格式错误'
    })
  },
  smsInput(e) {
    this.setData({
      sms: e.detail,
      smsError: /^[0-9]+$/.test(e.detail) ? '' : '验证码格式有误'
    })
  },
  messageInput(e) {
    this.setData({
      message: e.detail,
      messageError: /^[0-9]{6,200}$/.test(e.detail) ? '' : '内容字数限制为6-200'
    })
  },
  onChange(e) {
    console.log('reg tabbar监听', e.detail)
    app.toPage(e.detail)
  },
  send() {
    if (this.data.userMobileError !== '' || this.data.taMobileError !== '' || this.data.smsError !== '' || this.data.messageError !== '') {
      return Toast('请您填写完整信息')
    }
    console.log('写信发送后端')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})