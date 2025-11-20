import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);


const carrito = reactive([]);


function agregarAlCarrito(producto) {
  const item = carrito.find(p => p.id === producto.id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));

}


app.provide('carrito', carrito);
app.provide('agregarAlCarrito', agregarAlCarrito);

app.use(router);
app.mount('#app');
