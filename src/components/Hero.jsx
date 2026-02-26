import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/10 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 mb-8 hover:border-neon-blue/30 transition-colors cursor-pointer group">
                        <span className="text-xs font-semibold tracking-wider uppercase text-neon-blue">New Generation</span>
                        <div className="w-1 h-1 rounded-full bg-slate-600" />
                        <span className="text-xs text-slate-400">Lumina AI v2.0 is here</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
                        Intelligence for the <br />
                        <span className="bg-gradient-to-r from-neon-blue to-teal-400 bg-clip-text text-transparent">
                            Next Frontier.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Deploy hyper-personalized AI models at scale. Lumina AI provides the infrastructure to build, train, and ship intelligence in record time.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="w-full sm:w-auto px-10 py-4 rounded-full bg-neon-blue text-slate-950 font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                            Get Started Free
                        </button>
                        <button className="w-full sm:w-auto px-10 py-4 rounded-full glass border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                            <Play className="w-5 h-5 fill-current" />
                            Watch Demo
                        </button>
                    </div>
                </motion.div>

                {/* Floating elements for visual depth */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[15%] hidden lg:block"
                >
                    <div className="w-24 h-24 glass rounded-2xl rotate-12 flex items-center justify-center">
                        <div className="w-12 h-1 bg-neon-blue rounded-full shadow-[0_0_10px_rgba(0,242,255,0.8)]" />
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[20%] left-[10%] hidden lg:block"
                >
                    <div className="w-32 h-32 glass rounded-full -rotate-12 flex items-center justify-center">
                        <div className="w-16 h-16 border-2 border-dashed border-white/20 rounded-full animate-spin-slow" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
