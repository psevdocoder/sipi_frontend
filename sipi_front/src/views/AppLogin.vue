<template>
    <main class="form-signin w-100 m-auto">
        <h1 class="text-center">Sign in</h1>
        <form @submit.prevent="submit" >
            <div class="form-floating">
                <input v-model="data.username" type="text" class="form-control" id="floatingInput" placeholder="Username">
                <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating">
                <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
        <div v-if="data.errorMessage" class="error-message">{{ data.errorMessage }}</div> <!-- добавляем элемент для вывода сообщения об ошибке -->
    </main>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
    name: "AppLogin",
    setup() {
        const data = reactive({
            username: "",
            password: "",
            errorMessage: null,
        });

        const router = useRouter();

        const submit = async () => {
            const response = await fetch("https://assistant.5pwjust.ru/api/auth/jwt/create/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.status == 400 || response.status == 401) {
                const errorResponse = await response.json();
                data.errorMessage = errorResponse.detail;
            } else {
                const responseData = await response.json();
                document.cookie = `jwt=${responseData.access}`;

                // Получаем данные о профиле пользователя
                const profileResponse = await fetch("https://assistant.5pwjust.ru/api/users/me/", {
                    headers: { Authorization: `Bearer ${responseData.access}` },
                });
                const profileData = await profileResponse.json();
                document.cookie = `user=${JSON.stringify(profileData)}`;

                await router.push("/");
            }
        };

        return {
            data,
            submit,
        };
    },
};
</script>

<style scoped>
.form-signin {
    max-width: 330px;
    padding: 8px;
}

.text-center {
    text-align: center;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.error-message {
    color: red;
}
</style>
