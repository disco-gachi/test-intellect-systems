<script setup lang="ts">
import { ref, computed, onMounted, watch  } from 'vue';
import { useRoute, useRouter, type LocationQuery } from 'vue-router';
import { shipApi } from '@/api';
import Search from '@/components/SearchForm.vue';
import Pagination from '@/components/Pagination.vue';
import { BaseApiResponse, Ship, ApiFilterParams } from '@/types';
import ShipList from '@/components/ShipList.vue';
import Spinner from '@/shared/ui/Spinner.vue';


const isLoading = ref(false);
const toggleLoading = () => {
  isLoading.value = !isLoading.value;
};

const router = useRouter();
const route = useRoute();

const searchString = computed({
  get: () => route.query ?? {},
  set: query => router.replace({ query }),
});

const initSearchString = ref(
    typeof searchString.value.search === 'string'
        ? searchString.value.search
        : ''
);

const updateSearchQuery = (query: LocationQuery) => {
  searchString.value = {
    ...searchString.value,
    ...query
  };
};

const shipList = ref<BaseApiResponse<Ship>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
});

async function fetchData() {
  toggleLoading();

  const response = await shipApi.fetchList(
    getQueryStringParams()
  );

  if (response) {
    shipList.value = response;
  }

  toggleLoading();
}

function getQueryStringParams () {
  const params: ApiFilterParams[] = [
    ApiFilterParams.search,
    ApiFilterParams.page,
  ];

  return Object.fromEntries(
    Object.entries(route.query)
        .filter(([key,]) => params.some(param => param === key))
  );
}

function handleSearchSubmit (search: string) {
  updateSearchQuery({
    [ApiFilterParams.search]: search,
    [ApiFilterParams.page]: '1',
});
}

function handleSearchReset () {
    searchString.value = {};
}

function handlePageChange (page: string) {
  updateSearchQuery({ [ApiFilterParams.page]: page });
}

watch(
  () => route.query,
  fetchData
);

onMounted(fetchData);

</script>

<template>
    <h1>Starship list</h1>

    <Search
        :onSubmit="handleSearchSubmit"
        :onReset="handleSearchReset"
        :query="initSearchString"
    />

    <ShipList :data="shipList.results" />

    <Pagination
      :links="{
        next: shipList.next,
        previous: shipList.previous,
      }"
      :onPageChange="handlePageChange"
    />

    <Spinner v-if="isLoading" />
</template>

<style scoped>
</style>
