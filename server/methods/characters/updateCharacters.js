// import CollectionCharacters from '/imports/collections/Characters'
import '/imports/collections/CollectionCharacters'
Meteor.methods({
  'updateCharacters': function (userId) {
    const user = Meteor.users.findOne({ _id: userId })

    const result = HTTP.call('GET', 'https://api.guildwars2.com/v2/characters', {
      params: {
        access_token: key,
        page: 0,
        page_size: 50
      },
      // headers: {
      //   Authorization: "Bearer " + user.profile.gw2ApiKey
      // }
    });

    for (let index = 0; index < result.data.length; index++) {
      const item = result.data[index]
      // console.log(item);
      item.visible = true
      CollectionCharacters.upsert({
        userId,
        name: item.name
      }, { $set: item })

    }
  }
})