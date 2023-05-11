<template>
    <div class="user-info-popup">
        <h2>Ваш профиль</h2>
        <p>Username: {{ userInfo.username }}</p>
        <p>Full Name: {{ userInfo.user_fullname }}</p>
        <p>Personal Cipher: {{ userInfo.personal_cipher }}</p>
        <p>Role: {{ userInfo.role }}</p>
        <button class="exit-button" @click="$emit('close')">Exit</button>
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
    opacity: 1;
    z-index: 999;
}

.exit-button {
    background-color: #ff0000;
    color: #fff;
    font-size: 16px;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    justify-content: center;
    display: flex;
}

</style>
