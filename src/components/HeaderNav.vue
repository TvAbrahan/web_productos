<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.totalItems);
</script>

<template>
  <header class="bg-gray-900 shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- LOGO IZQUIERDA -->
      <router-link to="/" class="flex items-center gap-3">
        <img
          src="../img/832_435.jpg"
          alt="Logo"
          class="w-14 h-14 rounded-full border-2 border-amber-400 object-cover"
        />
        <span class="text-white text-xl font-semibold tracking-wide">
          MiTienda
        </span>
      </router-link>

      <!-- NAVBAR CENTRADO -->
      <nav class="absolute left-1/2 transform -translate-x-1/2 flex gap-8 text-gray-300 font-medium">
        <router-link to="/" exact class="hover:text-amber-400 transition">Inicio</router-link>
        <router-link to="/productos" class="hover:text-amber-400 transition">Productos</router-link>
        <router-link to="/contacto" class="hover:text-amber-400 transition">Contacto</router-link>
      </nav>

      <!-- CARRITO DERECHA -->
      <router-link to="/carrito" class="relative text-white text-2xl hover:text-amber-400 transition">
        🛒
        <span
          v-if="cartCount > 0"
          class="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
          {{ cartCount }}
        </span>
      </router-link>

    </div>
  </header>
</template>
