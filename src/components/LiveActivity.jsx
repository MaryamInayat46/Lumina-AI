import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Cpu, Terminal } from 'lucide-react';

const activities = [
    { icon: <Zap className="w-4 h-4" />, text: "New node deployed in Singapore" },
    { icon: <Shield className="w-4 h-4" />, text: "Security patch active: v2.4.1" },
    { icon: <Cpu className="w-4 h-4" />, text: "Distributed training at 92% capacity" },
    { icon: <Terminal className="w-4 h-4" />, text: "Inference latency averaged 12ms" }
];

const LiveActivity = () => {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % activities.length);
                setVisible(true);
            }, 500); // Wait for fade out
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-40 hidden md:block">
            <AnimatePresence mode="wait">
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="glass px-4 py-3 rounded-2xl flex items-center gap-3 border-neon-blue/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]"
                    >
                        <div className="text-neon-blue">
                            {activities[index].icon}
                        </div>
                        <span className="text-xs font-medium text-slate-300">
                            {activities[index].text}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LiveActivity;
