import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-white/50 rounded-full animate-spin" style={{ animationDelay: '0.15s' }}></div>
      </div>
    </div>
  );
};

export default Loader;
