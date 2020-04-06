<template lang="pug">
v-content
  v-app-bar(app flat hide-on-scroll color="blue-grey lighten-5")
    router-link.tdn.logo.mr-3(to="/")
    v-toolbar-title 
      router-link.title.tdn(to="/") TK raid tool
    v-spacer
    v-btn(small color="primary" @click="login" v-if="!currentUser") Login with Dsicord
    
    router-link(v-if="currentUser" to='/profile')
      v-avatar(to='/profile' v-if="currentUser" size="40px")
        img(:src="`https://cdn.discordapp.com/avatars/${currentUser.profile.id}/${currentUser.profile.avatar}`")
  v-container.mb-8.fluid
    slot
  v-footer(absolute)
    v-spacer
    div &copy; Bormotun {{ new Date().getFullYear() }}

</template>
<script>
export default {
  data: () => ({}),
  meteor: {
    currentUser() {
      return Meteor.user();
    }
  },
  methods: {
    login() {
      Meteor.loginWithDiscord();
    }
    // logout () {
    //   this.$router.push({name: 'home'})
    //   Meteor.logout()
    // }
  }
};
</script>
<style lang="stylus" scoped>
.logo
  background-image: url(http://time-keepers.ru/styles/prisma/prisma/logo.png)
  background-size cover
  width 50px
  height 50px
.avatar
  width 40px
  height 40px
</style>
