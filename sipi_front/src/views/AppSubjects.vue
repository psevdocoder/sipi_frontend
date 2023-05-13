<template>
    <loading-overlay :load-data="loadData">
        <div class="subjects">
            <div class="subject" v-for="subject in subjects" :key="subject.id"
                 :class="{ 'green': subject.queue_is_open, 'red': !subject.queue_is_open }">
                <p> {{subject.title}} </p>
                <button class="open" v-if="!subject.queue_is_open"  @click="openQueue(subject.slug)">Открыть для очереди</button>
                <button class="close" v-if="subject.queue_is_open" @click="closeQueue(subject.slug)">Закрыть для очереди</button>
            </div>
        </div>
    </loading-overlay>
</template>


<script>
import {ref} from "vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default {
    name: "AppSubjects",
    components: {LoadingOverlay},
    setup() {
        const subjects = ref([]);

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

        async function loadData() {
            const jwt = getCookieValue("jwt");
            const response = await fetch("https://assistant.5pwjust.ru/api/subjects/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                subjects.value = data.sort((a, b) => a.id - b.id);
            }
        }

        async function openQueue(subjectSlug) {
            const jwt = getCookieValue("jwt");
            const response = await fetch("https://assistant.5pwjust.ru/api/subjects/access/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    "subject_slug": subjectSlug,
                    "is_open": true
                })
            });
            if (response.ok) {
                await loadData();
            }
        }

        async function closeQueue(subjectSlug) {
            const jwt = getCookieValue("jwt");
            const response = await fetch("https://assistant.5pwjust.ru/api/subjects/access/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    "subject_slug": subjectSlug,
                    "is_open": false
                })
            });
            if (response.ok) {
                await loadData();
            }
        }

        // loadData();

        return {
            subjects,
            loadData,
            openQueue,
            closeQueue
        };
    },
};
</script>


<style>

.subjects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.subject {
    width: 200px;
    margin: 20px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
}
.subject.green {
    background-color: #c8e6c9;
}
.subject.red {
    background-color: #ffcdd2;
}
.subject p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
.subject button {
    margin-top: auto;
    padding: 10px 20px;
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border-radius: 15px;
}
.subject button.open {
    background-color: #2196f3;
}
.subject button.close {
    background-color: #2196f3;
}
</style>
