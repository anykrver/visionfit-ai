import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

// POST /api/auth/signin
router.post('/signin', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            res.status(401).json({ error: error.message });
            return;
        }

        res.json({
            user: data.user,
            session: {
                access_token: data.session?.access_token,
                refresh_token: data.session?.refresh_token,
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Authentication failed.' });
    }
});

// POST /api/auth/signup
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        res.json({
            user: data.user,
            message: 'Verification email sent! Please check your inbox.'
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Sign up failed.' });
    }
});

// POST /api/auth/signout
router.post('/signout', async (_req: Request, res: Response) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ message: 'Signed out successfully.' });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Sign out failed.' });
    }
});

// GET /api/auth/session
router.get('/session', async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.json({ user: null });
            return;
        }

        const token = authHeader.split(' ')[1];
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            res.json({ user: null });
            return;
        }

        res.json({ user: data.user });
    } catch (error) {
        res.json({ user: null });
    }
});

export default router;
