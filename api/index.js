import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';

// ─── Express App ──────────────────────────────────────────────
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ─── Supabase Client ──────────────────────────────────────────
const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

// ─── Mock Products ────────────────────────────────────────────
const MOCK_PRODUCTS = [
    { id: "1", title: "Minimalist Linen Blazer", price: "$149.00", imageUrl: "https://i.pinimg.com/736x/6e/d3/97/6ed397f9f34d89f3cb97a77f5c984678.jpg", description: "A premium, structured blazer crafted from breathable European linen.", category: "Outerwear" },
    { id: "2", title: "Oversized Oatmeal Wool Coat", price: "$210.00", imageUrl: "https://i.pinimg.com/736x/ab/2b/60/ab2b60598f2d74609fbba794007092a9.jpg", description: "A long-line wool blend coat in a neutral oatmeal hue.", category: "Outerwear" },
    { id: "3", title: "Tailored Slate Grey Trousers", price: "$89.00", imageUrl: "https://i.pinimg.com/736x/fd/d4/2a/fdd42ab012bbcfa5d3f1f608f2e3bf07.jpg", description: "High-waisted, wide-leg trousers in a refined slate grey.", category: "Bottoms" },
    { id: "4", title: "Monochrome Scandi Knit Sweater", price: "$125.00", imageUrl: "https://i.pinimg.com/1200x/83/17/88/831788539560423af782fae6601b536e.jpg", description: "A chunky, high-neck sweater featuring a minimalist monochrome pattern.", category: "Knitwear" },
    { id: "5", title: "Essential Beige Trench Coat", price: "$185.00", imageUrl: "https://i.pinimg.com/736x/85/30/25/853025b61644a4c4103d63078f95ca61.jpg", description: "The ultimate wardrobe staple: a double-breasted trench coat.", category: "Outerwear" },
    { id: "6", title: "Soft Ivory Cashmere Scarf", price: "$75.00", imageUrl: "https://i.pinimg.com/736x/32/19/70/3219701f9e9041eebd49c8e99e22d3ff.jpg", description: "Luxuriously soft 100% cashmere scarf in a creamy ivory shade.", category: "Accessories" },
    { id: "7", title: "Structured Charcoal Blazer", price: "$155.00", imageUrl: "https://i.pinimg.com/736x/36/bb/48/36bb48257a891538f7fc0d4dd30a141c.jpg", description: "A modern take on the classic blazer.", category: "Outerwear" },
    { id: "8", title: "Midnight Navy Silk Slip Dress", price: "$130.00", imageUrl: "https://i.pinimg.com/736x/0a/4f/5d/0a4f5d3ab13c18a9956155f75058dda0.jpg", description: "A fluid silk midi dress in deep navy.", category: "Dresses" },
    { id: "9", title: "Cream Ribbed Turtleneck", price: "$68.00", imageUrl: "https://i.pinimg.com/736x/03/27/08/032708acfd0ece7ef2eb2963668b62f2.jpg", description: "A lightweight, form-fitting ribbed turtleneck.", category: "Knitwear" },
    { id: "10", title: "Espresso Leather Chelsea Boots", price: "$195.00", imageUrl: "https://i.pinimg.com/736x/8e/a7/94/8ea7941d725338f8fd4c122839656a7d.jpg", description: "Durable pebbled leather boots in a rich espresso brown.", category: "Footwear" },
    { id: "11", title: "Oatmeal Melange Cardigan", price: "$95.00", imageUrl: "https://i.pinimg.com/736x/6e/b2/27/6eb227d6da7d70f1bf1cf5d89529323e.jpg", description: "A soft, boxy cardigan with oversized buttons.", category: "Knitwear" },
    { id: "12", title: "Taupe Suede Bucket Bag", price: "$160.00", imageUrl: "https://i.pinimg.com/736x/9c/c0/fd/9cc0fd4f6c6fbb7140fce00fc8407c7e.jpg", description: "A minimalist bucket bag in supple taupe suede.", category: "Accessories" },
    { id: "13", title: "Raw Hem Straight Leg Jeans", price: "$110.00", imageUrl: "https://i.pinimg.com/736x/f7/26/29/f72629c8c862c909bbe3048851766c97.jpg", description: "Classic straight-leg denim in a vintage wash.", category: "Bottoms" },
    { id: "14", title: "Sandstone Utility Jacket", price: "$140.00", imageUrl: "https://i.pinimg.com/1200x/29/aa/84/29aa8480af3f4638058b9dd883d1d0ce.jpg", description: "A functional utility jacket in durable cotton canvas.", category: "Outerwear" },
    { id: "15", title: "Mocha Silk Blouse", price: "$98.00", imageUrl: "https://i.pinimg.com/736x/7d/6f/ee/7d6feef199dae0edd19c4058724e541b.jpg", description: "A sophisticated silk blouse in a warm mocha shade.", category: "Tops" },
    { id: "16", title: "Ecru Cotton Poplin Shirt", price: "$75.00", imageUrl: "https://i.pinimg.com/1200x/0a/c9/ea/0ac9ea2bb8a830ae046b655a2adda135.jpg", description: "A crisp, oversized poplin shirt in an ecru finish.", category: "Tops" },
    { id: "17", title: "Camel Hair Midi Skirt", price: "$115.00", imageUrl: "https://i.pinimg.com/736x/77/72/31/777231007944c47e34bc13146a30c184.jpg", description: "A sleek, high-waisted midi skirt in a warm camel wool blend.", category: "Bottoms" },
    { id: "18", title: "Grey Marl Lounge Set", price: "$120.00", imageUrl: "https://i.pinimg.com/736x/24/78/0b/24780b61f37fc63a883f1e56245b3681.jpg", description: "A premium two-piece set with relaxed hoodie and matching joggers.", category: "Loungewear" },
    { id: "19", title: "Gold Vermeil Arc Earrings", price: "$55.00", imageUrl: "https://i.pinimg.com/736x/9a/28/5c/9a285c26731ec2d9064c6e6b0f1c535d.jpg", description: "Modern, geometric arc earrings in 18k gold vermeil.", category: "Accessories" },
    { id: "20", title: "Black Suede Pointed Mules", price: "$110.00", imageUrl: "https://i.pinimg.com/736x/bf/b9/ec/bfb9ec98dfdc5560959ac0acad8f5e91.jpg", description: "Elegant pointed-toe mules in jet black suede.", category: "Footwear" }
];

