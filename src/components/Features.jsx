import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Globe, Zap, BarChart3, Users } from 'lucide-react';
import { CONTENT } from '../data/content';

const iconMap = {
    'Distributed Training': <Cpu className="w-8 h-8 text-neon-blue" />,
    'Enterprise Security': <Shield className="w-8 h-8 text-neon-blue" />,
    'Edge Deployment': <Globe className="w-8 h-8 text-neon-blue" />,
    'Real-time Adaptation': <Zap className="w-8 h-8 text-neon-blue" />,
    'Advanced Analytics': <BarChart3 className="w-8 h-8 text-neon-blue" />,
    'Collaborative AI': <Users className="w-8 h-8 text-neon-blue" />
};

const Features = () => {
    const { features } = CONTENT;

    return (
        <section id="features" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        {features.title} <br />
                        <span className="text-neon-blue">{features.titleAccent}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        {features.description}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.items.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl glass border-white/5 hover:border-neon-blue/20 transition-all hover:bg-white/[0.07] group cursor-default"
                        >
                            <div className="mb-6 p-3 bg-neon-blue/10 rounded-2xl inline-block group-hover:scale-110 transition-transform">
                                {iconMap[feature.title] || <Zap className="w-8 h-8 text-neon-blue" />}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
