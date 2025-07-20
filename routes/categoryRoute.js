import { Router }  from 'express';
import categoryControllers from '../controllers/categoryController.js';
 
const router = Router();

router.post('/', categoryControllers.createCategory);
router.get('/', categoryControllers.getCategories);
router.put('/:id', categoryControllers.updateCategories);
router.delete('/:id', categoryControllers.deletedCategory);

export default router;