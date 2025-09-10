import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileUpload, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

type VerificationStatus = 'idle' | 'uploading' | 'verifying' | 'success' | 'error';

const VerificationModal: React.FC<{ missionTitle: string, onClose: () => void }> = ({ missionTitle, onClose }) => {
    const [status, setStatus] = useState<VerificationStatus>('idle');

    const handleUpload = () => {
        setStatus('uploading');
        setTimeout(() => setStatus('verifying'), 1500); // Simulate upload
        setTimeout(() => setStatus('success'), 4000); // Simulate verification
    };

    const statusContent = {
        idle: { icon: <FaFileUpload />, title: "Upload Your Proof", text: "Submit a photo or video to complete the mission.", button: "Select File & Verify" },
        uploading: { icon: <FaSpinner className="animate-spin" />, title: "Uploading...", text: "Your file is being securely uploaded.", button: "Uploading..." },
        verifying: { icon: <FaSpinner className="animate-spin" />, title: "AI Verification in Progress", text: "Our smart model is analyzing your submission for authenticity.", button: "Verifying..." },
        success: { icon: <FaCheckCircle className="text-green-500" />, title: "Mission Complete!", text: "Great job, Yoddha! Your proof has been verified. +50 PP have been added.", button: "Awesome!" },
        error: { icon: <FaTimesCircle className="text-red-500" />, title: "Verification Failed", text: "We couldn't verify this submission. Please ensure the photo is clear and relevant.", button: "Try Again" },
    };

    return (
        <motion.div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
            <motion.div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg text-center p-8"
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            >
                <p className="font-semibold text-gray-500">{missionTitle}</p>
                <div className="text-7xl my-6 mx-auto w-fit">{statusContent[status].icon}</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{statusContent[status].title}</h2>
                <p className="text-gray-600 mb-8">{statusContent[status].text}</p>
                <motion.button
                    onClick={status === 'success' ? onClose : (status === 'error' ? () => setStatus('idle') : handleUpload)}
                    disabled={status === 'uploading' || status === 'verifying'}
                    className={`w-full py-3 rounded-lg font-bold text-white shadow-lg disabled:opacity-50 ${status === 'success' ? 'bg-green-500' : (status === 'error' ? 'bg-red-500' : 'bg-emerald-600')}`}
                    whileHover={{ y: status === 'idle' || status === 'success' || status === 'error' ? -3 : 0 }}
                >
                    {statusContent[status].button}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};
export default VerificationModal;