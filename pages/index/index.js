const App = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    trips: [],
    start: 0,
    loading: false,
    windowWidth: App.systemInfo.windowWidth,
    windowHeight: App.systemInfo.windowHeight,
  },
  onLoad() {
    this.loadMore();
  },
  onPullDownRefresh() {
    this.loadMore(null, true);
  },
  loadMore(e, needRefresh) {
    const self = this;
    const loading = self.data.loading;
    const data = {
      next_start: self.data.start,
    };
    if (loading) {
      return;
    }
    self.setData({
      loading: true,
    });
    api.trip.hot(data, (state, res) => {
      if (state === 'success') {
        let newList = [];
        if (needRefresh) {
          newList = res.data.data.elements;
          wx.stopPullDownRefresh();
        } else {
          newList = self.data.trips.concat(res.data.data.elements);
        }
        self.setData({
          trips: newList,
        });
        const nextStart = res.data.data.next_start;
        self.setData({
          start: nextStart,
          loading: false,
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
