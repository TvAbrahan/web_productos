<script setup>
import { defineProps } from 'vue'

const { productos } = defineProps({
  productos: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
    <div
      v-for="product in productos"
      :key="product.id"
      class="border border-gray-400 rounded p-3.5"
    >
      <h2 class="font-bold mb-2">{{ product.title }}</h2>
      <img :src="product.image" :alt="product.title" class="w-full h-48 object-contain mb-2" />
      <p class="text-gray-700 mb-2">{{ product.description }}</p>
      <p class="font-semibold text-lg">$ {{ product.price }}</p>
    </div>
  </div>
</template>
