import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

// POST /api/analytics/click
// Tracks a "View Store" click
router.post('/click', async (req: Request, res: Response) => {
    try {
        const { product_id, merchant_id } = req.body;

        // Log the click in a new analytics table or update metadata
        // For simplicity, we'll use a new table 'analytics'
        const { error } = await supabase
            .from('analytics')
            .insert({
                event_type: 'click_store',
                product_id,
                merchant_id,
                created_at: new Date().toISOString()
            });

        if (error) {
            console.error("Analytics Error:", error);
            // Don't fail the request for the user, just log it
        }

        res.json({ status: 'ok' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/analytics/merchant/:merchantId
// Fetches conversion metrics for a merchant
router.get('/merchant/:merchantId', async (req: Request, res: Response) => {
    try {
        const { merchantId } = req.params;

        // 1. Get total try-ons for this merchant's products
        const { data: tryOns, count: tryOnCount, error: tryOnError } = await supabase
            .from('try_ons')
            .select('id, product_id!inner(merchant_id)', { count: 'exact' })
            .eq('product_id.merchant_id', merchantId);

        if (tryOnError) throw tryOnError;

        // 2. Get total clicks for this merchant
        const { count: clickCount, error: clickError } = await supabase
            .from('analytics')
            .select('id', { count: 'exact' })
            .eq('merchant_id', merchantId)
            .eq('event_type', 'click_store');

        if (clickError) throw clickError;

        res.json({
            metrics: {
                total_try_ons: tryOnCount || 0,
                total_clicks: clickCount || 0,
                conversion_rate: tryOnCount ? ((clickCount || 0) / tryOnCount * 100).toFixed(2) : 0
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
