import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import {
  FaTree,
  FaWater,
  FaRecycle,
  FaSchool,
  FaHeart,
  FaQuoteLeft,
  FaLightbulb,
  FaMapMarkedAlt,
  FaArrowRight,
} from "react-icons/fa";
import { useRef, useEffect } from "react";

// --- Reusable Counter Component (No changes) ---
function Counter({ to }: any) {
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
  return <span ref={nodeRef}>0</span>;
}

// --- Data (No changes) ---
const impactData = [
  {
    type: "mainStat",
    icon: <FaSchool />,
    value: 1350,
    label: "Schools Have Joined the Mission",
    align: "left",
    details:
      "From bustling urban centers to remote villages, schools across the nation are empowering their students to become environmental warriors.",
  },
  {
    type: "testimonial",
    quote:
      "The Eco-Club missions have brought our school together. We're not just learning; we're actively making our campus greener!",
    author: "Mrs. Desai, Teacher, Pune",
  },
  {
    type: "mainStat",
    icon: <FaRecycle />,
    value: 89500,
    label: "Kgs of Waste Diverted",
    align: "right",
    details:
      "Through daily segregation challenges and community clean-up drives, our Yoddhas have prevented tons of plastic and other waste from reaching landfills.",
  },
  {
    type: "factoid",
    icon: <FaLightbulb />,
    text: "Did you know? Recycling just one ton of plastic can save up to 2,000 gallons of gasoline.",
  },
  {
    type: "mainStat",
    icon: <FaWater />,
    value: 1250000,
    label: "Litres of Water Conserved",
    align: "left",
    details:
      "Simple challenges like fixing leaky taps and promoting rainwater harvesting have led to massive collective water savings.",
  },
  {
    type: "parallaxImage",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906-823872545934?q=80&w=2070",
  },
  {
    type: "mainStat",
    icon: <FaHeart />,
    value: 50000,
    label: "Eco-Pledges Made",
    align: "right",
    details:
      "Students are making personal commitments to sustainable living, creating a ripple effect of positive change in their homes and communities.",
  },
  {
    type: "mainStat",
    icon: <FaTree />,
    value: 58420,
    label: "Real Trees Planted",
    align: "left",
    details:
      "For every major milestone achieved on the platform, our partners plant a real sapling, turning digital achievements into living, breathing forests.",
  },
];

// --- Sub-Components with Micro-interactions ---
const MainStatNode = ({ data }: any) => (
  <motion.div
    className={`flex w-full ${
      data.align === "left" ? "justify-start" : "justify-end"
    }`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <motion.div
      className={`w-full md:w-7/12 p-8 rounded-2xl shadow-2xl border ${
        data.align === "left" ? "bg-white" : "bg-emerald-600 text-white"
      }`}
      initial={{ x: data.align === "left" ? -100 : 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 40, damping: 12, delay: 0.2 }}
      whileHover={{
        scale: 1.05,
        y: -10,
        rotate: data.align === "left" ? -1 : 1,
        boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div
        className={`text-5xl mb-4 ${
          data.align === "left" ? "text-emerald-500" : "text-white"
        }`}
      >
        {data.icon}
      </div>
      <h3
        className={`text-6xl font-extrabold mb-3 ${
          data.align === "left" ? "text-gray-800" : "text-white"
        }`}
      >
        <Counter to={data.value} />+
      </h3>
      <p
        className={`text-lg font-medium mb-4 ${
          data.align === "left" ? "text-gray-600" : "text-emerald-100"
        }`}
      >
        {data.label}
      </p>
      <p
        className={`text-md ${
          data.align === "left" ? "text-gray-500" : "text-emerald-200"
        }`}
      >
        {data.details}
      </p>
    </motion.div>
  </motion.div>
);

const TestimonialNode = ({ data }: any) => (
  <motion.div
    className="w-full flex justify-center"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ scale: 1.03 }}
  >
    <div className="group w-full md:w-1/2 text-center p-8 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl border border-white">
      <FaQuoteLeft className="text-4xl text-emerald-500/50 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
      <p className="text-xl italic text-gray-700">"{data.quote}"</p>
      <p className="font-semibold text-gray-600 mt-4">- {data.author}</p>
    </div>
  </motion.div>
);

const FactoidNode = ({ data }: any) => (
  <motion.div
    className="w-full flex justify-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.8 }}
  >
    <motion.div
      className="group flex items-center gap-4 p-6 bg-orange-100/50 border-2 border-orange-200 rounded-full shadow-lg"
      whileHover={{ y: -8, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
    >
      <div className="text-3xl text-orange-500 transition-transform duration-300 group-hover:rotate-12">
        {data.icon}
      </div>
      <p className="text-md font-semibold text-orange-800">{data.text}</p>
    </motion.div>
  </motion.div>
);

const ParallaxNode = ({ data }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    // FIX: Added 'group' class here
    <motion.div
      ref={ref}
      className="group w-full h-96 overflow-hidden rounded-2xl shadow-2xl"
      whileHover={{ scale: 0.98 }}
    >
      <motion.div
        className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ y, backgroundImage: `url(${data.imageUrl})` }}
      />
    </motion.div>
  );
};

