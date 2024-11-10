Meteor.methods({
  'saveApiKey': function (key) {
    console.log(this.userId);

    key = key.trim()

    try {
      var result = HTTP.call('GET', 'https://api.guildwars2.com/v2/tokeninfo', {
        headers: {
          Authorization: "Bearer " + key
        }
      });
      console.log(result);

      let check = 0
      result.data.permissions.map(el => {
        if (el === 'characters') {
          check++
          console.log(el, "++")
        }
        if (el === 'account') {
          check++
          console.log(el, "++")
        }
        if (el === 'builds') {
          check++
          console.log(el, "++")
        }
        if (el === 'pvp') {
          check++
          console.log(el, "++")
        }
      })

      if (check !== 4) throw new Meteor.Error('Не все галочки выбраны')

      Meteor.users.update(this.userId, {
        $set: {
          "profile.gw2ApiKey": key
        }
      })

      Meteor.call('updateCharacters', this.userId)


    } catch (error) {

      if (error.error) throw new Meteor.Error(`Плохой ключ: ${error.error}`)
      else throw new Meteor.Error('Плохой ключ: Попробуй создать новый точно следуя инструкции.')
    }

    return 1



  }
})