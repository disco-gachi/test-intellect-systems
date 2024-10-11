<script setup lang="ts">
import { type Ship as ShipType } from '@/types';

interface ShipProps {
  ship: ShipType;
}

const { ship } = defineProps<ShipProps>();

const outputFields: (keyof ShipType)[] = [
  'name',
  'model',
];

const format = <T extends ShipType[keyof ShipType]>(value: T): string => {
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  return value;
};

</script>

<template>
  <div class="ship-card">
    <div
      v-for="(field, index) in outputFields"
      :key="index"
      class="ship-card__item"
    >
      <div class="ship-card__field">{{ field }}</div>
      <div class="ship-card__value">{{ format(ship[field]) }}</div>
    </div>

    <div class="ship-card__item">
      <div class="ship-card__field">...</div>
      <div class="ship-card__value">...</div>
    </div>
  </div>
</template>

<style scoped>
.ship-card {
  width: 1024px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
}
.ship-card__item {
  display: grid;
  grid-template-columns: 20% 78%;
  gap: 2%;
  padding: 6px 10px;
  text-align: left;
}
.ship-card__field {
  text-transform: uppercase;
  word-wrap: break-word;
}
.ship-card__value {
  color: #646cff;
}
</style>