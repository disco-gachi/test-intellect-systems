<script setup lang="ts">
import { useRouter } from 'vue-router';
import { type Ship } from '@/types';
import { extractIdFromResourceUrl } from '@/shared/utils';

interface ShipListProps {
  data: Ship[];
}

const props = defineProps<ShipListProps>();
const router = useRouter();

const makeLink = (shipUrl: string) => {
  const id = extractIdFromResourceUrl(shipUrl);
  return `/ship/${id}`;
};

const goto = (ship: Ship) => {
  router.push({
    path: makeLink(ship.url),
  });
};

</script>

<template>
  <div class="ship-list">
    <div
      v-if="!props.data.length"
      class="ship-list__message"
    >
      No ships
    </div>

    <template v-else>
      <div class="ship-list__item ship-list__item--header">
        <div>name</div>
        <div>model</div>
      </div>

      <div
        v-for="(ship, index) in props.data"
        :key="index"
        @click.prevent="() => goto(ship)"
        class="ship-list__item ship-list__item--link"
      >
        <div>{{ ship.name }}</div>
        <div>{{ ship.model }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.ship-list {
  width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
}

.ship-list__message {
  margin: 0 auto;
}

.ship-list__item {
  display: grid;
  grid-template-columns: 49% 49%;
  gap: 2%;
  text-align: left;
  padding: 6px 10px;
}

.ship-list__item--link {
  cursor: pointer;
  color: #646cff;
  border-radius: 5px;
}

.ship-list__item--link:hover {
  color: #535bf2;
  background-color: #2d2d2d;
}

.ship-list__item--header {
  font-size: 1em;
  font-weight: 500;
  text-transform: uppercase;
}
</style>
