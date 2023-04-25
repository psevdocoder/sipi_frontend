<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4" v-if="!hideHeader">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link"> Home </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/subjects" class="nav-link"> Subjects </router-link>
                    </li>
                </ul>
            </div>

            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item mr-2">
                    <span class="nav-link"> Logged in </span>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "AppHeader",
    props: {
        isAuthenticated: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
