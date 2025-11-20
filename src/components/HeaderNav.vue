<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

const cartCount = computed(() => {
    return cartStore.totalItems;
});
</script>

<template>
  <header>
    <div
      class="header-nav flex items-center justify-between bg-gray-800 px-6 py-3 border-b-4 border-amber-400"
    >
      <div class="py-2">
        <img
          src="../img/832_435.jpg"
          alt="Logo"
          class="size-20 rounded-full hover:border-amber-400 border-4 transition-all duration-300"
        />
      </div>
      <nav class="nav-links flex gap-6 ml-6 text-amber-300">
        <router-link to="/" exact>Inicio</router-link>
        <router-link to="/carrito" class="relative">
          🛒
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            {{ cartCount }}
          </span>
        </router-link>
      </nav>
    </div>
  </header>
</template>
