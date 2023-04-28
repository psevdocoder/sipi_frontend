<template>
    <div class="subject">
        {{ title }}
    </div>
</template>

<script>
export default {
    name: "SipiSubject",
    props: {
        title: String,
        slug: String,
    },
};
</script>

<style scoped>
.subject {
    margin: 10px;
    padding: 10px;
    border: 4px solid dodgerblue;
    border-radius: 20px;
    transition: all 0.3s ease; /* добавлено для плавности перехода */

    /* изменение стилей при наведении на элемент */
    &:hover {
        background-color: dodgerblue;
        color: white;
        border-color: white;
        cursor: pointer;
    }

    width: 200px;
    height: 100px;
    word-wrap: break-word;
}
</style>
