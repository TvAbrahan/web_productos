<script setup>
import HeaderNav from './components/HeaderNav.vue'
import { ref, onMounted } from 'vue'
import { useCartStore } from './stores/cartStore'
import  FooterComponent from './components/Footer.vue'

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
  <div class="flex flex-col min-h-screen">
    <HeaderNav />

    <main class="flex-grow">  <div class="container max-w-screen-2xl mx-auto p-4">
        <router-view
          :productos="productos"
        />
      </div>
    </main>

    <FooterComponent />

    <router-link
      to="/carrito"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
    >
      🛒 Ver Carrito ({{ cartStore.totalItems }})
    </router-link>
  </div>
</template>

<style>
html, body {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #f3f4f6, #ffffff);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>

