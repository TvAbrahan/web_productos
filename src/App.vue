<script setup>
import HeaderNav from './components/HeaderNav.vue'
import ProductList from './components/ProductList.vue'

import { ref, onMounted } from 'vue'
const productos = ref([])
const cargando = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    if (!res.ok) throw new Error('Error al obtener productos')
    const data = await res.json()
    productos.value = data
  } catch (error) {
    console.error('Hubo un error:', error)
  } finally {
    cargando.value = false
  }
})
</script>

<template>
  <HeaderNav />

  <div class="container max-w-screen-5xl mx-auto p-4">
    <ProductList :productos="productos" />
  </div>
</template>
