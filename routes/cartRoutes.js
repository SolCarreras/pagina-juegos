const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Ver carrito
router.get('/', cartController.viewCart);

// Agregar al carrito (usando body con hidden input)
router.post('/add', cartController.addToCart);

// Eliminar uno (item.id)
router.post('/remove/:id', cartController.removeOne);

// Pagar y vaciar carrito
router.post('/clear', cartController.clearCart);

module.exports = router;