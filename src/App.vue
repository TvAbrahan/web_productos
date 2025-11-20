<script setup>
import HeaderNav from './components/HeaderNav.vue'
import { ref, onMounted, watch } from 'vue'

const productos = ref([])
const carrito = ref(JSON.parse(localStorage.getItem("carrito")) || [])

const cargando = ref(true)

const agregarAlCarrito = (producto) => {
  const item = carrito.value.find(p => p.id === producto.id)
  if (item) {
    item.cantidad++
  } else {
    carrito.value.push({ ...producto, cantidad: 1 })
  }
}

// 🔹 IMPORTANTE: guarda cambios solo cuando el carrito cambia (no cada clic)
watch(
  carrito,
  () => {
    localStorage.setItem("carrito", JSON.stringify(carrito.value))
  },
  { deep: true }
)

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
      :carrito="carrito"
      :agregarAlCarrito="agregarAlCarrito"
    />
  </div>

  <router-link
    to="/carrito"
    class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
  >
    🛒 Ver Carrito ({{ carrito.length }})
  </router-link>
</template>

