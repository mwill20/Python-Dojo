import React from 'react';

interface EducationalCardProps {
  conceptTitle: string;
  conceptExplanation: string;
  securityContext: string;
  codeBreakdown: string;
  onStartDrill: () => void;
}

const EducationalCard: React.FC<EducationalCardProps> = ({ 
  conceptTitle, 
  conceptExplanation, 
  securityContext, 
  codeBreakdown, 
  onStartDrill 
}) => {
  return (
    <div className="bg-cyber-dark border border-cyber-green/50 rounded-lg p-6 shadow-[0_0_20px_rgba(0,255,65,0.1)] mb-6 animate-fadeIn">
      <div className="flex items-center gap-2 mb-6 border-b border-cyber-border pb-4">
        <span className="text-2xl">🧠</span>
        <h2 className="text-xl font-bold text-white tracking-widest uppercase">
          Neural Upload: <span className="text-cyber-green">{conceptTitle}</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Section A: Concept */}
        <div className="bg-gray-900/50 p-4 rounded border border-cyber-border">
          <h3 className="text-cyber-green text-sm font-bold uppercase mb-2">1. Python Concept</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            {conceptExplanation}
          </p>
        </div>

        {/* Section B: Why (Security) */}
        <div className="bg-[rgba(255,0,51,0.05)] p-4 rounded border border-cyber-error/30">
          <h3 className="text-cyber-error text-sm font-bold uppercase mb-2">2. Security Protocol (The Why)</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            {securityContext}
          </p>
        </div>
      </div>

      {/* Section C: Code Breakdown */}
      <div className="bg-black p-5 rounded border border-gray-700 font-mono text-sm mb-8">
        <h3 className="text-blue-400 text-xs font-bold uppercase mb-2">3. Syntax Analysis</h3>
        <p className="text-gray-300">
           <span className="text-cyber-green">{'>'}</span> {codeBreakdown}
        </p>
      </div>

      <button
        onClick={onStartDrill}
        className="w-full bg-cyber-green text-black font-bold py-4 rounded text-lg uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,65,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
      >
        Initialize Drill Sequence ➜
      </button>
    </div>
  );
};

export default EducationalCard;
