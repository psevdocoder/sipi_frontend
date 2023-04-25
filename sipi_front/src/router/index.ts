import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from "@/views/Home.vue";
import AppLogin from "@/views/AppLogin.vue";

const routes: Array<RouteRecordRaw> = [
  {path: '', component: Home},
  {path: '/login', component: AppLogin}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
