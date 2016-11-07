const App = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    trips: [],
    user_info: null,
    windowWidth: App.systemInfo.windowWidth,
    windowHeight: App.systemInfo.windowHeight,
  },
  onLoad(options) {
    const self = this;
    const userId = options.id || self.data.userId;
    api.user.info(userId, (state, res) => {
      if (state === 'success') {
        self.setData({
          trips: res.data.trips,
          userId: res.data.userId,
          user_info: res.data.user_info,
        });
        wx.setNavigationBarTitle({
          title: res.data.user_info.name,
        });
      }
    });
  },
  viewTrip(e) {
    const ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../trip/trip?id=${ds.id}&name=${ds.name}`,
    });
  },
});
