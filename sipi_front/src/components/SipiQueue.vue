<template>
    <div>
        <loading-overlay :load-data="loadData">
            <div>
                <h2 style="text-align: center" >Очередь на "{{ title }}"</h2>
                <div v-if="isOpen" style="text-align: center; font-weight: bold; color: green">Очередь открыта</div>
                <div v-else style="text-align: center; font-weight: bold; color: red">Очередь закрыта</div>
                <div class="queue">
                    <div class="queue-item" v-for="(item, index) in queue" :key="item.id">
                        Номер в очереди: {{ index+1 }}
                        <br>
                        Имя: {{ item.user_fullname }}
                        <br>
                        Пользователь в очереди с {{ new Date(item.timestamp).toLocaleString() }}
                        <br>
                    </div>
                    <div>
                        <button class="queue-button" @click="joinQueue" :disabled="isInQueue() || !isOpen">Встать в очередь</button>
                        <button class="queue-button" @click="leaveQueue" :disabled="!isInQueue()">Выйти из очереди</button>
                    </div>
                </div>
            </div>
        </loading-overlay>
    </div>
</template>


<script>
import LoadingOverlay from "@/components/LoadingOverlay";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "SipiQueue",
    components: {
        LoadingOverlay,
    },
    props: {
        slug: {
            type: String,
            required: true,
        },
    },

    // computed: {
    //     isOpen() {
    //         return this.queue_is_open === "true";
    //     }
    // },

    setup(props) {
        const route = useRoute();
        const title = ref("");
        const queue_is_open = ref("");
        const slugValue = ref(props.slug);
        const isOpen = ref(false);

        onMounted(() => {
            title.value = route.query.title || "";
            queue_is_open.value = route.query.queue_is_open;
        });


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


        const loadData = async () => {
            const jwt = getCookieValue("jwt");
            if (jwt) {
                const response = await fetch(`https://assistant.5pwjust.ru/api/queue/filtered/?subject=${slugValue.value}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    const responseData = await response.json();
                    queue.value = responseData.queue_persons;
                    queue_is_open.value = responseData.is_open;
                    title.value = responseData.subject_name;
                    isOpen.value = responseData.is_open;
                }
            }
        };




        const isInQueue = () => {
            const user = JSON.parse(getCookieValue("user"));
            return queue.value.some(item => item.username === user.username);
        };

        const joinQueue = async () => {
            const jwt = getCookieValue("jwt");
            if (jwt) {
                const response = await fetch(`https://assistant.5pwjust.ru/api/queue/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    credentials: "include",
                    body: JSON.stringify({ subject: slugValue.value }),
                });
                if (response.ok) {
                    await loadData();
                }
            }
        };

        const leaveQueue = async () => {
            const jwt = getCookieValue("jwt");
            if (jwt) {
                const response = await fetch(`https://assistant.5pwjust.ru/api/queue/${slugValue.value}/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    await loadData();
                }
            }
        };







        return {
            queue,
            slugValue,
            title,
            loadData,
            leaveQueue,
            joinQueue,
            isInQueue,
            queue_is_open,
            isOpen
        };
    },
};
</script>
<style scoped>
.queue {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.queue-item {
    margin: 5px 0;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 80%;
    max-width: 600px;
}

.queue-button {
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 15px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    margin: 0 10px;
}

.queue-button:enabled {
    background-color: dodgerblue;
    color: #fff;
}

.queue-button:disabled {
    background-color: #ddd;
    color: #666;
    cursor: not-allowed;
}

.queue-button:hover:enabled {
    background-color: #2389cd;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}

</style>