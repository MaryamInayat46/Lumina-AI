import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Globe, Zap, BarChart3, Users } from 'lucide-react';

const features = [
    {
        icon: <Cpu className="w-8 h-8 text-neon-blue" />,
        title: 'Distributed Training',
        description: 'Scale your model training across thousands of GPUs with zero configuration overhead.'
    },
    {
        icon: <Shield className="w-8 h-8 text-neon-blue" />,
        title: 'Enterprise Security',
        description: 'End-to-end encryption and SOC2 Type II compliance built into every layer of our infrastructure.'
    },
    {
        icon: <Globe className="w-8 h-8 text-neon-blue" />,
        title: 'Edge Deployment',
        description: 'Deploy intelligence closer to your users with our global network of low-latency inference nodes.'
    },
    {
        icon: <Zap className="w-8 h-8 text-neon-blue" />,
        title: 'Real-time Adaptation',
        description: 'Models that learn and evolve with your data in real-time, providing up-to-the-minute insights.'
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-neon-blue" />,
        title: 'Advanced Analytics',
        description: 'Deep visibility into model performance, usage patterns, and cost optimization opportunities.'
    },
    {
        icon: <Users className="w-8 h-8 text-neon-blue" />,
        title: 'Collaborative AI',
        description: 'Built-in tools for teams to collaborate on model design, testing, and deployment workflows.'
    }
];

const Features = () => {
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
                        Built for the most <br />
                        <span className="text-neon-blue">demanding AI workloads.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        Lumina AI provides everything you need to build next-generation intelligent applications without the infrastructure headache.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl glass border-white/5 hover:border-neon-blue/20 transition-all hover:bg-white/[0.07] group cursor-default"
                        >
                            <div className="mb-6 p-3 bg-neon-blue/10 rounded-2xl inline-block group-hover:scale-110 transition-transform">
                                {feature.icon}
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
