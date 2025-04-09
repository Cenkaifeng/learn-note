var publisher = {
  events: {},

  addEvent: function (event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },

  removeEvent: function (event, callback) {
    if (this.events[event]) {
      for (var i = 0; i < this.events[event].length; i++) {
        if (this.events[event][i] === callback) {
          this.events[event].splice(i, 1);
          break;
        }
      }
    }
  },

  publishEvent: function (event, data) {
    if (this.events[event]) {
      for (var i = 0; i < this.events[event].length; i++) {
        this.events[event][i](data);
      }
    }
  },
};

var subscriber = {
  handleEvent: function (data) {
    console.log(data);
  },
};

publisher.addEvent("event1", subscriber.handleEvent);

publisher.publishEvent("event1", "Hello, world!");

publisher.removeEvent("event1", subscriber.handleEvent);
