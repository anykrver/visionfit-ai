
import React, { useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import Button from './Button';

interface ProfilePageProps {
    onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [height, setHeight] = useState('175');
    const [weight, setWeight] = useState('70');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { profile: userProfile } = await api.getProfile();
                if (userProfile) {
                    setProfile(userProfile);
                    setHeight(userProfile.height || '175');
                    setWeight(userProfile.weight || '70');
                }
            } catch (err) {
                console.error("Failed to load profile", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const { profile: updatedProfile } = await api.updateProfile({
                height,
                weight,
                body_model_url: profile?.body_model_url
            });
            setProfile(updatedProfile);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-zinc-100 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <Button variant="ghost" onClick={onBack} className="mb-8">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Gallery
            </Button>

            <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-2xl shadow-black/5 overflow-hidden">
                <div className="p-8 md:p-12 border-b border-zinc-100">
                    <h1 className="text-4xl font-black tracking-tighter mb-2">My Body Model</h1>
                    <p className="text-zinc-500 font-medium">Manage your measurements and saved fitting portrait.</p>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Measurements</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Height (cm)</label>
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                className="w-full py-4 text-sm uppercase tracking-[0.2em] font-black shadow-lg shadow-black/10"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                            {message && (
                                <p className={`mt-4 text-center text-xs font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                    {message.text}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Portrait</h2>
                        <div className="relative aspect-[3/4] bg-zinc-50 rounded-[2rem] border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden">
                            {profile?.body_model_url ? (
                                <img src={profile.body_model_url} alt="Base Portrait" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-8">
                                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <p className="text-xs font-bold text-zinc-400">No portrait saved yet. Upload one during your next try-on.</p>
                                </div>
                            )}
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed text-center font-medium">To update your photo, start a new try-on session and select "Save My Digital Body Model".</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
