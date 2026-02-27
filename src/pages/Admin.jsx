import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Database, ShieldCheck, Download, Trash2 } from 'lucide-react';

const Admin = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'lumina_admin_2026') {
            setAuthenticated(true);
        } else {
            alert('Invalid admin credentials');
        }
    };

    useEffect(() => {
        if (authenticated) {
            const fetchData = async () => {
                const { data: waitlist, error } = await supabase
                    .from('waitlist')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (!error) setData(waitlist);
                setLoading(false);
            };

            fetchData();
        }
    }, [authenticated]);

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md glass p-8 rounded-3xl border-neon-blue/20"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <ShieldCheck className="w-8 h-8 text-neon-blue" />
                        <h1 className="text-2xl font-bold text-white text-center">Admin Access</h1>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-slate-400 text-sm mb-2">Access Token</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl glass border-white/5 text-white focus:outline-none focus:border-neon-blue/30"
                                placeholder="••••••••"
                            />
                        </div>
                        <button className="w-full py-3 rounded-xl bg-neon-blue text-slate-950 font-bold hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all">
                            Initialize Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-200 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-3">
                        <Database className="w-8 h-8 text-neon-blue" />
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight">Waitlist Database</h1>
                            <p className="text-sm text-slate-400">Manage all registered Lumina AI users</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg glass border-white/10 hover:bg-white/5 transition-all text-sm">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </header>

                <div className="glass rounded-3xl border-white/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Timestamp</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Location</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500 italic">
                                        Connecting to live server cluster...
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500 italic">
                                        The waitlist is currently empty.
                                    </td>
                                </tr>
                            ) : data.map((user) => (
                                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 text-sm font-mono text-slate-400">
                                        {new Date(user.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-white">{user.email}</td>
                                    <td className="px-6 py-4 text-sm text-slate-400">{user.location || 'Unknown'}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-rose-500/50 hover:text-rose-500 transition-colors p-2">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
