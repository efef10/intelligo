import express from 'express';
import {dataConvertionsController} from '../controllers';

const router = express.Router();

router.post('/', dataConvertionsController.getFullDataJson);

export default router; 