<template>
    <div class="subject" @click="goToQueue">
        {{ title }}
    </div>
</template>

<script>
export default {
    name: "SipiSubject",
    props: {
        title: String,
        slug: String,
    },
    methods: {
        goToQueue() {
            this.$router.push({ path: `/queue/${this.slug}` });
        },
    },
};
</script>
