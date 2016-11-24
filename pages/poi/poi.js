const App = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    title: '',
    type: null,
    id: null,
    pois: null,
    poiType: 'all',
    start: 0,
    loading: false,
    hasMore: true,
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
    const loading = self.data.loading;
    const hasMore = self.data.hasMore;
    if (loading || (!hasMore && !needRefresh)) {
      return;
    }
    self.setData({
      loading: true,
    });
    if (needRefresh) {
      self.setData({
        pois: [],
        start: 0,
        hasMore: true,
      });
    }
    const data = {
      start: self.data.start,
    };
    api.destination.poi(type, id, poiType, data, (state, res) => {
      if (state === 'success') {
        let newList = res.data.items;
        if (needRefresh) {
          console.log('needRefresh');
        } else {
          newList = self.data.pois.concat(newList);
        }
        const nextStart = res.data.next_start;
        if (nextStart) {
          self.setData({
            start: nextStart,
          });
        } else {
          self.setData({
            hasMore: false,
          });
        }
        self.setData({
          pois: newList,
          loading: false,
        });
        wx.hideToast();
      }
    });
  },
  loadMore() {
    const self = this;
    this.getPOIList(self.data.type, self.data.id, self.data.poiType, false);
  },
  changePOIType(e) {
    const self = this;
    const poiType = e.currentTarget.dataset.type;
    self.setData({
      poiType,
    });
    this.getPOIList(self.data.type, self.data.id, poiType, true);
  },
});
