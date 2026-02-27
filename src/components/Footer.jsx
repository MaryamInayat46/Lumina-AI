import React, { useState, useEffect } from 'react';
import { Mail, Github, Twitter, Linkedin, Zap, CheckCircle2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import useSubmit from '../hooks/useSubmit';
import { supabase } from '../lib/supabaseClient';
import { CONTENT } from '../data/content';

const Footer = () => {
    const { footer } = CONTENT;
    const [waitlistCount, setWaitlistCount] = useState(1240); // Base count

    useEffect(() => {
        // 1. Initial fetch of count
        const fetchInitialCount = async () => {
            const { count, error } = await supabase
                .from('waitlist')
                .select('*', { count: 'exact', head: true });

            if (!error && count !== null) {
                setWaitlistCount(1240 + count); // 1240 is our "starting" social proof
            }
        };

        fetchInitialCount();

        // 2. Real-time subscription for new signups
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'waitlist' },
                (payload) => {
                    setWaitlistCount(prev => prev + 1);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleSuccess = () => {
        toast.success('Successfully joined the waitlist!', {
            style: {
                background: '#0f172a',
                color: '#fff',
                border: '1px solid rgba(0, 242, 255, 0.2)',
            },
            iconTheme: {
                primary: '#00f2ff',
                secondary: '#0f172a',
            },
        });
    };

    const { submit, loading, error, success, reset } = useSubmit(handleSuccess);

    const onFormSubmit = (e) => {
        const formData = new FormData(e.target);
        const email = formData.get('email');
        if (!email) {
            toast.error('Please enter an email address.');
            e.preventDefault();
            return;
        }
        submit(e);
    };

    return (
        <footer className="pt-24 pb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Zap className="w-6 h-6 text-neon-blue" />
                            <span className="text-xl font-bold tracking-tight text-white">Lumina AI</span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-4 leading-relaxed">
                            {footer.tagline}
                        </p>
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20">
                                <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                                <span className="text-xs font-bold text-neon-blue">{waitlistCount.toLocaleString()} Users Joined</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 glass border-white/5 text-slate-400 hover:text-neon-blue hover:border-neon-blue/20 transition-all rounded-lg" aria-label="Social Link">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Product</h4>
                        <ul className="space-y-4">
                            {['Features', 'Solutions', 'Pricing', 'Documentation'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{footer.newsletter.title}</h4>

                        {success ? (
                            <div className="p-6 rounded-2xl glass border-neon-blue/20 text-center">
                                <CheckCircle2 className="w-10 h-10 text-neon-blue mx-auto mb-4" />
                                <h5 className="text-white font-bold mb-2">You're on the list!</h5>
                                <p className="text-slate-400 text-sm mb-4">Check your email for the next steps.</p>
                                <button
                                    onClick={reset}
                                    className="text-xs text-neon-blue hover:underline flex items-center justify-center gap-1 mx-auto"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    Try another email
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    {footer.newsletter.description}
                                </p>
                                <form className="space-y-3" onSubmit={onFormSubmit}>
                                    {/* Honeypot Field */}
                                    <div className="hidden" aria-hidden="true">
                                        <input type="text" name="bot_field" tabIndex="-1" autoComplete="off" />
                                    </div>

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Email address"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl glass border-white/5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-blue/30 transition-all"
                                        />
                                    </div>
                                    {error && <p className="text-rose-500 text-xs mt-1">{error}</p>}
                                    <button
                                        disabled={loading}
                                        className="w-full py-3 rounded-xl bg-neon-blue text-slate-950 font-bold text-sm hover:shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs">
                    <p>{footer.copyright}</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
