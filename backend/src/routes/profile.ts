import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/profile
router.get('/', async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const { data: userData, error: userError } = await supabase.auth.getUser(token);

        if (userError || !userData.user) {
            res.status(401).json({ error: 'Invalid session' });
            return;
        }

        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userData.user.id)
            .single();

        if (error) {
            // Profile may not exist yet — that's OK
            res.json({ profile: null });
            return;
        }

        res.json({ profile });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch profile.' });
    }
});

// PUT /api/profile
router.put('/', async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const { data: userData, error: userError } = await supabase.auth.getUser(token);

        if (userError || !userData.user) {
            res.status(401).json({ error: 'Invalid session' });
            return;
        }

        const { height, weight, body_model_url } = req.body;

        const { data, error } = await supabase
            .from('profiles')
            .upsert({
                id: userData.user.id,
                height,
                weight,
                body_model_url,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.json({ profile: data });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to update profile.' });
    }
});

export default router;
