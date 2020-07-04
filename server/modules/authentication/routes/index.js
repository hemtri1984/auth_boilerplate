
import express from 'express';

import * as AuthController from '../controller/index.js';
import { verifyAuthToken } from '../../authentication/middleware/index.js';

const authRoutes = express.Router();

authRoutes.route('/login')
    .post(AuthController.authenticate);

authRoutes.route('/signup')
    .post(AuthController.register);

authRoutes.route('/data').get(verifyAuthToken, AuthController.getData)

export default authRoutes;