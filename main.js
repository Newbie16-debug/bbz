import './assets/main.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';
//node js 
//tailwind
//axios
//less
//npm install jquery slick-carousel


import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

import Home from './pages/Home.vue';
import Favourites from './pages/Favourites.vue';


const app = createApp(App);

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/favourites', name: 'Favourites', component: Favourites },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router);
app.use(autoAnimatePlugin);

app.mount('#app');
