<template>
    <div @click="goToQueue">
        <div> {{ title }}</div>
        <div> Человек в очереди: {{ queue.length }} </div>
    </div>
</template>

<script>

export default {
    name: "SubjectMini",
    props: {
        title: String,
        slug: String,
        queue: Array(String),
    },
    methods: {
        goToQueue() {
            this.$router.push({
                path: `/queue/${this.slug}`,
                query: { title: this.title }, // передача названия предмета через query параметр
            });
        },
    },
};
</script>
