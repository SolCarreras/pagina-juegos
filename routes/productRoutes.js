const express = require('express');
const router = express.Router();




const productController = require('../controllers/productController');
//const authMiddleware = require('../middlewares/authMiddleware')



///rutas de los productos//
router.get('/', productController.product);
router.get('/:id/detail', productController.detail);
router.get('/', productController.list);
//router.get('/cart', userLog.authCart ,productController.cart);
//router.delete("/:id/delete", userLog.auth, productController.destroy);

module.exports = router