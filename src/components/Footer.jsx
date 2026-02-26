import React from 'react';
import { Mail, Github, Twitter, Linkedin, Zap } from 'lucide-react';

const Footer = () => {
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
                        <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                            Empowering the next generation of intelligent applications with high-performance infrastructure and intuitive tools.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 glass border-white/5 text-slate-400 hover:text-neon-blue hover:border-neon-blue/20 transition-all rounded-lg">
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
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Newsletter</h4>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Get the latest updates on AI infrastructure sent directly to your inbox.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl glass border-white/5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-blue/30 transition-all"
                                />
                            </div>
                            <button className="w-full py-3 rounded-xl bg-neon-blue text-slate-950 font-bold text-sm hover:shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-all">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs">
                    <p>© 2026 Lumina AI Inc. All rights reserved.</p>
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
