import React, { useState, useEffect } from 'react';
import Button from './Button';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
    const [apiKey, setApiKey] = useState('');
    const [savedKey, setSavedKey] = useState('');

    useEffect(() => {
        if (isOpen) {
            const key = localStorage.getItem('gemini_api_key');
            if (key) {
                setApiKey(key);
                setSavedKey(key);
            }
        }
    }, [isOpen]);

    const handleSave = () => {
        if (apiKey.trim()) {
            localStorage.setItem('gemini_api_key', apiKey.trim());
            setSavedKey(apiKey.trim());
            onClose();
            alert("API Key saved locally!");
        } else {
            localStorage.removeItem('gemini_api_key');
            setSavedKey('');
            setApiKey('');
            alert("API Key removed.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-md p-6 rounded-3xl shadow-2xl space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Connect your API Key</h2>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                </div>

                <p className="text-sm text-zinc-500">
                    To bypass the shared quota limits, you can provide your own Gemini API key.
                    It is stored locally in your browser and never saved to our database.
                </p>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Gemini API Key</label>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="AIzaSy..."
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all font-mono text-sm"
                    />
                </div>

                <div className="pt-2 flex gap-3">
                    <Button variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
                    <Button className="flex-1" onClick={handleSave}>{savedKey ? 'Update Key' : 'Save Key'}</Button>
                </div>

                <div className="text-center pt-2">
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-[10px] uppercase font-bold text-zinc-400 hover:text-black hover:underline">Get an API Key</a>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;
