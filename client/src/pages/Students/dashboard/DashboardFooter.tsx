import React from 'react';

const DashboardFooter: React.FC = () => {
  return (
    <footer className="py-6 text-center">
      <div className="container mx-auto px-6">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Prakriti Ke Yoddha. An Initiative by the Government of India.
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;