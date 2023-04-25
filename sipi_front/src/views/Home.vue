<template>
  <div>
    <h1>Домашняя страница</h1>
    <div v-if="username">Привет, {{ username }}!</div>
    <div v-if="role">Ваша роль - {{ role }}</div>
    <div v-if="personal_cipher">Ваш персональный шифр - {{ personal_cipher }}</div>
    <div v-if="user_fullname">Ваше полное имя - {{ user_fullname }}</div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";

export default {
  name: "AppHome",
  setup() {
    const username = ref("");
    const role = ref("");
    const personal_cipher = ref("");
    const user_fullname = ref("");

    const getCookieValue = (name) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    onMounted(async () => {
      const jwt = getCookieValue('jwt');
      if (jwt) {
        const response = await fetch('https://assistant.5pwjust.ru/api/users/me/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          },
          credentials: 'include',
        });
        if (response.ok) {
          const user = await response.json();
          document.cookie = `user=${JSON.stringify(user)}`; // сохраняем информацию о пользователе в куки
          username.value = user.username; // получаем имя пользователя
          const roleNames = ["пользователь", "модератор", "администратор"];
          role.value = roleNames[user.role - 1];
          personal_cipher.value = user.personal_cipher;
          user_fullname.value = user.user_fullname;
        }
      }
    });

    return {
      username,
      role,
      personal_cipher,
      user_fullname
    }
  }
}
</script>