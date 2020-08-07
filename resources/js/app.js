/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// window.Vue = require('vue');

var Vue = require('vue');

// Vue.component('team-component', require('./components/TeamComponent.vue'));

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);


import teamComponent from './components/TeamComponent.vue';
import playerComponent from './components/PlayerComponent.vue';
// import VueResource from 'vue-resource';
// import BootstrapVue from 'bootstrap-vue';
Vue.component('pagination', require('laravel-vue-pagination'));
// Vue.use(VueResource);
// Vue.use(BootstrapVue);
// Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr("content");

const app = new Vue({
    el: '#app',
    components: {
        'team-component':  teamComponent,
        'player-component':playerComponent
    },
});


 