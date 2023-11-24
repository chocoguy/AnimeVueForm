import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    }
]


const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes
})

export default router