import Vue from 'vue';
import VueRouter from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import StudioNavBar from '@/components/StudioNavBar.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      NavBar,
      default: () => import('@/views/Home.vue'),
    },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/Auth/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/Auth/SignUp.vue'),
  },
  {
    path: '/setting',
    name: 'Setting',
    components: {
      StudioNavBar,
      default: () => import('@/views/Setting.vue'),
    },
  },
  {
    path: '/VuetubeStudio',
    components: {
      StudioNavBar,
      default: () => import('@/views/VuetubeStudio.vue'),
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/VuetubeStudio/Dashboard.vue'),
      },
      {
        path: 'contents',
        name: 'Contents',
        component: () => import('@/views/VuetubeStudio/Contents.vue'),
      },
    ],
  },
  {
    path: '/channel/:id',
    components: {
      NavBar,
      default: () => import('@/views/Channel.vue'),
    },
    children: [
      {
        path: '/',
        name: 'ChannelView',
        components: {
          default: () => import('@/views/Channel/ChannelView.vue'),
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
