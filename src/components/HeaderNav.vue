<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.totalItems);
</script>

<template>
 <header class="bg-gray-900 shadow-md sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    <!-- LOGO -->
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

    <!-- BOTÓN MENU MOBILE -->
    <button
      @click="menuOpen = !menuOpen"
      class="md:hidden text-white text-3xl focus:outline-none"
    >
      ☰
    </button>

    <!-- NAV DESKTOP -->
    <nav
      class="hidden md:flex gap-8 text-gray-300 font-medium"
    >
      <router-link to="/" exact class="hover:text-amber-400">Inicio</router-link>
      <router-link to="/productos" class="hover:text-amber-400">Productos</router-link>
      <router-link to="/contacto" class="hover:text-amber-400">Contacto</router-link>
    </nav>

    <!-- CARRITO -->
    <router-link to="/carrito" class="relative text-white text-2xl hover:text-amber-400 transition">
      🛒
      <span
        v-if="cartCount > 0"
        class="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
        {{ cartCount }}
      </span>
    </router-link>
  </div>

  <!-- MENU MOBILE -->
  <transition name="slide-fade">
    <div
      v-if="menuOpen"
      class="md:hidden bg-gray-800 text-gray-200 flex flex-col items-center gap-4 py-4 shadow-lg"
    >
      <router-link to="/" exact class="hover:text-amber-400">Inicio</router-link>
      <router-link to="/productos" class="hover:text-amber-400">Productos</router-link>
      <router-link to="/contacto" class="hover:text-amber-400">Contacto</router-link>
    </div>
  </transition>
</header>

</template>
