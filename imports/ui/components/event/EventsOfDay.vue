<template lang="pug">
  .event-day
    .events(v-if="$subReady.eventsOfTheDay")
      .event-descriptions
        EventDescription(v-for="item in eventsOfTheDay" :item="item")
      .event-timelines
        EventTimeStamp(v-for="item in eventsOfTheDay"  :item="item" :minDate="borders.minDate" :maxDate="borders.maxDate" :eventCount="eventCount")
        EventTimeline(v-for="item in eventsOfTheDay"  :item="item" :minDate="borders.minDate" :maxDate="borders.maxDate")
        
        
</template>
<script>
import EventDescription from "/imports/ui/components/event/EventDescription";
import EventTimeStamp from "/imports/ui/components/event/EventTimeStamp";
import EventTimeline from "/imports/ui/components/event/EventTimeline";

export default {
  components: {
    EventDescription,
    EventTimeStamp,
    EventTimeline,
  },
  props: ["date"],

  meteor: {
    $subscribe: {
      eventsOfTheDay() {
        return [this.date, moment().utcOffset()]; // send the param to the server
      },
    },
    eventsOfTheDay() {
      return CollectionEvents.find({}, { sort: { startDateTime: 1 } });
    },
  },
  computed: {
    borders() {
      let minDate = moment().startOf("day").toDate();
      let maxDate = moment().endOf("day").toDate();
      this.eventsOfTheDay.map((eventData, index) => {
        if (index === 0) {
          minDate = eventData.startDateTime;
          maxDate = moment(eventData.startDateTime)
            .add(eventData.duration, "hours")
            .toDate();
        } else {
          minDate =
            minDate > eventData.startDateTime
              ? eventData.startDateTime
              : minDate;
          let eventEndTime = moment(eventData.startDateTime)
            .add(eventData.duration, "hours")
            .toDate();
          maxDate = maxDate < eventEndTime ? eventEndTime : maxDate;
        }
      });

      return {
        minDate,
        maxDate,
      };
    },

    eventCount() {
      console.log(this.eventsOfTheDay);

      return this.eventsOfTheDay.length;
    },
  },
};
</script>
