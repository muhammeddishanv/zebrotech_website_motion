"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Target, Compass, Sparkles } from "lucide-react"

const philosophyItems = [
    {
        icon: <Compass className="w-10 h-10 text-blue-500" />,
        title: "Our Mission",
        description: "To empower enterprises with high-performance software and scalable architectures that drive digital innovation.",
        gradient: "from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40"
    },
    {
        icon: <Target className="w-10 h-10 text-emerald-500" />,
        title: "Our Vision",
        description: "To be the premier engineering partner for global brands, setting the gold standard in robust software delivery.",
        gradient: "from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40"
    },
    {
        icon: <Sparkles className="w-10 h-10 text-amber-500" />,
        title: "Engineering Philosophy",
        description: "We believe in the harmony of performance and maintainability. Code without reliability is just debt.",
        gradient: "from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40"
    }
]

export function PhilosophySection() {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="relative h-auto md:h-[600px] flex flex-col md:block items-center justify-center max-w-5xl mx-auto gap-8 md:gap-0">
                    {philosophyItems.map((item, index) => {
                        // Default fan arrangement (Desktop only)
                        const isCenter = index === 1;
                        const defaultRotate = isMobile ? 0 : (index === 0 ? -12 : index === 2 ? 12 : 0);
                        // -175 offsets half the card width (350/2) so center card aligns to middle
                        const defaultX = isMobile ? 0 : (index === 0 ? -525 : index === 2 ? 175 : -175);
                        // -200 centers cards vertically (top-1/2 sets top edge at center, shift up by ~card-height/2)
                        const defaultY = isMobile ? 0 : (index === 0 || index === 2 ? -160 : -200);
                        
                        const isHovered = hoveredIndex === index;
                        const anyHovered = hoveredIndex !== null;

                        return (
                            <motion.div
                                key={index}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                initial={{ opacity: 0, y: isMobile ? 20 : 100 }}
                                whileInView={{ opacity: 1, y: defaultY }}
                                viewport={{ once: true }}
                                animate={{
                                    rotate: isHovered ? 0 : defaultRotate,
                                    x: isHovered ? (isMobile ? 0 : (index === 0 ? -455 : index === 2 ? 105 : -175)) : defaultX,
                                    y: isHovered ? (isMobile ? -10 : defaultY - 20) : defaultY,
                                    scale: isHovered ? 1.05 : 0.95,
                                    zIndex: isHovered ? 50 : (isCenter && !anyHovered ? 30 : index + 10),
                                }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 300, 
                                    damping: 25,
                                    duration: 0.5 
                                }}
                                className={`relative md:absolute md:left-1/2 md:top-1/2 w-full max-w-[350px] md:w-[350px] p-8 md:p-10 rounded-[40px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden group transition-colors duration-500`}
                            >
                                {/* Subtle Background Gradient Tint based on item's color */}
                                <div className={`absolute inset-0 opacity-[0.05] bg-linear-to-br ${item.gradient}`} />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-8 w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-100 dark:border-zinc-700 shadow-sm transition-transform duration-500 group-hover:scale-110">
                                        {item.icon}
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 italic font-serif leading-none tracking-tight">
                                        {item.title}
                                    </h3>
                                    
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base md:text-lg font-medium">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Floating indicator based on the example image style */}
                                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 w-full flex justify-center">
                                    <div className="px-4 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                                        Agility • Scalability
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
