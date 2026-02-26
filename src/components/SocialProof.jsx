import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import { CITIES } from '../data/content';

const SocialProof = () => {
    const [visible, setVisible] = useState(false);
    const [city, setCity] = useState('');

    useEffect(() => {
        const showNotification = () => {
            const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
            setCity(randomCity);
            setVisible(true);

            setTimeout(() => setVisible(false), 5000);
        };

        const interval = setInterval(showNotification, 45000); // 45 seconds

        // Initial show after 10 seconds
        const timeout = setTimeout(showNotification, 10000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="fixed bottom-24 left-6 z-40 hidden md:block">
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="glass-dark px-4 py-3 rounded-2xl flex items-center gap-3 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Recent Activity</p>
                            <p className="text-xs text-white">Someone joined from <span className="font-bold text-neon-blue">{city}</span></p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SocialProof;
