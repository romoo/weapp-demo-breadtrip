const App = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');

const formatTime = util.formatTime;

Page({
  data: {
    title: '',
    pois: null,
    info: null,
    windowWidth: App.systemInfo.windowWidth,
    windowHeight: App.systemInfo.windowHeight,
  },
  onReady() {
    const self = this;
    wx.setNavigationBarTitle({
      title: self.data.title,
    });
  },
  onLoad(options) {
    const type = options.type;
    const id = options.id;
    const name = options.name;
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
    });
    this.setData({
      title: name,
    });
    this.getPlaceInfo(type, id);
  },
  getPlaceInfo(type, id) {
    const self = this;
    api.destination.place(type, id, (state, res) => {
      if (state === 'success') {
        const data = res.data;
        self.setData({
          info: data,
        });
        self.getPOI(type, id);
      }
    });
  },
  getPOI(type, id) {
    const self = this;
    const data = {};
    api.destination.poi(type, id, '', data, (state, res) => {
      if (state === 'success') {
        const pois = res.data.items;
        self.setData({
          pois,
        });
        wx.hideToast();
      }
    });
  },
});
