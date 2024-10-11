import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../pages/Home.vue'),
    name: 'ship-list',
  },
  {
    path: '/ship/:id',
    component: () => import('../pages/Ship.vue'),
    name: 'ship-card',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
