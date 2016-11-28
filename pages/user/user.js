const App = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');

const formatTime = util.formatTime;

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
    api.getUserInfoByID({
      query: {
        userId,
      },
      success: (res) => {
        const trips = res.data.trips;
        trips.map((trip) => {
          const item = trip;
          item.date_added = formatTime(new Date(item.date_added * 1000), 1);
          return item;
        });
        self.setData({
          trips,
          userId: res.data.userId,
          user_info: res.data.user_info,
        });
        wx.setNavigationBarTitle({
          title: res.data.user_info.name,
        });
      },
    });
  },
  viewTrip(e) {
    const ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../trip/trip?id=${ds.id}&name=${ds.name}`,
    });
  },
});
