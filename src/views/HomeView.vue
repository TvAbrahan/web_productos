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
  mensaje.value = `${producto.title} añadido al carrito 🛍️`

  setTimeout(() => (mensaje.value = ''), 2500)
}
</script>

<template>
  <div class="container mx-auto p-4">
    <ProductList
      :productos="productos"
      @agregarAlCarrito="agregarAlCarrito"
    />

    <!-- Alerta flotante elegante -->
    <transition name="fade-slide">
<div
  v-if="mensaje"
  class="fixed top-20 left-1/2 transform -translate-x-1/2
         bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl
         backdrop-blur-md border border-green-300/50
         flex items-center gap-2 text-sm font-medium z-50"
>
        {{ mensaje }}
      </div>
    </transition>
  </div>
</template>

<style>
/* ✔ Animación suave del toast */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

