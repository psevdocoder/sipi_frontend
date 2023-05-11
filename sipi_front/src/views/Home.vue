<template>
    <div>
        <h1 style="text-align: center">Список предметов</h1>
        <div class="subjects subjects-wrapper">
            <SipiSubject class="subject-item"  v-for="subject in subjects" :key="subject.id" :title="subject.title" :slug="subject.slug" />
        </div>
    </div>
</template>


<script>
import SipiSubject from "@/components/SipiSubject.vue";
import {onBeforeMount, onMounted, ref} from "vue";

export default {
    name: "AppHome",
    components: {
        SipiSubject,
    },
    setup() {
        const subjects = ref([]);
        const username = ref("");
        const role = ref("");
        const personal_cipher = ref("");
        const user_fullname = ref("");
        const queue_list = ref([])

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

        const jwt = getCookieValue("jwt")
        onBeforeMount(() => {
            const response_subject_queue = fetch(`https://assistant.5pwjust.ru/api/queue/?subject=${this.slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                credentials: "include",
            });
            if (response_subject_queue.ok) {
                queue_list.value = response_subject_queue.json();
            }

        });


        onMounted(async () => {
            const user = getCookieValue("user");
            const jwt = getCookieValue("jwt");

            username.value = user.username; // получаем имя пользователя
            const roleNames = ["пользователь", "модератор", "администратор"];
            role.value = roleNames[user.role - 1];
            personal_cipher.value = user.personal_cipher;
            user_fullname.value = user.user_fullname;


            const subjectsCookie = getCookieValue("subjects");
            if (!subjectsCookie && jwt) {
                const response_subjects = await fetch("https://assistant.5pwjust.ru/api/subjects/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    credentials: "include",
                });
                if (response_subjects.ok) {
                    const subjectsList = await response_subjects.json();
                    document.cookie = `subjects=${JSON.stringify(subjectsList)}`;
                    subjects.value = subjectsList;
                }
            } else {
                subjects.value = JSON.parse(subjectsCookie);
            }
        });


        return {
            subjects,
            username,
            role,
            personal_cipher,
            user_fullname,
            getCookieValue
        };
    },
};
</script>


<style>
.subjects {
    display: flex;
    flex-wrap: wrap;
}

.hr {
    position: relative;
    height: 2px;
    background-color: rgb(30, 104, 152);
    margin: 20px 0;
    border: none;
}

.subject-item {
    margin: 10px;
    padding: 10px;
    border: 4px solid dodgerblue;
    border-radius: 20px;
    transition: all 0.3s ease;
    width: 200px;
    height: 100px;
    word-wrap: break-word;
}

.subjects-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}






</style>
