<template>
    <div class="subject" @click="goToQueue">
        {{ title }}
        {{ queue_list }}

    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {getCookieValue} from "@/views/Home.vue";

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
