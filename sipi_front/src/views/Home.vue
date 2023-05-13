<template>
    <loading-overlay :load-data="loadData">
        <div>
            <h2 style="text-align: center">Список предметов</h2>
            <div class="subjects subjects-wrapper">
                <SipiSubject
                    class="subject-item"
                    v-for="subject in subjects"
                    :key="subject.id"
                    :title="subject.title"
                    :slug="subject.slug"
                    :queue="subject.queue"
                />
            </div>
        </div>
    </loading-overlay>
</template>
<script>
import SipiSubject from "@/components/SubjectMini.vue";
import { ref } from "vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default {
    name: "AppHome",
    components: {
        LoadingOverlay,
        SipiSubject,
    },
    setup() {
        const subjects = ref([]);
        const username = ref("");
        const role = ref("");
        const personal_cipher = ref("");
        const user_fullname = ref("");

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

        const fetchSubjectQueue = async (subjectSlug, jwt) => {
            const response = await fetch(
                `https://assistant.5pwjust.ru/api/queue/?subject=${subjectSlug}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    credentials: "include",
                }
            );
            if (response.ok) {
                return await response.json();
            }
            return null;
        };

        const loadData = async () => {
            const jwt = getCookieValue("jwt");
            const user = getCookieValue("user");

            username.value = user.username; // получаем имя пользователя
            personal_cipher.value = user.personal_cipher;
            user_fullname.value = user.user_fullname;

            const subjectsCookie = getCookieValue("subjects");
            if (jwt) {
                const response_subjects = await fetch(
                    "https://assistant.5pwjust.ru/api/subjects/",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        },
                        credentials: "include",
                    }
                );
                if (response_subjects.ok) {
                    const subjectsList = await response_subjects.json();
                    document.cookie = `subjects=${JSON.stringify(subjectsList)}`;

                    // запрос очередей для каждого предмета
                    const promises = subjectsList.map(async (subject) => {
                        const queue = await fetchSubjectQueue(subject.slug, jwt);
                        return {
                            ...subject,
                            queue: queue,
                        };
                    });
                    subjects.value = await Promise.all(promises);
                }
            } else {
                subjects.value = JSON.parse(subjectsCookie);
            }
        };

        return {
            subjects,
            username,
            role,
            personal_cipher,
            user_fullname,
            getCookieValue,
            loadData,
        };
    },
};
</script>


<style>
.subjects {
    display: flex;
    flex-wrap: wrap;
}

.subject-item {
    margin: 10px;
    padding: 10px;
    border: 4px solid dodgerblue;
    border-radius: 20px;
    transition: all 0.3s ease;
    width: 17%;
    height: auto;
    word-wrap: break-word;
    cursor: pointer;
    background-color: #fff;
    box-shadow: 0 5px 40px rgba(30, 144, 255, 0.34);
    background-color: rgba(220, 236, 255, 0.62);
}

.subject-item:hover {
    background-color: dodgerblue;
    color: #fff;
}


.subjects-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>
