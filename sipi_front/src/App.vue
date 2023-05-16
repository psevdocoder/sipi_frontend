<template>
    <div style="padding-left: 10%; padding-right: 10%">
        <template v-if="showHeader">
            <AppHeader :isAuthenticated="isAuthenticated" />
        </template>
        <div id="content-wrap">
            <router-view />
        </div>
        <AppFooter/>
    </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import {computed, onMounted, reactive, ref} from "vue";
import { useRouter } from "vue-router";

export default {
    name: "App",
    components: {
        AppFooter,
        AppHeader,
    },
    setup() {
        const router = useRouter();

        // проверяем, авторизован ли пользователь
        const isAuthenticated = computed(() => {
            const token = getCookieValue("jwt");
            return token !== null && token !== "";
        });

        // проверяем, нужно ли перенаправить пользователя на страницу входа
        onMounted(() => {
            if (!isAuthenticated.value) {
                router.push("/login");
            }
        });

        const getCookieValue = (name) => {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    return cookie.substring(name.length + 1);
                }
            }
            return null;
        };

        const showHeader = computed(() => {
            return router.currentRoute.value.path !== "/login";
        });

        // переменная для отображения мини-окна с информацией о профиле
        const showProfileInfo = ref(false);

        // информация о пользователе, полученная с сервера
        const user = reactive(JSON.parse(getCookieValue("user")));

        return {
            isAuthenticated,
            showHeader,
            showProfileInfo,
            user
        };
    },
};
</script>

<style scoped>

</style>
