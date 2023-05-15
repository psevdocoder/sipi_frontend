import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from "@/views/AppHome.vue";
import AppLogin from "@/views/AppLogin.vue";
import SipiQueue from "@/components/SipiQueue.vue";
import AppSubjects from "@/views/AppSubjects.vue";

const routes: Array<RouteRecordRaw> = [
  {path: '', component: Home},
  {path: '/login', component: AppLogin},
  {path: '/queue/:slug', component: SipiQueue, props: true},
  {path: '/subjects/', component: AppSubjects}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
