import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "../pages/Home.vue";
import AddAnimeAuto from "../pages/AddAnimeAuto.vue";
import AddAnimeManual from "../pages/AddAnimeManual.vue";
import Digest from '../pages/Digest.vue';
import Schedule from '../pages/Schedule.vue';
import Settings from '../pages/Settings.vue';
import Anime from '../pages/Anime.vue';


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/add-anime",
        name: "AddAnimeAuto",
        component: AddAnimeAuto
    },
    {
        path: "/add-anime-manual",
        name: "AddAnimeManual",
        component: AddAnimeManual
    },
    {
        path: "/mal-digest",
        name: "Digest",
        component: Digest
    },
    {
        path: "/schedule",
        name: "Schedule",
        component: Schedule
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings
    },
    {
        path: "/anime/:id",
        name: "Anime",
        props: true,
        component: Anime
    }
]


const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes
})

export default router