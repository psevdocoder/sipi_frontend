<template>
    <div>
        <transition name="fade">
            <div v-if="isLoading" class="loading-overlay">
                <div class="loading-spinner"></div>
            </div>
        </transition>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        loadData: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            isLoading: true,
        };
    },
    mounted() {
        // Загрузка данных
        this.loadData().then(() => {
            this.isLoading = false;
        });
    },
};
</script>

<style>
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.29);
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-top-color: #3498db;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
