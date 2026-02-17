import { Router, Request, Response } from 'express';
import { geminiService } from '../services/geminiService.js';
import { TryOnRequest } from '../types.js';

const router = Router();

// POST /api/tryon
router.post('/', async (req: Request, res: Response) => {
    try {
        const requestData: TryOnRequest = req.body;

        if (!requestData.user_image || !requestData.garment_image) {
            res.status(400).json({
                imageUrl: '',
                status: 'error',
                message: 'user_image and garment_image are required.'
            });
            return;
        }

        const result = await geminiService.performTryOn(requestData);
        res.json(result);
    } catch (error: any) {
        console.error("Try-on route error:", error);
        res.status(500).json({
            imageUrl: '',
            status: 'error',
            message: error.message || "An unexpected error occurred."
        });
    }
});

export default router;
