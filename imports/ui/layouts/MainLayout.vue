<template lang="pug">
v-app(style="background:rgba(255,255,255,0.8)")
  .bg-img1
  .bg-img2
  v-content
    v-app-bar(app flat hide-on-scroll color="blue-grey lighten-5")
      router-link.tdn.logo.mr-3(to="/")
      v-toolbar-title 
        router-link.title.tdn(to="/") TK raid tool
      v-spacer
      v-btn(small color="primary" @click="login" v-if="!currentUser") Login with Dsicord
      v-btn.mr-10(v-if="isAdmin" to='/archive' text)
        v-icon mdi-history
      v-btn.mr-10(v-if="isAdmin" to='/admin/users' text)
        v-icon mdi-account-supervisor
      v-list.pa-0.ma-0(color="blue-grey lighten-5")
        v-list-item(v-if="currentUser" to='/profile')
          v-list-item-content Профиль
          v-list-item-avatar
            img(:src="`https://cdn.discordapp.com/avatars/${currentUser.profile.id}/${currentUser.profile.avatar}`")
        
          
    v-container.mb-8
      slot
    v-footer(absolute)
      v-spacer
      div &copy; Bormotun {{ new Date().getFullYear() }}

</template>
<script>
import "/imports/collections/CollectionGWItems";
export default {
  data: () => ({}),
  meteor: {
    currentUser() {
      return Meteor.user();
    },
    isAdmin() {
      return Roles.userIsInRole(Meteor.userId, "admin");
    },
  },
  methods: {
    login() {
      Meteor.loginWithDiscord();
    },
    // logout () {
    //   this.$router.push({name: 'home'})
    //   Meteor.logout()
    // }
  },
};
</script>
<style lang="stylus" scoped>
.logo
  background-image: url(https://time-keepers.ru/styles/prisma/prisma/logo.png)
  background-size cover
  width 50px
  height 50px
.avatar
  width 40px
  height 40px
.bg-img1
  background-image: url(https://en-forum.guildwars2.com/static-asset/cl40013/themes/guildwars/design/images/side-art-left.jpg)
  background-size contain
  position fixed
  z-index -10000
  width 100%
  height 100vh
.bg-img2
  background-image: url(https://en-forum.guildwars2.com/static-asset/cl40013/themes/guildwars/design/images/side-art-right.jpg)
  background-size contain
  background-position 100%
  float right
  position fixed
  z-index -9999
  width 100%
  height 100vh
</style>
