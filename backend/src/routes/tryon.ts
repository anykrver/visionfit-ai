import { Router, Request, Response } from 'express';
import { agentService } from '../services/AgentService.js';
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

        // Extract custom API key if present
        const customApiKey = req.headers['x-gemini-api-key'];
        if (typeof customApiKey === 'string' && customApiKey.trim()) {
            requestData.apiKey = customApiKey.trim();
        }

        const customModel = req.headers['x-gemini-model'];
        if (typeof customModel === 'string' && customModel.trim()) {
            requestData.model = customModel.trim();
        }

        const result = await agentService.orchestrateTryOn(requestData);
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
