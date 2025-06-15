import { Router } from 'express';
import { registerUser, loginUser, addRoadmap, getRoadmaps, deleteRoadmap } from './user.controller';
import { authMiddleware } from './user.middleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me/roadmaps', authMiddleware, getRoadmaps);
router.post('/me/roadmaps', authMiddleware, addRoadmap);
router.delete('/me/roadmaps/:roadmapId', authMiddleware, deleteRoadmap);

export default router;