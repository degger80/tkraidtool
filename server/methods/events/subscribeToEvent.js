
import '/imports/collections/CollectionEvents'
import '/imports/collections/CollectionEventSlots'
Meteor.methods({
  'subscribeToEvent': function (eventId, comment, subType) {
    console.log(eventId, comment, subType);


    var userId = Meteor.userId();
    var character = CollectionCharacters.findOne({ userId: userId, default: true });
    var eventItem = CollectionEvents.findOne({ _id: eventId });

    if (!userId) {
      throw new Meteor.Error(401, 'Надо залогиниться чтобы подписываться на ивенты');
    }

    if (!character) {
      throw new Meteor.Error(403, 'Что то не нашел я персонажей для вашего аккаунта');
    }

    if (!eventItem) {
      throw new Meteor.Error(403, 'Что то не нашел такого ивента');
    }

    if (!["1", "2", "3"].includes(subType)) {
      throw new Meteor.Error(403, 'Неверные данные');
    }

    Date.prototype.addHours = function (h) {
      this.setTime(this.getTime() + (h * 60 * 60 * 1000));
      return this;
    }

    if (eventItem.startDateTime < new Date().addHours(-eventItem.duration)) {
      throw new Meteor.Error(405, 'Вносить изменения в прошедший ивент нельзя');
    }


    var slotId = "reserv";
    if (subType === "1") {
      slotId = "canceled";
    }
    if (subType === "3") {
      slotId = "available";
    }
    if (subType === "4") {
      slotId = "ugol";
    }

    comment = comment.trim();
    if (comment == "") {
      comment = null
    }

    CollectionEventSlots.remove({ userId: userId, eventId: eventItem._id });
    CollectionEventSlots.update({ userId: userId, eventId: eventItem._id }, {
      $set: {
        eventId: eventItem._id,
        groupId: null,
        slotId: slotId,
        userId: userId,
        characterId: character._id,
        comment: comment,
        mark: subType,
        rl_comment: null,
        profession: character.profession,
        characterName: character.name,
        alternativeCharacters: [character._id]
      }
    }, { upsert: true });

    // //обновляем подписанных

    // var subscribedCount =  CollectionEventSlots.find({eventId: eventId}).count();
    // CollectionEvents.update(eventId,{$set:{
    //     subscribed: subscribedCount
    // }});
    Meteor.call('updateCounts', eventId);
  },
  'updateCounts': function (eventId) {
    //обновляем апрувед и подписанных
    var approvedCount = CollectionEventSlots.find({ groupId: { $ne: null }, eventId: eventId }).count();
    var subscribedCount = CollectionEventSlots.find({ eventId: eventId }).count();
    CollectionEvents.update(eventId, {
      $set: {
        approved: approvedCount,
        subscribed: subscribedCount
      }
    });

  }
})