Meteor.methods({
  async getUpcomingEventsDays (clientOffset) {
    if ((clientOffset !== parseInt(clientOffset, 10))) {
      return this.ready();
    }
    // var serverTimeDiff = clientOffset - moment().utcOffset();

    // var startOfDay = moment().startOf('day').add(serverTimeDiff, 'minutes').toDate();
    var startOfDay = moment().startOf('day').toDate();



    return await CollectionEvents.rawCollection().aggregate([
      {
        $match: {
          startDateTime: {
            $gt: startOfDay
          }
        }
      },
      { $project: { orderTimeLocal: { $add: ["$startDateTime", clientOffset * 60 * 1000] } } },
      {
        $group: {
          _id: {
            year: { $year: "$orderTimeLocal" },
            month: { $month: "$orderTimeLocal" },
            day: { $dayOfMonth: "$orderTimeLocal" },
          },
          count: { $sum: 1 }
        }
      }, {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1
        }
      }]).toArray();



  }
});