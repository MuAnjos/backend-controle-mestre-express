const { Router } = require('express');

const CategoryController = require('./controllers/CategoryController');
const ProductController = require('./controllers/ProductController');
const EmployeeController = require('./controllers/EmployeeController');
const SaleController = require('./controllers/SaleController');

const router = Router();

router.get('/categoria', CategoryController.index);
router.post('/categoria', CategoryController.store);
router.patch('/categoria', CategoryController.update);
router.delete('/categoria/:id', CategoryController.delete);

router.get('/produto', ProductController.index);
router.post('/produto', ProductController.store);
router.patch('/produto', ProductController.update);
router.delete('/produto/:id', ProductController.delete);

router.get('/funcionario', EmployeeController.index);
router.post('/funcionario', EmployeeController.store);
router.patch('/funcionario', EmployeeController.update);
router.delete('/funcionario/:id', EmployeeController.delete);

router.get('/venda', SaleController.index);
router.post('/venda', SaleController.store);
router.patch('/venda', SaleController.update);
router.delete('/venda/:id', SaleController.delete);

module.exports = router;
