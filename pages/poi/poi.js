const App = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    title: '',
    type: null,
    id: null,
    pois: null,
    poiType: 'all',
    windowWidth: App.systemInfo.windowWidth,
    windowHeight: App.systemInfo.windowHeight,
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
      type,
      id,
    });
    wx.setNavigationBarTitle({
      title: name,
    });
    this.getPOIList(type, id, 'all', true);
  },
  getPOIList(type, id, poiType, needRefresh) {
    const self = this;
    const data = {};
    api.destination.poi(type, id, poiType, data, (state, res) => {
      if (state === 'success') {
        let newList = res.data.items;
        if (needRefresh) {
          console.log('needRefresh');
        } else {
          newList = self.data.pois.concat(newList);
        }
        self.setData({
          pois: newList,
        });
        wx.hideToast();
      }
    });
  },
  changePOIType(e) {
    const self = this;
    const poiType = e.currentTarget.dataset.type;
    self.setData({
      poiType,
    });
    this.getPOIList(self.data.type, self.data.id, 'all', true);
  },
});
