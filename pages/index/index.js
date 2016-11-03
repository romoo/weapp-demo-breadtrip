const api = require('../../utils/api.js');

Page({
  data: {
    trips: [],
  },
  onLoad() {
    const self = this;
    api.trip.hot((state, res) => {
      if (state === 'success') {
        self.setData({
          trips: res.data.trips,
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
