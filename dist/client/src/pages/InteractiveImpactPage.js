import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useScroll, useTransform, useInView, animate, } from "framer-motion";
import { FaTree, FaWater, FaRecycle, FaSchool, FaHeart, FaQuoteLeft, FaLightbulb, FaMapMarkedAlt, FaArrowRight, } from "react-icons/fa";
import { useRef, useEffect } from "react";
// --- Reusable Counter Component (No changes) ---
function Counter({ to }) {
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
    useEffect(() => {
        if (isInView) {
            const node = nodeRef.current;
            const controls = animate(0, to, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(value) {
                    node.textContent = Math.round(value).toLocaleString("en-IN");
                },
            });
            return () => controls.stop();
        }
    }, [isInView, to]);
    return _jsx("span", { ref: nodeRef, children: "0" });
}
// --- Data (No changes) ---
const impactData = [
    {
        type: "mainStat",
        icon: _jsx(FaSchool, {}),
        value: 1350,
        label: "Schools Have Joined the Mission",
        align: "left",
        details: "From bustling urban centers to remote villages, schools across the nation are empowering their students to become environmental warriors.",
    },
    {
        type: "testimonial",
        quote: "The Eco-Club missions have brought our school together. We're not just learning; we're actively making our campus greener!",
        author: "Mrs. Desai, Teacher, Pune",
    },
    {
        type: "mainStat",
        icon: _jsx(FaRecycle, {}),
        value: 89500,
        label: "Kgs of Waste Diverted",
        align: "right",
        details: "Through daily segregation challenges and community clean-up drives, our Yoddhas have prevented tons of plastic and other waste from reaching landfills.",
    },
    {
        type: "factoid",
        icon: _jsx(FaLightbulb, {}),
        text: "Did you know? Recycling just one ton of plastic can save up to 2,000 gallons of gasoline.",
    },
    {
        type: "mainStat",
        icon: _jsx(FaWater, {}),
        value: 1250000,
        label: "Litres of Water Conserved",
        align: "left",
        details: "Simple challenges like fixing leaky taps and promoting rainwater harvesting have led to massive collective water savings.",
    },
    {
        type: "parallaxImage",
        imageUrl: "../src/assets/impact-image.jpg",
    },
    {
        type: "mainStat",
        icon: _jsx(FaHeart, {}),
        value: 50000,
        label: "Eco-Pledges Made",
        align: "right",
        details: "Students are making personal commitments to sustainable living, creating a ripple effect of positive change in their homes and communities.",
    },
    {
        type: "mainStat",
        icon: _jsx(FaTree, {}),
        value: 58420,
        label: "Real Trees Planted",
        align: "left",
        details: "For every major milestone achieved on the platform, our partners plant a real sapling, turning digital achievements into living, breathing forests.",
    },
];
// --- Sub-Components with Micro-interactions ---
const MainStatNode = ({ data }) => (_jsx(motion.div, { className: `flex w-full ${data.align === 'left' ? 'justify-start' : 'justify-end'}`, initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.5 }, children: _jsxs(motion.div, { className: `w-full md:w-7/12 p-8 rounded-2xl shadow-2xl border ${data.align === 'left' ? 'bg-white' : 'bg-emerald-600 text-white'}`, initial: { x: data.align === 'left' ? -100 : 100, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true, amount: 0.5 }, transition: { type: "spring", stiffness: 40, damping: 12, delay: 0.2 }, whileHover: { scale: 1.05, y: -10, rotate: data.align === 'left' ? -1 : 1, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }, children: [_jsx("div", { className: `text-5xl mb-4 ${data.align === 'left' ? 'text-emerald-500' : 'text-white'}`, children: data.icon }), _jsxs("h3", { className: `text-6xl font-extrabold mb-3 ${data.align === 'left' ? 'text-gray-800' : 'text-white'}`, children: [_jsx(Counter, { to: data.value }), "+"] }), _jsx("p", { className: `text-lg font-medium mb-4 ${data.align === 'left' ? 'text-gray-600' : 'text-emerald-100'}`, children: data.label }), _jsx("p", { className: `text-md ${data.align === 'left' ? 'text-gray-500' : 'text-emerald-200'}`, children: data.details })] }) }));
const TestimonialNode = ({ data }) => (_jsx(motion.div, { className: "w-full flex justify-center", initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, amount: 0.8 }, transition: { duration: 0.5, ease: "easeOut" }, whileHover: { scale: 1.03 }, children: _jsxs("div", { className: "group w-full md:w-1/2 text-center p-8 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl border border-white", children: [_jsx(FaQuoteLeft, { className: "text-4xl text-emerald-500/50 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" }), _jsxs("p", { className: "text-xl italic text-gray-700", children: ["\"", data.quote, "\""] }), _jsxs("p", { className: "font-semibold text-gray-600 mt-4", children: ["- ", data.author] })] }) }));
const FactoidNode = ({ data }) => (_jsx(motion.div, { className: "w-full flex justify-center", initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.8 }, children: _jsxs(motion.div, { className: "group flex items-center gap-4 p-6 bg-orange-100/50 border-2 border-orange-200 rounded-full shadow-lg", whileHover: { y: -8, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }, children: [_jsx("div", { className: "text-3xl text-orange-500 transition-transform duration-300 group-hover:rotate-12", children: data.icon }), _jsx("p", { className: "text-md font-semibold text-orange-800", children: data.text })] }) }));
const ParallaxNode = ({ data }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    return (_jsx(motion.div, { ref: ref, className: "group w-full h-96 overflow-hidden rounded-2xl shadow-2xl", whileHover: { scale: 0.98 }, children: _jsx(motion.div, { className: "w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110", style: { y, backgroundImage: `url(${data.imageUrl})` } }) }));
};
// --- Main Page Component ---
const InteractiveImpactPage = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
    const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
    // NEW: Transform for the tree's vertical position
    const treeY = useTransform(scrollYProgress, [0, 1], ["5%", "95%"]);
    return (_jsxs("section", { ref: targetRef, className: "relative py-20 bg-gradient-to-b from-teal-50 to-emerald-100 min-h-[700vh]", children: [_jsxs("section", { className: "relative py-20 text-center max-w-3xl mx-auto", children: [_jsx("h2", { className: "text-4xl font-bold text-emerald-700 mb-6", children: "Growing Change Together" }), _jsx("p", { className: "text-lg text-gray-600", children: "Every small step you take \u2014 saving energy, planting a tree, or reducing waste \u2014 contributes to a greener tomorrow. Watch how your actions add up as the tree of impact grows." })] }), _jsxs("div", { className: "sticky top-0 h-screen", children: [_jsxs("svg", { width: "10", height: "100%", viewBox: "0 0 10 1000", preserveAspectRatio: "xMidYMin slice", className: "absolute top-0 left-1/2 -translate-x-1/2 h-full z-10", children: [_jsx("path", { d: "M 5 0 V 1000", stroke: "#d1fae5", strokeWidth: "10" }), _jsx(motion.path, { d: "M 5 0 V 1000", stroke: "#10b981", strokeWidth: "10", strokeLinecap: "round", style: { pathLength } })] }), _jsx(motion.div, { className: "absolute left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-emerald-500 z-20", style: { top: treeY }, children: _jsx(motion.div, { animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, ease: 'easeInOut', repeat: Infinity }, children: _jsx(FaTree, { className: "text-3xl text-emerald-500" }) }) })] }), _jsxs("div", { className: "relative z-10 container mx-auto px-6 -mt-[100vh]", children: [_jsx("div", { className: "h-screen flex flex-col justify-center items-center text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut" }, children: [_jsx("h2", { className: "text-5xl md:text-7xl font-extrabold text-gray-800 mb-6", children: "From Pixels to Planet" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "See how thousands of small actions are growing into a forest of change. Scroll to begin the journey." })] }) }), _jsx("div", { className: "space-y-32 md:space-y-48 pb-20", children: impactData.map((item, index) => {
                            switch (item.type) {
                                case "mainStat": return _jsx(MainStatNode, { data: item }, index);
                                case "testimonial": return _jsx(TestimonialNode, { data: item }, index);
                                case "factoid": return _jsx(FactoidNode, { data: item }, index);
                                case "parallaxImage": return _jsx(ParallaxNode, { data: item }, index);
                                default: return null;
                            }
                        }) }), _jsx("div", { className: "h-screen flex flex-col justify-center items-center", children: _jsxs(motion.div, { className: "text-center", initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.5 }, transition: { duration: 1 }, children: [_jsx(motion.img, { src: "https://i.pravatar.cc/150?u=changemaker", alt: "Student Changemaker", className: "mx-auto w-40 h-40 rounded-full shadow-2xl border-4 border-white mb-6", whileHover: { scale: 1.1, rotate: 3 } }), _jsx("h3", { className: "text-4xl font-bold text-gray-800", children: "Changemaker Spotlight: Aisha from Jaipur" }), _jsx("p", { className: "text-lg text-gray-600 max-w-3xl mx-auto mt-4", children: "Using the 'Collaborative Projects' feature, 14-year-old Aisha organized a 'No Plastic' campaign in her school, which led to a 70% reduction in single-use plastic on campus." })] }) }), _jsx("div", { className: "h-screen flex flex-col justify-center items-center", children: _jsxs(motion.div, { className: "w-full text-center", initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.8 }, children: [_jsx(FaMapMarkedAlt, { className: "text-6xl text-emerald-500 mx-auto mb-6" }), _jsx("h2", { className: "text-5xl font-extrabold text-gray-800 mb-4", children: "Impact Across India" }), _jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto mb-10", children: "The wave of change is sweeping across the nation. Hover over a region to see a snapshot of their collective achievements." }), _jsxs("svg", { className: "w-full max-w-3xl mx-auto", viewBox: "0 0 500 500", children: [_jsx(motion.circle, { cx: "250", cy: "250", r: "150", className: "fill-emerald-200" }), _jsx(motion.circle, { cx: "250", cy: "250", r: "100", className: "fill-emerald-300 stroke-emerald-500", strokeWidth: "2", whileHover: { scale: 1.1, fill: "#34d399", strokeWidth: 4 }, transition: { type: "spring", stiffness: 300 }, children: _jsx("title", { children: "Central Region: 500+ Projects" }) }), _jsx(motion.circle, { cx: "150", cy: "150", r: "50", className: "fill-orange-300 stroke-orange-500", strokeWidth: "2", whileHover: { scale: 1.2, fill: "#fb923c", strokeWidth: 4 }, transition: { type: "spring", stiffness: 300 }, children: _jsx("title", { children: "Northern Region: 12,000+ Trees" }) })] })] }) }), _jsx("div", { className: "h-screen flex flex-col justify-center items-center text-center", children: _jsxs(motion.div, { className: "w-full", initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, amount: 0.5 }, transition: { duration: 0.8, ease: "easeOut" }, children: [_jsx("div", { className: "text-6xl text-emerald-500 mb-6", children: "\uD83C\uDF31" }), _jsx("h2", { className: "text-5xl md:text-6xl font-extrabold text-gray-800 mb-6", children: "And We're Just Getting Started." }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto mb-10", children: "The Tree of Impact grows every day. Your actions write the next chapter of our story. Are you ready to make a difference?" }), _jsxs(motion.a, { href: "#cta", className: "inline-flex items-center gap-3 bg-orange-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl", whileHover: { y: -5, scale: 1.05, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }, transition: { type: "spring", stiffness: 300 }, children: ["Join the Mission Now ", _jsx(FaArrowRight, {})] })] }) })] })] }));
};
export default InteractiveImpactPage;
//# sourceMappingURL=InteractiveImpactPage.js.map