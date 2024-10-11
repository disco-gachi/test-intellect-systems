<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { shipApi } from '@/api';
import { type Ship as ShipType } from '@/types';
import Ship from '@/components/Ship.vue';
import Spinner from '@/shared/ui/Spinner.vue';

const ship = ref<ShipType>();
const isLoading = ref(false);
const route = useRoute();
const router = useRouter();

onMounted(fetchShip);

async function fetchShip () {
    isLoading.value = true;

    const id = route.params.id as string;
    const data = await shipApi.fetch(id);
    if (data) {
        ship.value = data;
    }

    isLoading.value = false;
}

</script>

<template>
    <div class="back">
        <span @click.prevent="() => router.back()">&lt;- back</span>
    </div>

    <h1>Starship {{ ship ? `&laquo;${ship.name}&raquo;` : '' }}</h1>
    
    <Ship v-if="ship" :ship="ship" />
    <Spinner v-if="isLoading" />
</template>

<style scoped>
.back {
    color: #646cff;
    cursor: pointer;
    padding: 0 16px;
    text-align: left;
}
</style>