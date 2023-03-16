import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Aboutview from '../views/AboutView.vue';
import Maptest from '../components/MapTest.vue';
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: Aboutview,
    },
    {
        path: '/map',
        name: 'map',
        component: Maptest,
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    base: '/',
    routes,
});

export default router;
