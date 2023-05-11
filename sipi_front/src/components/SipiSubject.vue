<template>
    <div @click="goToQueue">
        <div> {{ title }}</div>
        <div> Человек в очереди: {{ queue.length }} </div>
    </div>
</template>

<script>

import {onMounted} from "vue";

export default {
    name: "SipiSubject",
    props: {
        title: String,
        slug: String,
        queue: Array(String),
    },
    methods: {
        goToQueue() {
            this.$router.push({ path: `/queue/${this.slug}` });
        },
    },
};
</script>
