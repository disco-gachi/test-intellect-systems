<script setup lang="ts">
import { ref } from 'vue';

interface SearchProps {
    onSubmit: (query: string) => Promise<void> | void;
    onReset: () => Promise<void> | void;
    query?: string;
}

const props = defineProps<SearchProps>();
const query = ref(props.query || '');

const handleSubmit = () => {
    if (query.value) {
        props.onSubmit(query.value);
    }
};

const handleReset = () => {
    query.value = '';
    props.onReset();
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="search-form">
        <input type="text" placeholder="Введите запрос..." v-model="query" />
        <button type="submit">Поиск</button>

        <button type="button" @click.prevent="handleReset" :disabled="!query">Сбросить</button>
    </form>
</template>

<style scoped>
.search-form {
    width: 1024px;
    display: flex;
    gap: 32px;
    justify-content: center;
}
</style>