// ─── Gemini Service ───────────────────────────────────────────
async function performTryOn(request) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not set.");

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are an elite virtual try-on AI (VisionFit AI). Your specialty is rendering a person from a portrait (Image 1) wearing a specific garment from a reference (Image 2) with absolute realism.

CRITICAL CONSTRAINTS:
1. IDENTITY PRESERVATION: Keep the person's face, eyes, hair, skin tone, and features 100% identical to Image 1.
2. BACKGROUND & POSE PRESERVATION: Use the EXACT background and the EXACT body pose from Image 1. Do NOT use the background or the pose of the model in Image 2.
3. PHYSICS & FIT: Adjust the garment from Image 2 to fit the person's body shape and pose in Image 1. Account for their height (${request.adjustment_params.height}cm) and weight (${request.adjustment_params.weight}kg).
4. LIGHTING: Match the garment's lighting and shadows perfectly to the environment and lighting direction in Image 1.
5. TEXTURE: Maintain high-fidelity texture of the fabric.
6. CLEANUP: Remove any text, prices, or watermarks from the final render.`;

    const prompt = `Render a high-resolution version of Image 1 where the person is wearing the exact garment from Image 2.
- Preserve Identity: Face, hair, and skin from Image 1 must be identical.
- Background & Pose: Use the background and pose from Image 1.
- Physics: Drape the ${request.category} naturally over the person.`;

    const parts = [{ text: prompt }];
    const isBase64 = (str) => str.startsWith('data:');

    if (isBase64(request.user_image)) {
        const [mime, data] = request.user_image.split(',');
        const mimeType = mime.match(/:(.*?);/)?.[1] || 'image/jpeg';
        parts.push({ inlineData: { data, mimeType } });
    } else {
        parts.push({ text: `User Image (Image 1): ${request.user_image}` });
    }

    if (isBase64(request.garment_image)) {
        const [mime, data] = request.garment_image.split(',');
        const mimeType = mime.match(/:(.*?);/)?.[1] || 'image/jpeg';
        parts.push({ inlineData: { data, mimeType } });
    } else {
        parts.push({ text: `Garment Image (Image 2): ${request.garment_image}` });
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
            systemInstruction,
            imageConfig: { aspectRatio: "3:4" }
        }
    });

    let generatedImageUrl = '';
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
            if (part.inlineData) {
                generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
                break;
            }
        }
    }

    if (!generatedImageUrl) {
        throw new Error(response.text || "The AI render engine failed to produce an image.");
    }

    return { imageUrl: generatedImageUrl, status: 'success' };
}

// ─── Routes ───────────────────────────────────────────────────

// Health
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Products
app.get('/api/products', async (_req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.json(data && data.length > 0 ? data : MOCK_PRODUCTS);
    } catch (err) {
        console.warn("Supabase connection failed, using offline fallback.", err);
        res.json(MOCK_PRODUCTS);
    }
});

// Try-On
app.post('/api/tryon', async (req, res) => {
    try {
        const requestData = req.body;
        if (!requestData.user_image || !requestData.garment_image) {
            res.status(400).json({ imageUrl: '', status: 'error', message: 'user_image and garment_image are required.' });
            return;
        }
        const result = await performTryOn(requestData);
        res.json(result);
    } catch (error) {
        console.error("Try-on route error:", error);
        if (error.message?.includes('429') || error.message?.toLowerCase().includes('quota') || error.status === 429) {
            res.status(500).json({ imageUrl: '', status: 'error', message: 'QUOTA_EXHAUSTED' });
            return;
        }
        res.status(500).json({ imageUrl: '', status: 'error', message: error.message || "An unexpected error occurred." });
    }
});

// Auth - Sign In
app.post('/api/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) { res.status(401).json({ error: error.message }); return; }
        res.json({ user: data.user, session: { access_token: data.session?.access_token, refresh_token: data.session?.refresh_token } });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Authentication failed.' });
    }
});

// Auth - Sign Up
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) { res.status(400).json({ error: error.message }); return; }
        res.json({ user: data.user, message: 'Verification email sent! Please check your inbox.' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Sign up failed.' });
    }
});

// Auth - Sign Out
app.post('/api/auth/signout', async (_req, res) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) { res.status(500).json({ error: error.message }); return; }
        res.json({ message: 'Signed out successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Sign out failed.' });
    }
});

// Auth - Session
app.get('/api/auth/session', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) { res.json({ user: null }); return; }
        const token = authHeader.split(' ')[1];
        const { data, error } = await supabase.auth.getUser(token);
        if (error || !data.user) { res.json({ user: null }); return; }
        res.json({ user: data.user });
    } catch (error) {
        res.json({ user: null });
    }
});

// Profile - Get
app.get('/api/profile', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) { res.status(401).json({ error: 'Not authenticated' }); return; }
        const token = authHeader.split(' ')[1];
        const { data: userData, error: userError } = await supabase.auth.getUser(token);
        if (userError || !userData.user) { res.status(401).json({ error: 'Invalid session' }); return; }
        const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', userData.user.id).single();
        if (error) { res.json({ profile: null }); return; }
        res.json({ profile });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch profile.' });
    }
});

// Profile - Update
app.put('/api/profile', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) { res.status(401).json({ error: 'Not authenticated' }); return; }
        const token = authHeader.split(' ')[1];
        const { data: userData, error: userError } = await supabase.auth.getUser(token);
        if (userError || !userData.user) { res.status(401).json({ error: 'Invalid session' }); return; }
        const { height, weight, body_model_url } = req.body;
        const { data, error } = await supabase.from('profiles').upsert({ id: userData.user.id, height, weight, body_model_url, updated_at: new Date().toISOString() }).select().single();
        if (error) { res.status(500).json({ error: error.message }); return; }
        res.json({ profile: data });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to update profile.' });
    }
});

export default app;
