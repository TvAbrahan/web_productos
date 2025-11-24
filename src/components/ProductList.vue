<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  productos: Array
})

const emit = defineEmits(['agregarAlCarrito'])
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div
      v-for="producto in props.productos"
      :key="producto.id"
      class="bg-white border rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
    >
      <!-- Imagen del producto -->
      <div class="p-4 flex justify-center">
        <img
          :src="producto.image"
          alt="product image"
          class="h-44 object-contain"
        />
      </div>

      <!-- Información del producto -->
      <div class="px-4 flex flex-col flex-grow">
        <h3 class="text-base font-semibold mb-1 line-clamp-2">
          {{ producto.title }}
        </h3>
        <p class="text-gray-600 text-sm mb-2 line-clamp-3">
          {{ producto.description }}
        </p>
        <p class="text-xl font-bold text-green-700 mt-auto mb-3">
          ${{ producto.price }}
        </p>
      </div>

      <!-- Botón -->
      <button
        @click="emit('agregarAlCarrito', producto)"
        class="w-full bg-amber-500 text-white py-2 rounded-b-lg hover:bg-amber-600 transition font-semibold"
      >
        Agregar al carrito 🛒
      </button>
    </div>
  </div>
</template>

