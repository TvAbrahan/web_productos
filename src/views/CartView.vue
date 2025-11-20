<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-6 text-center">🛒 Carrito de Compras</h2>


    <div
      v-for="(item, index) in carrito"
      :key="item.id"
      class="flex items-center justify-between border-b py-3 bg-white rounded shadow-sm mb-3 p-4"
    >
      <div class="flex items-center space-x-4">
        <img :src="item.image" class="w-20 h-20 object-contain" />
        <div>
          <h3 class="font-semibold text-lg">{{ item.title }}</h3>
          <p class="text-gray-700 font-medium">$ {{ item.price }}</p>
        </div>
      </div>


      <div class="flex items-center space-x-2">
        <button class="px-2 border rounded" @click="item.cantidad--" :disabled="item.cantidad === 1">-</button>
        <span class="font-semibold">{{ item.cantidad }}</span>
        <button class="px-2 border rounded" @click="item.cantidad++">+</button>
      </div>


      <p class="font-semibold text-lg">$ {{ (item.price * item.cantidad).toFixed(2) }}</p>

      <!-- Quitar -->
      <button class="text-red-500 hover:text-red-700" @click="quitarDelCarrito(index)">🗑</button>
    </div>


    <div v-if="carrito.length > 0" class="mt-6 text-right">
      <h3 class="text-2xl font-bold mb-4">Total: $ {{ totalCarrito }}</h3>
      <a
        :href="linkWhatsApp"
        target="_blank"
        class="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md"
      >
        📲 Finalizar pedido por WhatsApp
      </a>
    </div>


    <p v-else class="text-center text-gray-600">Tu carrito está vacío.</p>
  </div>
</template>

<script>
export default {
  name: "CarritoView",
  data() {
    return {
      carrito: JSON.parse(localStorage.getItem("carrito")) || []
    };
  },
  methods: {
    quitarDelCarrito(index) {
      this.carrito.splice(index, 1);
      this.guardarCarrito();
    },
    guardarCarrito() {
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    }
  },
  computed: {
    totalCarrito() {
      return this.carrito
        .reduce((total, item) => total + item.price * item.cantidad, 0)
        .toFixed(2);
    },
    linkWhatsApp() {
      let mensaje = "Hola, quiero comprar:\n\n";
      this.carrito.forEach(item => {
        mensaje += ` ${item.title} (Cantidad: ${item.cantidad}) - $${(
          item.price * item.cantidad
        ).toFixed(2)}\n`;
      });
      mensaje += `\n Total a pagar: $${this.totalCarrito}\n\n¿Me puedes ayudar con mi pedido?`;

      return `https://wa.me/50767118683?text=${encodeURIComponent(mensaje)}`;

    }
  },
  watch: {
    carrito: {
      handler() {
        this.guardarCarrito();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
