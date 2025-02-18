import express from 'express';
import apiV1 from './api-V1';
import adminApiV1 from './Adminapi-V1';

const router = express.Router();

router.use('/v1', apiV1);
router.use('/admin/v1', adminApiV1);

export default router;
