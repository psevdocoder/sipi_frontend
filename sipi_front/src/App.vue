<template>
    <div>
        <AppHeader :isAuthenticated="isAuthenticated" />
        <router-view />
        <AppFooter />
    </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import { computed, onMounted } from "vue";
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

        return {
            isAuthenticated,
        };
    },
};
</script>

<style scoped>
</style>
