fetch('https://fakestoreapi.com/products')
  .then((res) => {
    if (!res.ok) throw new Error('HTTP error ' + res.status)
    return res.json()
  })
  .then((data) => {
    console.log('Productos:', data)
  })
  .catch((err) => console.error('Fetch error:', err))

fetch('https://fakestoreapi.com/carts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 1,
    date: '2025-11-07',
    products: [{ productId: 1, quantity: 2 }],
  }),
})
  .then((r) => r.json())
  .then((result) => console.log('Carrito creado', result))
  .catch((e) => console.error(e))
