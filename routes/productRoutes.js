const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middlewares/authenticateToken');
const checkAdminPermissions = require('../middlewares/checkPermissions');

router.post('/', authenticateToken, checkAdminPermissions, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authenticateToken, checkAdminPermissions, productController.updateProduct);
router.delete('/:id', authenticateToken, checkAdminPermissions, productController.deleteProduct);

module.exports = router;
