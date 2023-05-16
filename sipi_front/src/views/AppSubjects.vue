<template>
    <loading-overlay :load-data="loadData">
        <div class="subjects">
            <div v-for="subject in subjects" :key="subject.id" class="subject"
                 :class="{ 'green': subject.queue_is_open, 'red': !subject.queue_is_open }">
                <button class="btn-subjects btn-delete" @click="deleteSubject(subject.slug)">X</button>
                <h2 class="subject__title">{{ subject.title }}</h2>
                <button v-if="!subject.queue_is_open" class="btn-subjects btn-primary" @click="openQueue(subject.slug)">Открыть для очереди</button>
                <button v-else class="btn-subjects btn-primary" @click="closeQueue(subject.slug)">Закрыть для очереди</button>
            </div>
        </div>
        <form @submit.prevent="createSubject" class="new-subject-form">
            <input id="title" type="text" v-model="newSubjectTitle" class="new-subject-form__input" placeholder="Название нового предмета" required>
            <button type="submit" class="btn-subjects btn-primary new-subject-form__submit">Создать</button>
        </form>
    </loading-overlay>
</template>



<script>
import { ref } from "vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default {
    name: "AppSubjects",
    components: {LoadingOverlay},
    setup() {
        const newSubjectTitle = ref("")
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

        async function deleteSubject(slug) {
            console.log(slug)
            const jwt = getCookieValue("jwt");
            const response = await fetch(`https://assistant.5pwjust.ru/api/subjects/${slug}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                credentials: "include"
            });
            if (response.ok) {
                await loadData();
            }
        }


        async function createSubject() {
            const jwt = getCookieValue("jwt");
            const response = await fetch("https://assistant.5pwjust.ru/api/subjects/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                credentials: "include",
                body: JSON.stringify({ title: newSubjectTitle.value })
            });
            if (response.ok) {
                newSubjectTitle.value = '';
                await loadData();
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
            closeQueue,
            createSubject,
            deleteSubject,
            newSubjectTitle,
        };
    },
};
</script>


<style>
.subjects {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}

.subject {
    max-width: 250px;
    min-width: 150px;
    height: max-content;
    transition: all 0.3s ease;
    margin: 20px;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    color: white;
}

.subject__title {
    font-size: medium;
    font-weight: bold;
    margin-bottom: 10px;
}

.subject.green {
    box-shadow: 0 10px 40px #008000A5;
    background-color: #3CB371FF;
}
.subject.red {
    box-shadow: 0 10px 40px #FF4400BA;
    background-color: #FF4D00DA;
    /*color: black;*/
}

.subject:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out; /* плавный переход в течение 0.3 секунд */
}


.btn-subjects {
    margin-top: auto;
    padding: 5px 5px;
    border: none;
    color: #fff;
    font-size: small;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border-radius: 15px;
}

.btn-primary {
    background-color: royalblue;
}

.new-subject-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 7%;
}


.new-subject-form__input {
    padding: 10px;
    border-radius: 15px;
    border: 2px solid #ddd;
    width: 110%;
    max-width: 400px;
    margin-bottom: 10px;

}

.btn-delete {
    background-color: #de0000;
    width: 25px;
    height: 25px;
    font-size: 14px;
    padding: 0;
    top: 0;
    left: 0;
    line-height: 1;
}

.btn-delete:hover {
    transform: scale(1.1);
    transition: all 0.3s ease-out; /* плавный переход в течение 0.3 секунд */
}

.new-subject-form__submit {
    background-color: #2196f3;
    width: 60%;
    max-width: 400px;
}
</style>
