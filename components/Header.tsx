import React from 'react';

interface HeaderProps {
  streak: number;
}

const Header: React.FC<HeaderProps> = ({ streak }) => {
  return (
    <header className="flex justify-between items-center py-6 mb-8 border-b border-cyber-border">
      <div className="flex items-center gap-3">
        <span className="text-4xl filter drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]">🐍</span>
        <h1 className="text-3xl font-bold text-white tracking-wider neon-text-shadow">
          PYTHON <span className="text-cyber-green">GYM</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-2 bg-cyber-dark border border-cyber-green px-4 py-2 rounded shadow-[0_0_10px_rgba(0,255,65,0.15)]">
        <span className="text-cyber-green text-xl">🔥</span>
        <div className="flex flex-col items-end leading-none">
          <span className="text-2xl font-bold text-white">{streak}</span>
          <span className="text-xs text-cyber-green uppercase tracking-widest">Streak</span>
        </div>
      </div>
    </header>
  );
};

export default Header;