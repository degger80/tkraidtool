<template lang="pug">
  MainLayout.users-page
    UserData(v-for="user, index in userlist" :key="index" :index="index+1" :user="user")
      
</template>
<script>
import MainLayout from "/imports/ui/layouts/MainLayout";
import UserData from "/imports/ui/components/users/UserData";

export default {
  components: {
    MainLayout,
    UserData,
  },
  meteor: {
    $subscribe: {
      userlist: [],
    },
    userlist() {
      return Meteor.users.find({}, { sort: { age: -1 } });
    },
  },
};
</script>
