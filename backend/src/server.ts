import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import tryonRouter from './routes/tryon.js';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

console.log(`[DEBUG] SUPABASE_URL loaded: ${!!process.env.SUPABASE_URL}`);
console.log(`[DEBUG] Current Directory: ${process.cwd()}`);

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/tryon', tryonRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n  🚀 VisionFit Backend running at http://localhost:${PORT}`);
    console.log(`  📦 API endpoints:`);
    console.log(`     GET  /api/products`);
    console.log(`     POST /api/tryon`);
    console.log(`     POST /api/auth/signin`);
    console.log(`     POST /api/auth/signup`);
    console.log(`     POST /api/auth/signout`);
    console.log(`     GET  /api/auth/session`);
    console.log(`     GET  /api/profile`);
    console.log(`     PUT  /api/profile`);
    console.log(`     GET  /api/health\n`);
});
