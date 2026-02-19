import { TryOnRequest, TryOnResult } from '../types';
import { Product } from '../types';

const API_BASE = '/api';

// Helper to get stored auth token
const getToken = (): string | null => {
    return localStorage.getItem('Styll_token');
};

const setToken = (token: string | null) => {
    if (token) {
        localStorage.setItem('Styll_token', token);
    } else {
        localStorage.removeItem('Styll_token');
    }
};

const setRefreshToken = (token: string | null) => {
    if (token) {
        localStorage.setItem('Styll_refresh_token', token);
    } else {
        localStorage.removeItem('Styll_refresh_token');
    }
};

const authHeaders = (): Record<string, string> => {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
    // ── Products ──────────────────────────────────
    async getProducts(): Promise<Product[]> {
        const res = await fetch(`${API_BASE}/products`);
        return res.json();
    },

    // ── Try-On ────────────────────────────────────
    async performTryOn(data: TryOnRequest): Promise<TryOnResult> {
        const res = await fetch(`${API_BASE}/tryon`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeaders() },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    // ── Auth ──────────────────────────────────────
    async signIn(email: string, password: string): Promise<{ user: any; error?: string }> {
        const res = await fetch(`${API_BASE}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        setToken(data.session?.access_token || null);
        setRefreshToken(data.session?.refresh_token || null);
        return data;
    },

    async signUp(email: string, password: string): Promise<{ user: any; message?: string; error?: string }> {
        const res = await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    },

    async signOut(): Promise<void> {
        await fetch(`${API_BASE}/auth/signout`, {
            method: 'POST',
            headers: authHeaders(),
        });
        setToken(null);
        setRefreshToken(null);
    },

    async getSession(): Promise<{ user: any }> {
        const token = getToken();
        if (!token) return { user: null };

        const res = await fetch(`${API_BASE}/auth/session`, {
            headers: authHeaders(),
        });
        return res.json();
    },

    // ── Profile ───────────────────────────────────
    async getProfile(): Promise<{ profile: any }> {
        const res = await fetch(`${API_BASE}/profile`, {
            headers: authHeaders(),
        });
        if (!res.ok) return { profile: null };
        return res.json();
    },

    async updateProfile(data: { height: string; weight: string; body_model_url?: string }): Promise<void> {
        await fetch(`${API_BASE}/profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeaders() },
            body: JSON.stringify(data),
        });
    },
};
