import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const FinalCTA: React.FC = () => {
       const [expanded, setExpanded] = useState(0);
    const faqData = [
  { 
    question: "How can my school register for Prakriti Ke Yoddha?", 
    answer: "Schools can register through our dedicated portal. An authorized representative from the school administration needs to fill out the form. We will then verify the details and provide login credentials for the school's dashboard." 
  },
  { 
    question: "Is the platform free to use for government schools?", 
    answer: "Yes, the Prakriti Ke Yoddha platform is completely free for all recognized government and government-aided schools across India as part of this national initiative." 
  },
  { 
    question: "How is our data protected?", 
    answer: "We adhere to the highest standards of data security and privacy in line with government regulations. All user data is encrypted and stored securely. We do not share personal information with third parties." 
  },
  { 
    question: "Can parents get involved?", 
    answer: "Absolutely! We have a dedicated 'Parental Involvement' feature where parents can view their child's achievements, get reports, and even participate in special family-oriented eco-challenges." 
  },
  { 
    question: "What age groups can participate?", 
    answer: "Students from primary to higher secondary levels can actively participate. The activities and challenges are tailored to be age-appropriate." 
  },
  { 
    question: "Do teachers get support or training?", 
    answer: "Yes, teachers receive digital toolkits, activity guides, and periodic training sessions to help them integrate eco-learning into everyday teaching." 
  },
  { 
    question: "Are there rewards or recognition for students?", 
    answer: "Students earn digital badges, certificates, and leaderboard rankings for completing activities and challenges. Top performers may also get recognition at district or national levels." 
  }
];

    
    // --- Accordion Item Sub-Component ---
    const AccordionItem = ({ item, index, expanded, setExpanded } : any) => {
        const isOpen = index === expanded;
        return (
            <motion.div className="border-b border-gray-200">
                <motion.header
                    className="flex justify-between items-center p-5 cursor-pointer"
                    onClick={() => setExpanded(isOpen ? false : index)}
                    whileHover={{ backgroundColor: '#F9FAFB' }}
                >
                    <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                        <FaChevronDown className="text-gray-500" />
                    </motion.div>
                </motion.header>
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.section
                            key="content"
                            initial="collapsed" animate="open" exit="collapsed"
                            variants={{ open: { opacity: 1, height: 'auto' }, collapsed: { opacity: 0, height: 0 } }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                        >
                            <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.answer}</p>
                        </motion.section>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };
  return (
    <>
    <section 
        id="cta"
        className="relative py-24 bg-cover cta-image bg-center text-white"
        // Use the same background as your hero section for consistency
       
    >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <motion.div
            className="relative z-10 container mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                Are You Ready to Become a Warrior for Nature?
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 drop-shadow-md">
                Join thousands of students across India who are making a real difference. Your mission starts now.
            </p>
            <motion.button
                whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 0 25px rgba(251, 191, 36, 0.8)',
                    y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl transition-all"
            >
                Start Your Mission Now
            </motion.button>
        </motion.div>
    </section>
            <div className="max-w-4xl mx-auto pb-20 mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            {faqData.map((item, index) => (
                                <AccordionItem key={index} item={item} index={index} expanded={expanded} setExpanded={setExpanded} />
                            ))}
                        </div>
                    </motion.div>
                </div>
    </>
  );
};

export default FinalCTA;
