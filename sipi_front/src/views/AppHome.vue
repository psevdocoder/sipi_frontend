<template>
    <div class="subjects-home">
        <LoadingOverlay :loadData="fetchData">
            <div class="subjects-wrapper">
                <div v-for="(subject, index) in subjects" :key="index" @click="goToQueuePage(subject.slug)" class="subject-item"
                     :class="{'subject-item-open': subject.queue_is_open, 'subject-item-closed': !subject.queue_is_open}">

                    <h5>{{ subject.title }}</h5>
                    <p v-if="subject.queue_is_open">Очередь открыта</p>
                    <p v-else>Очередь закрыта</p>
                    <p>{{ getNumberOfPeople(subject.slug) }} человек в очереди</p>
                </div>
            </div>
        </LoadingOverlay>
    </div>
</template>

<script>
import LoadingOverlay from "@/components/LoadingOverlay";

export default {
    components: {
        LoadingOverlay,
    },
    data() {
        return {
            queue: [],
            subjects: [],
        };
    },

    methods: {
        getCookieValue(name) {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    return cookie.substring(name.length + 1);
                }
            }
            return null;
        },
        fetchData() {
            const jwt = this.getCookieValue("jwt");
            return Promise.all([
                fetch("https://assistant.5pwjust.ru/api/queue/", {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }),
                fetch("https://assistant.5pwjust.ru/api/subjects/", {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }),
            ])
                .then(([queueResponse, subjectsResponse]) =>
                    Promise.all([queueResponse.json(), subjectsResponse.json()])
                )
                .then(([queueData, subjectsData]) => {
                    this.queue = queueData;
                    this.subjects = subjectsData;
                });
        },
        getNumberOfPeople(subjectSlug) {
            const filteredQueue = this.queue.filter((item) => item.subject === subjectSlug);
            return filteredQueue.length;
        },
        goToQueuePage(slug) {
            this.$router.push(`/queue/${slug}/`);
        },
    },
};
</script>

<style>
.subjects-home {
    display: flow;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.subjects-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.subject-item {
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
    transition: all 0.3s ease;
    line-height: 0.1;
    min-width: 150px;
    max-width: 250px;
    height: auto;
    word-wrap: break-word;
    cursor: pointer;
    color: white;
    box-shadow: 0 5px 40px rgba(30, 144, 255, 0.34);
    background-color: rgba(220, 236, 255, 0.62);
}

.subject-item-open {
    box-shadow: 0 10px 40px #008000A5;
    background-color: #3CB371FF;
}

.subject-item-closed {
    box-shadow: 0 10px 40px #FF4400BA;
    background-color: #FF4D00DA;
    color: white;
}


.subject-item:hover {
    transform: scale(1.05);
    transition: all 0.3s ease; /* плавный переход в течение 0.3 секунд */
}
</style>
