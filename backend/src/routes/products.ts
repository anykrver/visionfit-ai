import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { MOCK_PRODUCTS } from '../data/mockProducts.js';

const router = Router();

// GET /api/products
router.get('/', async (_req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
            res.json(data);
        } else {
            res.json(MOCK_PRODUCTS);
        }
    } catch (err) {
        console.warn("Supabase connection failed, using offline fallback.", err);
        res.json(MOCK_PRODUCTS);
    }
});

export default router;
