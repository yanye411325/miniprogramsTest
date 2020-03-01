// pages/book/book.js
// 1. 获取数据库引用
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    books:[],
    texts:[{text:'111'},{text:"222"}]
  },
  scanCode(){
    wx.scanCode({
      success(res) {
        let isbn = res.result;

        console.log(isbn);
        wx.cloud.callFunction({
          name:'yanye',
          data:{
            a:3,
            b:4,
            isbn: isbn
          },
          success:(res1)=>{
            let data = res1.result;
            db.collection('yanye').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                title: data.title,
                img: data.img,
                summary: data.summary,
                
              },
              success: function (res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
              }
            });

            
            
          }
        });
      }
    })
  },
  // getImg(){
  //   let ctx = wx.createCameraContext();
  //   ctx.takePhoto({
  //     quality: 'high',
  //     success:(data)=>{
  //       this.setData({
  //         src: data.tempImagePath,
  //       });
  //       console.log(data)
  //     }
  //   });

  // },
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