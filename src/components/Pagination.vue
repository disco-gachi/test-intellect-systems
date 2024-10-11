<script setup lang="ts">
import { type NavigationParams } from '@/types';

interface PaginationProps {
    links: NavigationParams;
    onPageChange: (page: string) => Promise<void> | void;
}

const props = defineProps<PaginationProps>();

const goto = (url: string | null) => {
    const parsed = new URL(url || '');
    const page = parsed.searchParams.get('page') || '1';

    props.onPageChange(page);
};
</script>

<template>
    <div class="pagination">
        <button
            type="button"
            @click.prevent="() => goto(props.links.previous)"
            :disabled="!props.links.previous"
        >
            Назад
        </button>

        <button
            type="button"
            @click.prevent="() => goto(props.links.next)"
            :disabled="!props.links.next"
        >
            Далее
        </button>
    </div>
</template>

<style scoped>
.pagination {
    width: 1024px;
    display: flex;
    justify-content: center;
    gap: 32px;
}
</style>