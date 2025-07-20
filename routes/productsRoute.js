import { Router } from 'express';
import productController from '../controllers/productController.js';
const router = Router();

router.post('/', productController.createProducts);
router.get('/:id', productController.getProductById);
router.get('/', productController.getProducts);
router.get('/category/:categoryId', productController.getProductsByCategoryId)
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);


export default router;

