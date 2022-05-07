import { ApiResponse, failure } from "common-domain";
import express from "express";
import controller from './../../domain/ActionController'

const router = express.Router()

router.get('/actions', (_, res) => {
    return res.json(controller.get())
})

router.post('/action/:id', async (req, res) => {
    const id = req.params.id
    let response: ApiResponse
    try {
        response = await controller.execute(id)
    } catch (e: any) {
        response = failure({
            message: e.toString()
        })
    }
    return res.json(response)
})

export default router