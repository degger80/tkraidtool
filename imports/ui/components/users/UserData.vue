<template lang="pug">
  v-list-item \#{{index}} {{user.username}}
    v-checkbox.ml-12(v-model="isAdmin" label="Admin" color="red" @change="toggleAdmin")
    v-checkbox.ml-12(v-model="isRL" label=" RaidLeader" color="green" @change="toggleRL")
</template>
<script>
export default {
  props: ["user", "index"],
  data() {
    return {
      isAdmin: Roles.userIsInRole(this.user._id, "admin"),
      isRL: Roles.userIsInRole(this.user._id, "rl"),
    };
  },
  methods: {
    toggleAdmin() {
      const self = this;
      Meteor.call("toggleAdmin", this.user._id, (err, res) => {
        if (err) console.log(err);

        self.isAdmin = Roles.userIsInRole(self.user._id, "admin");
      });
    },
    toggleRL() {
      const self = this;
      Meteor.call("toggleRL", this.user._id, (err, res) => {
        if (err) console.log(err);
        self.isRL = Roles.userIsInRole(self.user._id, "rl");
      });
    },
  },
};
</script>
