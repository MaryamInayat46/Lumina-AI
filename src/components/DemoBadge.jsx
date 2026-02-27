import React from 'react';
import { motion } from 'framer-motion';
import { DatabaseZap } from 'lucide-react';
import { isMock } from '../lib/supabaseClient';

const DemoBadge = () => {
    if (!isMock && import.meta.env.PROD) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-24 left-6 z-[60] group"
        >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border-neon-blue/30 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                <DatabaseZap className="w-4 h-4 text-neon-blue animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                    Demo Mode
                </span>

                {/* Tooltip content on hover */}
                <div className="absolute left-full ml-3 hidden group-hover:block w-48 p-3 rounded-2xl glass-dark border-white/5 shadow-2xl">
                    <p className="text-[10px] text-slate-300 leading-tight">
                        Running with <span className="text-neon-blue font-bold">Mock Backend</span>. Signups are stored in LocalStorage.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default DemoBadge;
