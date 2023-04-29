<template>
    <div>
        <h1>Очередь</h1>
        <hr class="hr">
        <div class="queue">
            <div class="queue-item" v-for="item in queue" :key="item.id">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
    name: "SipiQueue",
    props: {
        slug: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const queue = ref([]);
        const getCookieValue = (name) => {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    return cookie.substring(name.length + 1);
                }
            }
            return null;
        };

        const slugValue = ref(props.slug);

        // console.log(slugValue.value)

        onMounted(async () => {
            const jwt = getCookieValue("jwt");
            if (jwt) {
                const response = await fetch(`https://assistant.5pwjust.ru/api/queue/?subject=${slugValue.value}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`,
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    queue.value = await response.json();

                    console.log(queue.value)

                }
            }
        });

        return {
            queue,
            slugValue,
        };
    },
};
</script>

<style scoped>
.queue {
    display: flex;
    flex-wrap: wrap;
}

.queue-item {
    margin: 10px;
    padding: 10px;
    border: 4px solid dodgerblue;
    border-radius: 20px;
    transition: all 0.3s ease;
    width: 200px;
    height: 100px;
    word-wrap: break-word;
}
</style>
