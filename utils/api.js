const user = {
  info(userId, callback) {
    wx.request({
      url: `http://api.breadtrip.com/users/${userId}/v2/`,
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
};

const trip = {
  waypoints(tripId, callback) {
    wx.request({
      url: `http://api.breadtrip.com/trips/${tripId}/waypoints/`,
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
  hot(callback) {
    wx.request({
      url: 'http://api.breadtrip.com/trips/hot/',
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
};

const waypoint = {
  detail(tripId, waypointId, callback) {
    wx.request({
      url: `http://api.breadtrip.com/trips/${tripId}/waypoints/${waypointId}/`,
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
  replies(tripId, waypointId, callback) {
    wx.request({
      url: `http://api.breadtrip.com/trips/${tripId}/waypoints/${waypointId}/replies/`,
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      success(res) {
        callback('success', res);
      },
      fail(res) {
        callback('fail', res);
      },
      complete(res) {
        callback('complete', res);
      },
    });
  },
};

module.exports = {
  user,
  trip,
  waypoint,
};
