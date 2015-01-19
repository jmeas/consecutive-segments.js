(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["underscore", "moment"], factory);
  } else if (typeof exports !== "undefined") {
    var _ = require("underscore");
    var moment = require("moment");
    module.exports = factory(_, moment);
  } else {
    root.ConsecutiveSegments = factory(root._, root.moment);
  }
})(this, function (_, moment) {
  "use strict";

  var ConsecutiveSegments = {

    // Segment an array of events by scale
    group: function group(segments) {
      var scale = arguments[1] === undefined ? "weeks" : arguments[1];
      var segmentCount = _.size(segments);

      if (!segments || segmentCount === 0) {
        return [];
      }

      var currentGroup = 0, groups = [], currentMoment, prevMoment;
      _.chain(segments).map(function (events, timestamp) {
        return { timestamp: timestamp, events: events };
      }).each(function (s, index, segments) {
        // Check to see if the current group is the same
        // as the previous group by computing the difference
        // in their timestamps. > 1 means that they aren't
        // consecutive.
        if (index !== 0) {
          currentMoment = moment.unix(s.timestamp).utc();
          prevMoment = moment.unix(segments[index - 1].timestamp).utc();
          if (currentMoment.diff(prevMoment, scale) > 1) {
            currentGroup++;
          }
        }

        // Ensure that the group exists, then push to it
        if (!groups[currentGroup]) {
          groups[currentGroup] = [];
        }
        groups[currentGroup].push(_.clone(s));
      });

      return groups;
    }
  };




  return ConsecutiveSegments;
});
// Place your library's code here
//
// If you add additional files, be sure to
// load them in order in ./wrapper.js
//
//# sourceMappingURL=consecutive-segments.js.map