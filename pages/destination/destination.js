const App = getApp();
const api = require('../../utils/api.js');

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
    api.getPlaceInfoByID({
      query: {
        type,
        id,
      },
      success: (res) => {
        const data = res.data;
        self.setData({
          info: data,
        });
        self.getPOI(type, id);
      },
    });
  },
  getPOI(type, id) {
    const self = this;
    api.getPlacePOIByID({
      query: {
        type,
        id,
        poiType: 'all',
      },
      success: (res) => {
        const pois = res.data.items;
        self.setData({
          pois,
        });
        wx.hideToast();
      },
    });
  },
  viewPOIList() {
    const self = this;
    wx.navigateTo({
      url: `../poi_list/poi_list?type=${self.data.info.type}&id=${self.data.info.id}&name=${self.data.title}`,
    });
  },
  viewTripList() {
    const self = this;
    wx.navigateTo({
      url: `../trip_list/trip_list?type=${self.data.info.type}&id=${self.data.info.id}&name=${self.data.title}`,
    });
  },
});
