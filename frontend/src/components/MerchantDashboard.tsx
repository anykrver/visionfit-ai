
import React, { useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import Button from './Button';

interface MerchantDashboardProps {
    merchantId: string;
    onBack: () => void;
}

const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ merchantId, onBack }) => {
    const [metrics, setMetrics] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await api.getMerchantMetrics(merchantId);
                setMetrics(data.metrics);
            } catch (err) {
                console.error("Failed to load metrics", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMetrics();
    }, [merchantId]);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-zinc-100 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <Button variant="ghost" onClick={onBack} className="mb-4 -ml-4">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to Shop
                    </Button>
                    <h1 className="text-4xl font-black tracking-tighter">Merchant Dashboard</h1>
                    <p className="text-zinc-500 font-medium">Performance metrics for your VisionFit integration.</p>
                </div>

                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-green-50 rounded-full border border-green-100 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-700">Live Integration</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-xl shadow-black/5 space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Total Try-Ons</h3>
                    <p className="text-5xl font-black tracking-tighter">{metrics?.total_try_ons || 0}</p>
                    <p className="text-xs text-zinc-500 font-medium">Customer sessions using Styll.</p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-xl shadow-black/5 space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Total Clicks to Store</h3>
                    <p className="text-5xl font-black tracking-tighter">{metrics?.total_clicks || 0}</p>
                    <p className="text-xs text-zinc-500 font-medium">Direct traffic driven back to your store.</p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-xl shadow-black/5 space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Conversion Rate</h3>
                    <p className="text-5xl font-black tracking-tighter text-blue-600">{metrics?.conversion_rate || 0}%</p>
                    <p className="text-xs text-zinc-500 font-medium">Try-on to "View Store" conversion.</p>
                </div>
            </div>

            <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                <div className="relative z-10 space-y-6 max-w-xl">
                    <h2 className="text-3xl font-black tracking-tight">Boost your conversions further</h2>
                    <p className="text-zinc-400 font-medium leading-relaxed">
                        Data shows that users who save a Digital Body Model are 40% more likely to return and complete a purchase. Consider offering a "Body Model Bonus" discount.
                    </p>
                    <Button variant="secondary" className="px-8">Generate Campaign Recommendations</Button>
                </div>

                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0, 50 0, 100 80" stroke="white" strokeWidth="0.5" fill="none" />
                        <path d="M0 90 C 30 10, 60 10, 100 70" stroke="white" strokeWidth="0.5" fill="none" />
                        <path d="M0 80 C 40 20, 70 20, 100 60" stroke="white" strokeWidth="0.5" fill="none" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default MerchantDashboard;
