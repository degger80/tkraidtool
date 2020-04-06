<template lang="pug">
  MainLayout
    v-row
      v-col
        v-card
          v-card-title Добавить ивент
          v-card-text
            form
              v-row
                v-col(cols="12" md="3")
                  DatetimePicker(
                    label="Начало ивента"
                    v-model="datetime"
                    date-format="dd.MM.yyyy"
                    time-format="HH:mm"
                    :time-picker-props="timeProps"
                    :textFieldProps = {outlined:true})
                
                v-col(cols="12" md="7")
                  v-text-field(
                    outlined
                    v-model="title"
                    label="Наименование ивента"
                  )
                v-col(cols="12" md="2")
                  v-select(outlined v-model="eventType" :items="items")
                
                v-col(cols="12" md="8")
            
                  v-text-field(
                    outlined
                    v-model="description"
                    label="Напутствие / Описание"
                  )
                v-col(cols="12" sm="2")
                  v-select(outlined label="Количество групп" v-model="maxGroups" :items="[1,2,3,4,5,6,7,8]")
                v-col(cols="12" sm="2")
                  v-select(outlined label="Длительность в часах" v-model="duration" :items="[1,2,3,4]")
                v-col(cols="12")
                  v-btn(@click="save" color="primary") Добавить
          
</template>
<script>
import MainLayout from "../layouts/MainLayout";
import DatetimePicker from "/imports/ui/components/DatetimePicker";

export default {
  data: () => ({
    title: "",
    description: "",
    eventType: "wvw",
    datetime: "",
    datePicker: moment().format("YYYY-MM-DD"),
    timePicker: moment().format("HH:mm"),
    maxGroups: 8,
    duration: 1,
    timeProps: {
      format: "24hr"
    },
    items: ["wvw", "pve", "pvp"]
  }),
  components: {
    MainLayout,
    DatetimePicker
  },
  meteor: {
    $subscribe: {
      events: []
    },
    events() {
      return CollectionEvents.find({}, { sort: { age: -1 } });
    },
    currentUser() {
      return Meteor.user();
    }
  },
  mounted() {
    if (!Roles.userIsInRole(Meteor.userId, "rl")) this.$router.push("/");
  },
  methods: {
    save() {
      console.log("save");
      console.log(this.datetime);

      const self = this;

      var insertObj = {
        title: this.title,
        description: this.description,
        eventType: this.eventType,
        maxGroups: this.maxGroups,
        startDateTime: this.datetime,
        duration: this.duration
      };

      console.log(insertObj);

      CollectionEvents.insert(insertObj, function(err, result) {
        if (err) console.log(err);
        else console.log("successfuly created");
        self.$router.push({ name: "home" });
      });
    }
  }
};
</script>
