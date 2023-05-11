<template v-if="!hideheader">
    <nav class="navbar navbar-expand-md bg-transparent mb-4">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/subjects" class="nav-link">Subjects</router-link>
                    </li>
                </ul>
            </div>

            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item mr-2">
                    <span class="nav-link">Logged in</span>
                </li>
                <li class="nav-item">
                    <button class="btn btn-primary" @click="openPopup">User Info</button>
                </li>
            </ul>
        </div>

        <UserInfoPopup v-if="isPopupOpen" :user-info="userInfo" @close="closePopup"/>
    </nav>
</template>

<script>
import UserInfoPopup from './UserInfoPopup.vue';

export default {
    name: "AppHeader",
    components: {
        UserInfoPopup,
    },
    props: {
        isAuthenticated: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            isPopupOpen: false,
            userInfo: null,
        };
    },

    methods: {
        openPopup() {
            this.isPopupOpen = true;
        },
        closePopup() {
            this.isPopupOpen = false;
        },
    },
};
</script>


<style scoped>

.nav-link {
    font-weight: bold;
    font-size: x-large;
}
.router-link-active {
    text-decoration: underline;
    text-underline-position: under;
    color: blue;

}
</style>
