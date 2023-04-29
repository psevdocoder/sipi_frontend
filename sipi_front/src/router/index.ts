import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from "@/views/Home.vue";
import AppLogin from "@/views/AppLogin.vue";
import SipiQueue from "@/components/SipiQueue.vue";

const routes: Array<RouteRecordRaw> = [
  {path: '', component: Home},
  {path: '/login', component: AppLogin},
  {path: '/queue/:slug', component: SipiQueue, props: true}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
