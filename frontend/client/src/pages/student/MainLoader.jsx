import React from 'react';

const MainLoader = ({ className }) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-slate-50 ${className || ''}`}>
      <div className="flex flex-col items-center animate-pulse">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-6 font-serif">
          Attentify
        </h1>
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="mt-4 text-slate-500 text-sm font-medium tracking-wide uppercase">Starting environment...</p>
      </div>
    </div>
  );
}

export default MainLoader;
