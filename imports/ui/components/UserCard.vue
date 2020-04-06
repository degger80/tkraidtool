<template lang="pug">
  .user-card
    //- blaze-template(template="loginButtons" tag="span")
    a(href="#" @click="onLogin") discord
  
</template>
<script>
export default {
  methods: {
    onLogin () {
      console.log('login');
      
      Meteor.loginWithDiscord();
    }
  }
}
</script>