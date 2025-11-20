// src/stores/cartStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Función auxiliar para mantener limpio el store
function updateLocalStorage(items) {
  localStorage.setItem("carrito", JSON.stringify(items));
}

export const useCartStore = defineStore('cart', () => {
  // Estado: Lee el carrito de localStorage al inicializar
  const items = ref(JSON.parse(localStorage.getItem("carrito")) || [])

  // Getters: Propiedades computadas basadas en el estado
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.cantidad, 0)
  })

  // Acciones: Funciones para modificar el estado

  function addToCart(product) {
    const item = items.value.find(p => p.id === product.id)
    if (item) {
      item.cantidad++
    } else {
      items.value.push({ ...product, cantidad: 1 })
    }
    updateLocalStorage(items.value) // Guarda después de modificar
  }

  function removeFromCart(id) {
    items.value = items.value.filter(item => item.id !== id);
    updateLocalStorage(items.value) // Guarda después de modificar
  }

  function updateQuantity(id, newQuantity) {
    const item = items.value.find(p => p.id === id);
    if (item && newQuantity > 0) {
        item.cantidad = newQuantity;
        updateLocalStorage(items.value); // Guarda después de modificar
    }
  }

  return { items, totalItems, addToCart, removeFromCart, updateQuantity }
})
