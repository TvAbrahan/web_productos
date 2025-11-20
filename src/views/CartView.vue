<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

// Funciones para modificar la cantidad llamando al store
function incrementarCantidad(item) {
  cartStore.updateQuantity(item.id, item.cantidad + 1);
}

function decrementarCantidad(item) {
  if (item.cantidad > 1) {
    cartStore.updateQuantity(item.id, item.cantidad - 1);
  }
}

function quitarDelCarrito(id) {
  cartStore.removeFromCart(id);
}

// Propiedades computadas (se actualizan automáticamente con el store)
const totalCarrito = computed(() => {
  return cartStore.items
    .reduce((total, item) => total + item.price * item.cantidad, 0)
    .toFixed(2);
});

const linkWhatsApp = computed(() => {
  // ... (Tu lógica de link de WhatsApp, pero usando cartStore.items)
  let mensaje = "Hola, quiero comprar:\n\n";
  cartStore.items.forEach(item => {
    mensaje += ` ${item.title} (Cantidad: ${item.cantidad}) - $${(
      item.price * item.cantidad
    ).toFixed(2)}\n`;
  });
  mensaje += `\n Total a pagar: $${totalCarrito.value}\n\n¿Me puedes ayudar con mi pedido?`;
  return `https://wa.me/50767118683?text=${encodeURIComponent(mensaje)}`;
});

</script>

<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6">
    <h2 class="text-3xl font-bold mb-6 text-center">🛒 Carrito de Compras</h2>

    <div
      v-for="item in cartStore.items"
      :key="item.id"
      class="border-b py-3 bg-white rounded shadow-sm mb-3 p-4
             flex flex-col sm:flex-row sm:items-center sm:justify-between"


    >

      <div class="flex items-start space-x-4 mb-3 sm:mb-0 sm:w-1/2">
        <img :src="item.image" class="w-16 h-16 object-contain sm:w-20 sm:h-20" />
        <div class="flex-grow">
          <h3 class="font-semibold text-base sm:text-lg">{{ item.title }}</h3>
          <p class="text-gray-700 font-medium text-sm sm:text-base">$ {{ item.price }}</p>
        </div>
      </div>

      <div class="flex justify-between items-center w-full sm:w-auto sm:space-x-4">

        <div class="flex items-center space-x-2 border rounded-lg p-1 sm:p-0 sm:border-none">
          <button class="px-2 border rounded" @click="decrementarCantidad(item)" :disabled="item.cantidad <= 1">-</button>
          <span class="font-semibold">{{ item.cantidad }}</span>
          <button class="px-2 border rounded" @click="incrementarCantidad(item)">+</button>
        </div>

        <p class="font-semibold text-lg text-right hidden sm:block sm:w-24">
            $ {{ (item.price * item.cantidad).toFixed(2) }}
        </p>

        <button class="text-red-500 hover:text-red-700 ml-4" @click="quitarDelCarrito(item.id)">
            <span class="text-xl">🗑</span>
        </button>
      </div>

      <p class="font-semibold text-base mt-2 text-right w-full sm:hidden">
            Subtotal: $ {{ (item.price * item.cantidad).toFixed(2) }}
      </p>

    </div>

    <div v-if="cartStore.items.length > 0" class="mt-6 text-right">
      <h3 class="text-2xl font-bold mb-4">Total: $ {{ totalCarrito }}</h3>
      <a
        :href="linkWhatsApp"
        target="_blank"
        class="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg shadow-xl inline-block w-full sm:w-auto"
      >
        📲 Finalizar pedido por WhatsApp
      </a>
    </div>

    <p v-else class="text-center text-gray-600">Tu carrito está vacío.</p>
  </div>
</template>
