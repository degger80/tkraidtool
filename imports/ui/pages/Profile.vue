<template lang="pug">
  MainLayout
    v-row
      v-col(sm="4" md="3")
        v-card(outlined)
          v-card-title GW2 API KEY
          v-card-text
            ul
              li Идем по ссылке <a href="https://account.arena.net/applications" target="_blank">https://account.arena.net/applications</a>
              li Жмем кнопочку "New Key"
              li Вбиваем любое название в поле Name
              li Ставим 4 галочки: account, characters, builds, pvp
              li Жмем красную кнопку "CREATE API KEY
              li Копируем сюда данный ключ:
            v-text-field.pt-6(outlined
              v-model="gw2ApiKey"
              placeholder="GW2 API KEY" 
              @input="showError=false"
            )   
            v-alert(
              dense
              outlined
              type="error"
              v-show="showError") {{error}}
          
            v-btn(
              @click = "saveApiKey"
              color = "primary"
            ) Сохранить
      v-col(sm="8" md="9")        
        v-card(outlined)
          v-card-title Characters
            v-btn.ml-2(
              @click = "updateCharacters"
              color="primary"
              text
            ) Обновить
            v-spacer
            v-btn(small color="primary" @click = "logout") Logout
          v-card-subtitle (Выберите активных персонажей для участия в ивентах)
          v-card-text
            v-container.fluid
              v-row
                v-col(cols sm="6" md="4" lg="3" v-for="c in characters")
                  v-card.prof-logo(:class="{'visible': c.visible}" @click="toggleActive(c)")
                    v-card-text
                      
                        img(:src="`/images/professions/${c.profession}_tango_icon_48px.png`")
                        | {{c.name}}
          
            
</template>
<script>
import MainLayout from "../layouts/MainLayout";

export default {
  data: () => ({
    gw2ApiKey: "",
    showError: false,
    error: ""
  }),
  components: {
    MainLayout
  },
  meteor: {
    $subscribe: {
      characters: []
    },
    currentUser() {
      return Meteor.user();
    },
    characters() {
      return CollectionCharacters.find({}, { sort: { age: -1 } });
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.go("/");
    }

    this.gw2ApiKey = this.currentUser.profile.gw2ApiKey;
  },
  methods: {
    logout() {
      this.$router.push({ name: "home" });
      Meteor.logout();
    },
    saveApiKey() {
      const self = this;
      Meteor.call("saveApiKey", this.gw2ApiKey, function(error, result) {
        if (error) {
          self.showError = true;
          self.error = error.error;
        }
        console.log(result);
      });
    },
    updateCharacters() {
      const self = this;
      Meteor.call("updateCharacters", Meteor.userId(), function(error, result) {
        if (error) {
          self.showError = true;
          self.error = error.error;
        }
        console.log(result);
      });
    },
    toggleActive(c) {
      c.visible = !c.visible;
      Meteor.call("updateCharacter", c._id, c.visible, function(error, result) {
        console.log(result);
      });
    }
  }
};
</script>
<style lang="stylus">
.prof-logo
  &.visible
    background-color #efe
</style>
