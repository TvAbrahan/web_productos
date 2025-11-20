<script setup>
import HeaderNav from './components/HeaderNav.vue'
import { ref, onMounted } from 'vue'
import { useCartStore } from './stores/cartStore'
import  Footer from './components/Footer.vue'

const cartStore = useCartStore()

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

  <div class="container max-w-screen-2xl mx-auto p-4">
    <router-view
      :productos="productos"
    />
  </div>

  <router-link
    to="/carrito"
    class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
  >
    🛒 Ver Carrito ({{ cartStore.totalItems }})
    </router-link>
    <Footer />
</template>
