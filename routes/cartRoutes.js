const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Ver carrito
router.get('/', cartController.viewCart);

// Agregar al carrito

router.post('/add', cartController.addToCart);


// Eliminar uno
router.post('/remove/:id', cartController.removeOne);

module.exports = router;
