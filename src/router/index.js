import { createRouter, createWebHistory } from 'vue-router';
import TicketCreate from '../components/ticketCreate.vue';

const routes = [
  { path: '/create', component: TicketCreate }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
