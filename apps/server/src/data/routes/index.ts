import express from "express";
import actionRouter from './actions';

const router = express.Router()

router.use('/', actionRouter)

export default router