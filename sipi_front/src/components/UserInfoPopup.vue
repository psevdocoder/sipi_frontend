<template>
    <div class="user-info-popup">
        <span class="close-icon" @click="$emit('close')">×</span>
        <h2 style="text-align: center" >Ваш профиль</h2>
        <p>
            Username: {{ userInfo.username }} <br>
            Full Name: {{ userInfo.user_fullname }} <br>
            Personal Cipher: {{ userInfo.personal_cipher }} <br>
            Role: {{ roleDescription }}
        </p>
        <button class="logout-button" @click="logout()">Выйти из учетной записи</button>
    </div>
</template>
<script>
export default {
    name: "UserInfoPopup",
    props: {
        userInfo: {
            type: Object,
            required: true,
        },
    },
    computed: {
        roleDescription() {
            switch (this.userInfo.role) {
                case 1:
                    return "Обычный пользователь";
                case 2:
                    return "Модератор";
                case 3:
                    return "Администратор";
                default:
                    return "Неизвестная роль";
            }
        },
    },
    methods: {
        logout() {
            const cookies = document.cookie.split(";");

            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                location.reload();
            }
        }
    },
};
</script>

<style scoped>
.user-info-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px; /* Добавлено свойство border-radius */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.logout-button {
    background-color: red;
    color: #fff;
    font-size: 16px;
    border: none;
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
    display: block;
    margin: auto;
    margin-top: 5px;
    width: 240px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


.close-icon {
    position: fixed;
    top: 5px;
    right: 12px;
    cursor: pointer;
    font-size: 24px;
    color: #6b6b6b;
}

.close-icon:hover {
    color: #333;
}

</style>