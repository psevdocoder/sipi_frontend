<template>
    <div>
        <h1>Домашняя страница</h1>
        <hr class="hr">
        <h2>Предметы</h2>
        <div class="subjects">
            <SipiSubject v-for="subject in subjects" :key="subject.id" :title="subject.title" />
        </div>
    </div>
</template>


<script>
import {onMounted, ref} from "vue";
import SipiSubject from "@/components/SipiSubject.vue";

export default {
    name: "AppHome",
    components: {
        SipiSubject,
    },
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

        onMounted(async () => {
            const jwt = getCookieValue("jwt");
            if (jwt) {
                const response = await fetch("https://assistant.5pwjust.ru/api/subjects/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    const subjectsList = await response.json();
                    document.cookie = `subjects=${JSON.stringify(subjectsList)}`;
                    subjects.value = subjectsList;
                }
            }
        });

        return {
            subjects,
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

</style>
