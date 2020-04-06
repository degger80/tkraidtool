<template lang="pug">
  MainLayout.events-page
    header.title Расписание мероприятий
      v-btn.ml-2(
        v-if="isRL"
        color="primary"
        x-small
        outlined 
        fab
        @click = "addEvent"
        )
        v-icon mdi-plus
    v-row
      v-col(v-for="event in upcomingEvents" cols="12" sm="6" lg="4" xl= "3")
        
        v-card.event.gw2(outlined :to="`/event/${event._id}`")
          v-card-title 
            span.bold {{event.eventType}}
            v-spacer
            .title {{event.title}}
          v-card-subtitle.d-flex
            span {{event.approved}} / {{event.maxGroups * 5}} / {{event.subscribed}}
            v-spacer
            .subtitle {{event.ownerUsername}}
          v-card-text 
            .body-1.text--primary {{event.description}}
            .subtitle-2 Начало: {{fmtDate(event.startDateTime)}}
            .body-2.d-flex (по МСК: {{fmtDate(event.startDateTime, true)}})
              v-spacer
              .font-weight-bold {{event.duration}}ч

            
</template>
<script>
import MainLayout from "../layouts/MainLayout";
import { fmtDate } from "/imports/ui/mixins/fmtDate";

import "/imports/api/constants";

export default {
  mixins: [fmtDate],
  components: {
    MainLayout
  },
  meteor: {
    $subscribe: {
      upcomingEvents: []
    },
    upcomingEvents() {
      return CollectionEvents.find({}, { sort: { age: -1 } });
    },
    isRL() {
      return Roles.userIsInRole(Meteor.userId, "rl");
    }
  },
  methods: {
    addEvent() {
      this.$router.push("/add-event");
    }
  }
};
</script>
<style lang="stylus">

.event.gw2:after
  content: "";
  background: url(/images/gw2logo.jpg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  opacity: 0.1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
</style>
