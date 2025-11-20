<script setup>
import { ref, onMounted } from 'vue'
import ProductList from '../components/ProductList.vue'

const mensaje = ref('')
const productos = ref([])
const carrito = ref(JSON.parse(localStorage.getItem("carrito")) || [])

onMounted(async () => {
  const res = await fetch("https://fakestoreapi.com/products")
  productos.value = await res.json()
})

function agregarAlCarrito(producto) {
  const item = carrito.value.find(p => p.id === producto.id)
  if (item) {
    item.cantidad++
  } else {
    carrito.value.push({ ...producto, cantidad: 1 })
  }
  localStorage.setItem("carrito", JSON.stringify(carrito.value))
  mensaje.value = `✅ ${producto.title} se agregó al carrito`
  setTimeout(() => mensaje.value = '', 2000)
}
</script>

<template>
  <div class="container mx-auto p-4">
    <ProductList
      :productos="productos"
      @agregarAlCarrito="agregarAlCarrito"
    />
    <div v-if="mensaje" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500">
  {{ mensaje }}
</div>

    <div class="mt-4" v-if="carrito.length">
      <h2>Carrito ({{ carrito.length }} productos)</h2>
      <ul>
        <li v-for="item in carrito" :key="item.id">
          {{ item.title }} - Cantidad: {{ item.cantidad }}
        </li>
      </ul>
    </div>
  </div>
</template>
