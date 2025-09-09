import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
const testimonials = [
    { name: "Priya S.", school: "KV, Delhi", quote: "I never knew learning about the environment could be this fun! My whole class competes to get on the leaderboard every week.", avatar: "https://i.pravatar.cc/80?u=priya" },
    { name: "Mr. Sharma", school: "Teacher, DPS Mumbai", quote: "Prakriti Ke Yoddha is a revolutionary tool for education. It aligns perfectly with the NEP and makes my students genuinely excited about sustainability.", avatar: "https://i.pravatar.cc/80?u=sharma" },
    { name: "Rohan K.", school: "Std. 8, Bangalore", quote: "My favorite part is customizing my Yoddha. Earning badges for real-world tasks like planting a sapling feels amazing!", avatar: "https://i.pravatar.cc/80?u=rohan" },
    { name: "Anjali M.", school: "Std. 7, Kolkata", quote: "Our school's Eco-Club uses the platform to organize clean-up drives. It's awesome to see our collective points grow and make a real difference.", avatar: "https://i.pravatar.cc/80?u=anjali" },
];
// We duplicate the testimonials to create the seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials];
const Testimonials = () => {
    const marqueeVariants = {
        animate: {
            x: [0, -1888], // This value should be -(width of one card + gap) * number of original cards
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40, // Adjust duration for speed
                    ease: "linear",
                },
            },
        },
    };
    return (_jsx("section", { id: "testimonials", className: "py-20 bg-emerald-50/50", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-extrabold text-gray-800 mb-4", children: ["Voices of Our ", _jsx("span", { className: "text-emerald-600", children: "Prakriti Yoddhas" })] }), _jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "See what students and teachers across India are saying about their adventure." })] }), _jsx("div", { className: "group w-full overflow-hidden", children: _jsx(motion.div, { className: "flex gap-8 py-4", variants: marqueeVariants, animate: "animate", children: duplicatedTestimonials.map((testimonial, index) => (_jsxs("div", { 
                            // The [.group:hover_&]:pause is a Tailwind trick to pause the animation on hover
                            className: "relative flex-shrink-0 w-[90vw] md:w-[450px] bg-white p-8 rounded-2xl shadow-xl border border-gray-100 group-hover:[animation-play-state:paused]", style: { animation: 'marquee 40s linear infinite' }, children: [_jsx(FaQuoteLeft, { className: "absolute top-6 left-6 text-5xl text-gray-100 -z-0" }), _jsxs("p", { className: "relative z-10 text-lg text-gray-700 mb-6 leading-relaxed", children: ["\"", testimonial.quote, "\""] }), _jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: testimonial.avatar, alt: testimonial.name, className: "w-16 h-16 rounded-full mr-4 border-2 border-emerald-500" }), _jsxs("div", { children: [_jsx("h4", { className: "font-bold text-lg text-gray-800", children: testimonial.name }), _jsx("p", { className: "text-gray-500", children: testimonial.school })] })] })] }, index))) }) })] }) }));
};
export default Testimonials;
//# sourceMappingURL=Testimonials.js.map