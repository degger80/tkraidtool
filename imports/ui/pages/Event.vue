<template lang="pug">
  MainLayout
    .event-page(v-if="$subReady.event")
      header.title Запись на мероприятие
      v-row
        v-col(cols="12" sm="3")
          v-card.event.gw2(outlined)
            v-card-title 
              span.bold {{event.eventType}}
              v-spacer
              .title {{event.title}}
            v-card-subtitle.d-flex
              span  {{event.approved}} / {{event.maxGroups * 5}} / {{event.subscribed}}
              v-spacer
              .subtitle {{event.ownerUsername}}
            v-card-text 
              .body-1.text--primary {{event.description}}
              .subtitle-2 Начало: {{fmtDate(event.startDateTime)}}
              .body-2 (по МСК: {{fmtDate(event.startDateTime, true)}})
            v-icon.zxc.pa-4(v-if="isAdmin || (currentUser && currentUser._id === event.ownerId)" @click="del" color="red") mdi-delete

        v-col(v-if="currentUser" cols="12" sm="9")
          Subscribe
      v-row
        v-col(cols="12" md="8")
          v-row
            v-col(cols=12 md="3" v-for="groupNumber in event.maxGroups" :key="groupNumber")
              v-card(outlined :id="`g${groupNumber}`")
                v-list-item Group {{groupNumber}}
                v-divider
                template(v-for="n in 5")
                  v-list-item(
                    :id="`g_${groupNumber}_${n}`"
                    @drop="drop"
                    @dragover.prevent="dropId=`g_${groupNumber}_${n}`"
                    @dragleave.prevent="dropId=null"
                    )
                    v-list-item(
                      v-if="slots[`g_${groupNumber}_${n}`]"
                      :id="slots[`g_${groupNumber}_${n}`]['_id']"
                      :key="n"
                      :eventSlot="slots[`g_${groupNumber}_${n}`]"
                      draggable="true"
                      @dragstart="dragstart"
                      
                      )
                      EventSlot(:eventSlot="slots[`g_${groupNumber}_${n}`]")
                      
                      
                  v-divider
        v-col(cols="12" md="4")
          v-row
            v-col(cols="12" md='6')
              v-card.droppable(
                outlined 
                @drop.stop.prevent="drop" 
                id="available" 
                @dragover.prevent="dropId='available'"
                @dragleave.prevent="dropId=null")

                v-list-item Идут
                v-divider
                v-list-item.tooltip(
                  v-for="item in availableCharacters"
                  :id="item._id" 
                  draggable="true" 
                  @dragstart="dragstart" @dragover.passive
                  :class="{comment:!!item['comment']}"
                  :tooltip="item.comment")
                  span.tooltiptext(v-if="item.comment") {{item.comment}}
                  EventSlot(:eventSlot="item")
                  
            v-col(cols="12" md='6')
              v-card(
                outlined 
                @drop.stop="drop"
                id="reserv"
                @dragover.prevent="dropId='reserv'"
                @dragleave.prevent="dropId=null")

                v-list-item Под вопросом
                v-divider
                
                v-list-item.tooltip(
                  v-for="item in reservCharacters"
                  :id="item._id" 
                  draggable="true" 
                  @dragstart="dragstart"
                  :class="{comment:!!item['comment']}"
                  v-on="on")
                  EventSlot(:eventSlot="item")
                  span.tooltiptext(v-if="item.comment") {{item.comment}}
              v-card.mt-8(
                outlined
                @drop="drop"
                id="canceled"
                @dragover.prevent="dropId='canceled'"
                @dragleave.prevent="dropId=null")
                v-list-item Нешмогла
                v-divider
                v-list-item.tooltip(
                  v-model="item.comment" v-for="item in canceledCharacters"
                  :id="item._id"
                  draggable="true"
                  @dragstart="dragstart"
                  :class="{comment:!!item['comment']}"
                  v-on="on"
                  )
                  EventSlot(:eventSlot="item")
                  span.tooltiptext(v-if="item.comment") {{item.comment}}
</template>
<script>
import MainLayout from "../layouts/MainLayout";
import { fmtDate } from "/imports/ui/mixins/fmtDate";
// import draggable from "vuedraggable";

// components
import Subscribe from "/imports/ui/components/event/Subscribe";
import EventSlot from "/imports/ui/components/event/EventSlot";

export default {
  mixins: [fmtDate],
  data: () => ({
    dropId: null,
  }),
  components: {
    MainLayout,
    Subscribe,
    EventSlot,
    // draggable
  },
  computed: {
    slots() {
      const r = {};

      this.eventSlots.map((el) => {
        if (el.groupId > 0 && el.slotId > 0) {
          r[`g_${el.groupId}_${el.slotId}`] = el;
        }
      });
      return r;
    },
    isAdmin() {
      return Roles.userIsInRole(Meteor.userId, "admin");
    },
  },
  meteor: {
    $subscribe: {
      event() {
        return [this.$route.params.id]; // send the param to the server
      },
      eventSlots() {
        return [this.$route.params.id];
      },
      eventUsersInfo() {
        return [this.$route.params.id];
      },
    },
    event() {
      return CollectionEvents.findOne({ _id: this.$route.params.id });
    },
    eventSlots() {
      return CollectionEventSlots.find({
        eventId: this.$route.params.id,
      });
    },
    currentUser() {
      return Meteor.user();
    },
    availableCharacters() {
      return CollectionEventSlots.find({
        eventId: this.$route.params.id,
        slotId: "available",
      });
    },
    reservCharacters() {
      return CollectionEventSlots.find({
        eventId: this.$route.params.id,
        slotId: "reserv",
      });
    },
    canceledCharacters() {
      return CollectionEventSlots.find({
        eventId: this.$route.params.id,
        slotId: "canceled",
      });
    },
  },
  methods: {
    log(e) {
      console.log(e);
    },
    dragstart: (e) => {
      console.log(e.target.id);

      e.dataTransfer.setData("slotId", e.target.id);
    },
    drop(e) {
      if (!this.dropId) return;
      console.log(this.dropId);
      const slotId = e.dataTransfer.getData("slotId");

      let dropData = this.dropId.split("_");
      if (dropData[0] === "g") {
        Meteor.call("putSlotToGroup", slotId, dropData[1], dropData[2]);
      } else {
        Meteor.call("putSlotToRoster", slotId, dropData[0]);
      }
      Meteor.call("updateCounts", this.$route.params.id);

      console.log(slotId);
    },
    del() {
      console.log("asd");

      // if (confirm("Точно удалить ивент?")) {
      Meteor.call("removeEvent", this.$route.params.id);
      this.$router.push({ name: "home" });
      // }
    },
  },
};
</script>
<style lang="stylus" scoped>
.comment
  border-left 4px solid #2196f3
.zxc
  position absolute
  right 0
  bottom 0
  z-index 1
</style>
