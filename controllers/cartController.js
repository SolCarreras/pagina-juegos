// controllers/cartController.js

let cart = []; // Carrito temporal en memoria (luego podemos guardar en DB)

const cartController = {
  // Agregar un producto al carrito
  addToCart: (req, res) => {
    const { id, name, price, image } = req.body;

    const existingProduct = cart.find(item => item.id === parseInt(id));
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: parseInt(id),
        name,
        price: parseFloat(price),
        image,
        quantity: 1
      });
    }

    res.redirect('/cart');
  },

  // Ver carrito
  showCart: (req, res) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.render('products/cart', { cart, total });
  },

  // Eliminar un producto
  removeItem: (req, res) => {
    const { id } = req.params;
    cart = cart.filter(item => item.id !== parseInt(id));
    res.redirect('/cart');
  },

  // Vaciar carrito (pagar o limpiar)
  clearCart: (req, res) => {
    cart = [];
    res.redirect('/cart');
  }
};

module.exports = cartController;
