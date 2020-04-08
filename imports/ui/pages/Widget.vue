<template lang="pug">
  .event-calendar
    .days-navigation
      a.day-button.home(href="/" target="_blank") РейдТул
      a.day-button(
        v-for="item, index in days" 
        :key="index" 
        href="#" 
        @click="chooseDate(item.date)"
        :class="{active:date===item.date}"
        ) {{fmt(item.date)}} [{{item.count}}]
    EventsOfDay(:date="date" v-on:sendHeight="sendHeight")
    
</template>
<script>
import EventsOfDay from "/imports/ui/components/event/EventsOfDay";
export default {
  components: {
    EventsOfDay,
  },
  data: () => ({
    date: null,
    days: [],
  }),

  mounted() {
    const self = this;
    Meteor.call(
      "getUpcomingEventsDays",
      moment().utcOffset(),
      (error, data) => {
        // console.log(data);

        self.days = data.map((el) => {
          el.date = new Date(el._id.year, el._id.month - 1, el._id.day);
          return el;
        });

        self.chooseDate(self.days && self.days[0] && self.days[0].date);
      }
    );
  },

  methods: {
    chooseDate(date) {
      // console.log(date);

      this.date = date;
    },
    fmt(date) {
      return moment(date).calendar(null, {
        sameDay: "[Сегодня]",
        nextDay: "[Завтра] dd DD.MM",
        nextWeek: "dd DD.MM",
        sameElse: "dd DD.MM",
      });
    },
    sendHeight() {
      console.log("updated");
      const height = document.documentElement.offsetHeight;
      parent.postMessage(height, "*");
    },
  },
};
</script>
<style lang="stylus">
.event-calendar{
  border-radius: 4px;
  background: rgb(250, 250, 250);
  padding: 10px;
  margin-top: 10px;
  border: 1px solid rgb(211, 211, 211);
  font-size: 14px;
  a{
    text-decoration: none;
  }

  .event-day{

    .events{
      display flex;
      flex-flow row wrap
      padding-top: 25px;
      .event-descriptions{
        padding-right: 15px;


        a.event-description{
          display: block;
          height: 22px;
          margin: 2px 0;
          line-height: 22px;
          cursor: pointer;
          color: white;
          position: relative;
          padding: 0 40px 0 10px;
          background-color: #000;
          border-radius: 8px;
          span.et{
            position: absolute;
            right: 7px;
            color: white;

          }
          &.wvw{
            background-color: #b71c1c;
          }

          &.pve{
            background-color: #0d47a1;
          }
          &.gm{
            background-color: #1b5e20;
          }
        }
      }
      .event-timelines{


        flex 1 1 1%;
        position: relative;
        .time-stamp{
          flex-flow column no-wrap;
          border-left: 1px solid #ccc;
          position: absolute;
          top: -20px;
          z-index: 0;
          padding-left: 5px;
          background-color: rgb(250, 250, 250);
          box-shadow: 0 0 15px 5px rgb(250, 250, 250);
        }

        .event-timeline{
          display: block;
          width: 100%;
          height: 22px;
          margin: 2px 0;
          position: relative;


          a.line{
            display: block;
            position: absolute;
            z-index: 10;
            background-color: #ddd;
            border: 1px solid rgba(#000, 0.2);
            color: #666;
            height: 21px;
            top: 0;
            border-radius: 3px;
            text-align: center;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 10px;
          }

          &:hover{
            a.line{
              background-color: #eef;
              border: 1px solid rgba(#00f, 0.2);
              color: rgba(#00f, 0.4);
              font-weight: bold;
            }
          }
        }

      }
    }
  }

  .days-navigation{
    text-align: center;

    a.day-button{
      display: inline-block;
      padding: 2px 10px;
      margin: 0px 5px 5px 5px;
      background-color: #757575;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      color: #fff;

      &.active{
        background-color: #1e88e5;
        border-color: #90caf9;
      }
      &.home{
        background-color: #fff;
        font-weight: bold;
        border-color: #90caf9;
        color: #1e88e5;
        float: left;
        margin-left: 0;
      }
    }
  }

}
</style>
