<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  productos: Array
})

const emit = defineEmits(['agregarAlCarrito'])
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    <div
      v-for="producto in props.productos"
      :key="producto.id"
      class="border p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between h-full"
    >
      <div>
        <img :src="producto.image" alt="" class="w-full h-40 object-contain mb-3" />
        <h3 class="text-sm font-bold mb-1">{{ producto.title }}</h3>
        <p class="text-gray-600 text-sm mb-2">{{ producto.description }}</p>
        <p class="text-gray-800 font-semibold mb-3">${{ producto.price }}</p>
      </div>
      <button
        @click="emit('agregarAlCarrito', producto)"
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mt-auto"
      >
        Agregar al carrito
      </button>
    </div>
  </div>
</template>
