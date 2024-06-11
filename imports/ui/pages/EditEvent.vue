<template lang="pug">
  MainLayout
    v-row
      v-col
        v-card
          v-card-title Редактировать ивент
          v-card-text(v-if="event")
            form
              v-row
                v-col(cols="12" md="3")
                  DatetimePicker(
                    label="Начало ивента"
                    v-model="event.startDateTime"
                    date-format="dd.MM.yyyy"
                    time-format="HH:mm"
                    :time-picker-props="timeProps"
                    :textFieldProps = {outlined:true})
                
                v-col(cols="12" md="7")
                  v-text-field(
                    outlined
                    v-model="event.title"
                    label="Наименование ивента"
                  )
                v-col(cols="12" md="2")
                  v-select(outlined v-model="event.eventType" :items="items")
                
                v-col(cols="12" md="8")
            
                  v-text-field(
                    outlined
                    v-model="event.description"
                    label="Напутствие / Описание"
                  )
                v-col(cols="12" sm="2")
                  v-select(outlined label="Количество групп" v-model="event.maxGroups" :items="[1,2,3,4,5,6,7,8,9,10]")
                v-col(cols="12" sm="2")
                  v-select(outlined label="Длительность в часах" v-model="event.duration" :items="[1,2,3,4]")
                v-col(cols="12")
                  v-btn(@click="save" color="primary") Save
          
</template>
<script>
import MainLayout from "../layouts/MainLayout";
import DatetimePicker from "/imports/ui/components/DatetimePicker";

export default {
  data: () => ({
    datePicker: moment().format("YYYY-MM-DD"),
    timePicker: moment().format("HH:mm"),
    timeProps: {
      format: "24hr",
    },
    items: ["wvw", "pve", "pvp"],
  }),
  components: {
    MainLayout,
    DatetimePicker,
  },
  meteor: {
    $subscribe: {
      event() {
        return [this.$route.params.id]; // send the param to the server
      },
    },
    event() {
      return CollectionEvents.findOne({ _id: this.$route.params.id });
    },
    currentUser() {
      return Meteor.user();
    },
  },
  mounted() {
    if (!Roles.userIsInRole(Meteor.userId, "rl")) this.$router.push("/");
  },
  methods: {
    save() {
      console.log("save");
      const self = this;

      CollectionEvents.update(
        {
          _id: this.event._id,
        },
        {
          $set: {
            title: this.event.title,
            description: this.event.description,
            eventType: this.event.eventType,
            maxGroups: this.event.maxGroups,
            startDateTime: this.event.startDateTime,
            duration: this.event.duration,
          },
        },
        function (err, result) {
          if (err) console.log(err);
          else {
            console.log("successfuly updated");
          }
          self.$router.push({ name: "home" });
        }
      );
    },
  },
};
</script>
