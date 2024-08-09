const { Router } = require('express');

const CategoryController = require('./controllers/CategoryController');
const ProductController = require('./controllers/ProductController');

const router = Router();

router.get('/categoria', CategoryController.index);
router.post('/categoria', CategoryController.store);
router.patch('/categoria', CategoryController.update);
router.delete('/categoria/:id', CategoryController.delete);

router.get('/produto', ProductController.index);
router.post('/produto', ProductController.store);
router.patch('/produto', ProductController.update);
router.delete('/produto/:id', ProductController.delete);

module.exports = router;
