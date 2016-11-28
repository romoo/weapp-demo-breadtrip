const api = require('../../utils/api.js');
const util = require('../../utils/util.js');

const formatTime = util.formatTime;
const app = getApp();
Page({
  data: {
    waypoint: null,
    replies: {
      recommender_count: 0,
      recommenders: [],
      comments: [],
      comment_count: 0,
    },
    title: '',
    windowWidth: 0,
  },
  onReady() {
    const self = this;
    wx.setNavigationBarTitle({
      title: self.data.title,
    });
  },
  onLoad(options) {
    const self = this;
    const tripId = options.tripId;
    const waypointId = options.waypointId;
    self.setData({
      windowWidth: app.systemInfo.windowWidth,
    });
    this.getWaypointDetail(tripId, waypointId);
  },
  getWaypointDetail(tripId, waypointId) {
    const self = this;
    api.getWaypointInfoByID({
      query: {
        tripId,
        waypointId,
      },
      success: (res) => {
        const waypoint = res.data;
        self.setData({
          title: waypoint.trip_name,
          waypoint,
        });
        if (waypoint.comments > 0) {
          self.getWaypointReplies(tripId, waypointId);
        }
      },
    });
  },
  getWaypointReplies(tripId, waypointId) {
    const self = this;
    api.getWaypointReplyByID({
      query: {
        tripId,
        waypointId,
      },
      success: (res) => {
        const replies = res.data;
        replies.comments.map((reply) => {
          const item = reply;
          item.date_added = formatTime(new Date(item.date_added * 1000), 2);
          return item;
        });
        self.setData({
          replies,
        });
      },
    });
    api.waypoint.replies(tripId, waypointId, (state, res) => {
      if (state === 'success') {
        const replies = res.data;
        replies.comments.map((reply) => {
          const item = reply;
          item.date_added = formatTime(new Date(item.date_added * 1000), 2);
          return item;
        });
        self.setData({
          replies,
        });
      }
    });
  },
  gotoUser(e) {
    const userId = e.target.dataset.id;
    wx.navigateTo({
      url: `../user/user?id=${userId}`,
    });
  },
  previewImage(e) {
    const url = e.currentTarget.dataset.src;
    wx.previewImage({
      current: url,
      urls: [url],
    });
  },
});
