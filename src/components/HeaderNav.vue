<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.totalItems);

const menuOpen = ref(false);
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
        <span class="text-white text-xl font-semibold tracking-wide">MiTienda</span>
      </router-link>

      <!-- NAV CENTRADO (solo desktop) -->
      <nav class="hidden md:flex gap-8 text-gray-300 font-medium absolute left-1/2 transform -translate-x-1/2">
        <router-link to="/" exact class="hover:text-amber-400">Inicio</router-link>
        <router-link to="/productos" class="hover:text-amber-400">Productos</router-link>
        <router-link to="/contacto" class="hover:text-amber-400">Contacto</router-link>
      </nav>

      <!-- CARRITO + MENÚ MOBILE A LA DERECHA -->
      <div class="flex items-center gap-6">

        <!-- CARRITO (siempre visible) -->
        <router-link to="/carrito" class="relative text-white text-2xl hover:text-amber-400 transition">
          🛒
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
            {{ cartCount }}
          </span>
        </router-link>

        <!-- MENÚ HAMBURGUESA (solo móvil, NO mueve el carrito) -->
        <button
          @click="menuOpen = !menuOpen"
          class="md:hidden text-white text-3xl focus:outline-none"
        >
          ☰
        </button>

      </div>
    </div>

    <!-- MENU MOBILE -->
    <transition name="slide-fade">
      <div
        v-if="menuOpen"
        class="md:hidden bg-gray-800 text-gray-200 flex flex-col items-center gap-4 py-4 shadow-lg"
      >
        <router-link @click="menuOpen = false" to="/" exact class="hover:text-amber-400">Inicio</router-link>
        <router-link @click="menuOpen = false" to="/productos" class="hover:text-amber-400">Productos</router-link>
        <router-link @click="menuOpen = false" to="/contacto" class="hover:text-amber-400">Contacto</router-link>
      </div>
    </transition>
  </header>
</template>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
