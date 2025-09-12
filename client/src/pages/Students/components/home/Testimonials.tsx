import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
    { name: "Priya S.", school: "KV, Delhi", quote: "I never knew learning about the environment could be this fun! My whole class competes to get on the leaderboard every week.", avatar: "https://i.pravatar.cc/80?u=priya" },
    { name: "Mr. Sharma", school: "Teacher, DPS Mumbai", quote: "Prakriti Ke Yoddha is a revolutionary tool for education. It aligns perfectly with the NEP and makes my students genuinely excited about sustainability.", avatar: "https://i.pravatar.cc/80?u=sharma" },
    { name: "Rohan K.", school: "Std. 8, Bangalore", quote: "My favorite part is customizing my Yoddha. Earning badges for real-world tasks like planting a sapling feels amazing!", avatar: "https://i.pravatar.cc/80?u=rohan" },
    { name: "Anjali M.", school: "Std. 7, Kolkata", quote: "Our school's Eco-Club uses the platform to organize clean-up drives. It's awesome to see our collective points grow and make a real difference.", avatar: "https://i.pravatar.cc/80?u=anjali" },
];

// We duplicate the testimonials to create the seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

const Testimonials: React.FC = () => {

  const marqueeVariants :Variants = {
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

  return (
    <section id="testimonials" className="py-20 bg-emerald-50/50">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Voices of Our <span className="text-emerald-600">Prakriti Yoddhas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what students and teachers across India are saying about their adventure.
          </p>
        </motion.div>
        
        {/* The marquee container with a hover-pause group */}
        <div className="group w-full overflow-hidden">
          <motion.div 
            className="flex gap-8 py-4"
            variants={marqueeVariants}
            animate="animate"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
                <div
                    key={index}
                    // The [.group:hover_&]:pause is a Tailwind trick to pause the animation on hover
                    className="relative flex-shrink-0 w-[90vw] md:w-[450px] bg-white p-8 rounded-2xl shadow-xl border border-gray-100 group-hover:[animation-play-state:paused]"
                    style={{ animation: 'marquee 40s linear infinite' }}
                >
                    <FaQuoteLeft className="absolute top-6 left-6 text-5xl text-gray-100 -z-0" />
                    <p className="relative z-10 text-lg text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4 border-2 border-emerald-500" />
                        <div>
                            <h4 className="font-bold text-lg text-gray-800">{testimonial.name}</h4>
                            <p className="text-gray-500">{testimonial.school}</p>
                        </div>
                    </div>
                </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;