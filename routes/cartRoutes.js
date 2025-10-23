const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Mostrar carrito
router.get('/', cartController.showCart);

// Agregar producto
router.post('/add', cartController.addToCart);

// Eliminar producto individual
router.post('/remove/:id', cartController.removeItem);

// Vaciar carrito (pagar)
router.post('/clear', cartController.clearCart);

module.exports = router;
