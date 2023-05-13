<template>
    <div>
        <nav class="navbar navbar-expand-md bg-transparent mb-4" style="padding-left: 10%; padding-right: 10%">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item" v-bind:class="{ active: $route.path === '/' }">
                            <router-link to="/" class="nav-link">Главная</router-link>
                        </li>
                        <li v-if="userInfo && userInfo.role === 3" class="nav-item" v-bind:class="{ active: $route.path.startsWith('/subjects') }">
                            <router-link to="/subjects/" class="nav-link">Предметы</router-link>
                        </li>
                    </ul>
                </div>
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <button class="btn btn-primary profile-button" @click="openPopup">Профиль</button>
                    </li>
                </ul>
            </div>
            <UserInfoPopup v-if="isPopupOpen" :user-info="userInfo" @close="closePopup"/>
        </nav>
    </div>
</template>

<script>
import UserInfoPopup from './UserInfoPopup.vue';

function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export default {
    name: "AppHeader",
    components: {
        UserInfoPopup,
    },
    computed: {
        hideheader() {
            return !this.isAuthenticated;
        },
        activeLink() {
            return this.$route.path;
        }
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

    mounted() {
        this.userInfo = JSON.parse(getCookie('user'));
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
    color: dimgrey;

}


.profile-button {
    font-size: x-large;
    border-radius: 15px;
    padding: 10px 20px;
    background-color: dodgerblue;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.profile-button:hover:enabled {
    background-color: blue;
}

.nav-item.active .nav-link {
    color: dodgerblue;
}

</style>