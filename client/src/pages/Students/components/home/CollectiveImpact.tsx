import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, animate } from 'framer-motion';
import { FaTree, FaWater, FaRecycle, FaSchool } from 'react-icons/fa';

// Reusable Counter component
function Counter({ from, to }) {
  const nodeRef = useRef();
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          node.textContent = Math.round(value).toLocaleString('en-IN');
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to]);

  return <span ref={nodeRef} />;
}

const stats = [
    { icon: <FaTree size={40} className="text-green-500" />, value: 58420, label: "Trees Planted" },
    { icon: <FaWater size={40} className="text-blue-500" />, value: 1250000, label: "Litres of Water Saved" },
    { icon: <FaRecycle size={40} className="text-emerald-500" />, value: 89500, label: "Kgs of Waste Recycled" },
    { icon: <FaSchool size={40} className="text-orange-500" />, value: 1350, label: "Schools Participating" },
];

const CollectiveImpact: React.FC = () => {
  return (
    <section id="impact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Every Action Matters. See Our Collective Impact.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Small steps taken by thousands of Yoddhas lead to monumental change. Here's what we have achieved together.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    className="bg-gray-50/70 p-8 rounded-2xl text-center shadow-lg border border-gray-100"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                >
                    <div className="flex justify-center mb-4">{stat.icon}</div>
                    <h3 className="text-5xl font-bold text-emerald-600 mb-2">
                        <Counter from={0} to={stat.value} />+
                    </h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CollectiveImpact;