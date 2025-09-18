import { Router } from 'express';
import * as gameController from '@/api/internal/game/controller';
import * as guessController from '@/api/internal/game/[id]/guess/controller';
import * as configController from '@/api/internal/config/controller';
import { adminAuthMiddleware } from '@/middleware/adminAuth';

const router = Router();

/**
 * @summary Define as rotas internas da aplicação.
 */

// --- Rotas de Jogo ---
router.post('/game', gameController.postHandler);
router.post('/game/:id/guess', guessController.postHandler);

// --- Rotas de Configuração (Protegidas) ---
router.get('/config/game', adminAuthMiddleware, configController.getHandler);
router.put('/config/game', adminAuthMiddleware, configController.putHandler);


export default router;
