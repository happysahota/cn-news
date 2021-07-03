import { Router } from 'express';

// Controllers Import
import * as userController from '../controllers/newsController';

const router = Router();

router.post('/fetchAll', userController.fetchNews);

export default router;