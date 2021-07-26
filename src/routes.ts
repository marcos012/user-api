import express from 'express';

import authMiddleware from './app/middlewares/auth';
import AuthController from './app/controllers/AuthController';

const routes = express.Router();

const authController = new AuthController();

routes.post('/user', authController.create);
routes.post('/signin', authController.signIn);
routes.get('/user', authMiddleware, authController.show);
routes.get('/users', authController.index);

export default routes;