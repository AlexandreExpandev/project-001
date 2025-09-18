import { Router } from 'express';
import internalRoutes from './internal.routes';

const router = Router();

/**
 * @summary Agrega todas as rotas da API.
 */
router.use('/internal', internalRoutes);
// Futuramente, rotas externas podem ser adicionadas aqui.
// router.use('/external', externalRoutes);

export default router;
