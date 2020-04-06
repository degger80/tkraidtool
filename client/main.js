import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
// import DatetimePicker from 'vuetify-datetime-picker'


Vue.use(VueMeteorTracker);
Vue.use(Vuetify);

// Vue.use(DatetimePicker);

const opts = {}
const vuetify = new Vuetify(opts)

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.vue';

import router from './router.js';




Meteor.startup(() => {
  new Vue({
    el: '#app',
    router,
    vuetify,
    ...App,
  });

  moment.locale("ru");

});