App({
  systemInfo: null,
  onLaunch() {
    const self = this;
    wx.getSystemInfo({
      success(res) {
        self.systemInfo = res;
      },
    });
  },
});
