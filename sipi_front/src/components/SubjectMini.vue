<template>
    <div @click="goToQueue">
        <div style="font-weight: bolder"> {{ title }}</div>
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
        queue_is_open: String,
    },
    methods: {
        goToQueue() {
          console.log(this.is_open)
            this.$router.push({
                path: `/queue/${this.slug}`,
                query: { title: this.title, queue_is_open: this.queue_is_open }, // передача названия предмета через query параметр
            });
        },
    },
};
</script>
