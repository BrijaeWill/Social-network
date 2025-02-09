import {Router}  from 'express';
import apiRoutes from './api/index';

const router = Router();
// Log when this file is being used
console.log('Setting up /api routes');
router.use('/api', apiRoutes); // Correctly mount under /api
export default router;