import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const tiers = [
    {
        name: 'Basic',
        price: '$49',
        description: 'Perfect for small teams and startups.',
        features: ['5,000 requests/mo', 'Standard support', 'Community access', 'Basic analytics'],
        highlight: false
    },
    {
        name: 'Pro',
        price: '$199',
        description: 'Advanced features for growing companies.',
        features: ['50,000 requests/mo', 'Priority support', 'Advanced AI tools', 'Custom dashboards', 'API Access'],
        highlight: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Maximum scale and security for large organizations.',
        features: ['Unlimited requests', '24/7 dedicated support', 'On-premise deployment', 'Custom SLAs', 'White-labeling'],
        highlight: false
    }
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 relative bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Predictable <span className="text-neon-blue">Pricing.</span>
                    </motion.h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Choose the plan that fits your needs. No hidden fees, cancel anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl flex flex-col h-full transition-all duration-300 ${tier.highlight
                                    ? 'bg-slate-800/80 border-2 border-neon-blue scale-105 z-10'
                                    : 'glass border-white/5 hover:bg-white/[0.07]'
                                }`}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-blue text-slate-950 text-xs font-bold rounded-full uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                                    {tier.price !== 'Custom' && <span className="text-slate-400">/mo</span>}
                                </div>
                                <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                                    {tier.description}
                                </p>
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-slate-300 text-sm">
                                            <Check className="w-5 h-5 text-neon-blue shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${tier.highlight
                                    ? 'bg-neon-blue text-slate-950 hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                                    : 'glass border-white/10 text-white hover:bg-white/10'
                                }`}>
                                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Start Trial'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
