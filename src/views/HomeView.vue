<script setup>
import { ref, onMounted } from 'vue'
import ProductList from '../components/ProductList.vue'
import { useCartStore } from '../stores/cartStore'

const mensaje = ref('')
const productos = ref([])
const cartStore = useCartStore()

onMounted(async () => {
  const res = await fetch("https://fakestoreapi.com/products")
  productos.value = await res.json()
})

function agregarAlCarrito(producto) {

  cartStore.addToCart(producto)

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
    <div v-if="mensaje" class="fixed top-16  bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500">
      {{ mensaje }}
    </div>

    </div>
</template>