// --- Main Page Component ---
const InteractiveImpactPage: React.FC = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const seedOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  return (
    <section
      ref={targetRef}
      className="relative py-20 bg-gradient-to-b from-teal-50 to-emerald-100 min-h-[700vh]"
    >
      {/* The sticky container for the tree and seed */}
      {/* Sticky tree + line */}
      <div className="sticky top-0 h-screen flex justify-center items-start">
        {/* 🌿 Line SVG (behind) */}
        <svg
          width="10"
          height="100%"
          viewBox="0 0 10 1000"
          preserveAspectRatio="xMidYMin slice"
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full z-10"
        >
          {/* Background line */}
          <path d="M 5 0 V 1000" stroke="#d1fae5" strokeWidth="10" />

          {/* Animated green line, stopping before tree */}
          <motion.path
            d="M 5 0 V 480"
            stroke="#10b981"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {/* 🌱 Tree Icon (on top of line) */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center z-20"
          style={{ opacity: seedOpacity }}
        >
          <motion.div
            className="group relative w-24 h-24 bg-emerald-300/50 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-50 group-hover:opacity-100"></div>
            <div className="relative w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center">
              <FaTree className="text-3xl text-emerald-500" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Content that scrolls over the sticky elements */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="h-screen flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-6">
              From Pixels to Planet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scroll down to see our story of impact unfold.
            </p>
          </motion.div>
        </div>

        <div className="space-y-32 md:space-y-48 pb-20">
          {impactData.map((item, index) => {
            switch (item.type) {
              case "mainStat":
                return <MainStatNode key={index} data={item} />;
              case "testimonial":
                return <TestimonialNode key={index} data={item} />;
              case "factoid":
                return <FactoidNode key={index} data={item} />;
              case "parallaxImage":
                return <ParallaxNode key={index} data={item} />;
              default:
                return null;
            }
          })}
        </div>

        <div className="h-screen flex flex-col justify-center items-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              src="https://i.pravatar.cc/150?u=changemaker"
              alt="Student Changemaker"
              className="mx-auto w-40 h-40 rounded-full shadow-2xl border-4 border-white mb-6"
              whileHover={{ scale: 1.1, rotate: 3 }}
            />
            <h3 className="text-4xl font-bold text-gray-800">
              Changemaker Spotlight: Aisha from Jaipur
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              Using the 'Collaborative Projects' feature, 14-year-old Aisha
              organized a 'No Plastic' campaign in her school, which led to a
              70% reduction in single-use plastic on campus. Her story is one of
              thousands showing how digital action inspires real-world
              leadership.
            </p>
          </motion.div>
        </div>

        <div className="h-screen flex flex-col justify-center items-center">
          <motion.div
            className="w-full text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <FaMapMarkedAlt className="text-6xl text-emerald-500 mx-auto mb-6" />
            <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
              Impact Across India
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              The wave of change is sweeping across the nation. Hover over a
              region to see a snapshot of their collective achievements.
            </p>
            <svg className="w-full max-w-3xl mx-auto" viewBox="0 0 500 500">
              <motion.circle
                cx="250"
                cy="250"
                r="150"
                className="fill-emerald-200"
              />
              <motion.circle
                cx="250"
                cy="250"
                r="100"
                className="fill-emerald-300 stroke-emerald-500"
                strokeWidth="2"
                whileHover={{ scale: 1.1, fill: "#34d399", strokeWidth: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <title>Central Region: 500+ Projects</title>
              </motion.circle>
              <motion.circle
                cx="150"
                cy="150"
                r="50"
                className="fill-orange-300 stroke-orange-500"
                strokeWidth="2"
                whileHover={{ scale: 1.2, fill: "#fb923c", strokeWidth: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <title>Northern Region: 12,000+ Trees</title>
              </motion.circle>
            </svg>
          </motion.div>
        </div>

        {/* --- FIX: NEW Final Section for Graceful Exit --- */}
        <div className="h-screen flex flex-col justify-center items-center text-center">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-6xl text-emerald-500 mb-6">🌱</div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
              And We're Just Getting Started.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              The Tree of Impact grows every day. Your actions write the next
              chapter of our story. Are you ready to make a difference?
            </p>
            <motion.a
              href="#cta" // Link to your final CTA section or sign-up page
              className="inline-flex items-center gap-3 bg-orange-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl"
              whileHover={{
                y: -5,
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Join the Mission Now <FaArrowRight />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveImpactPage;
