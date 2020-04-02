import express from 'express';

import * as Controllers from '../controllers';

const router = express.Router();

router.post('/', Controllers.UsersController);

export default router;