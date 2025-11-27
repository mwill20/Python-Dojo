import React from 'react';
import { GradingStatus, FeedbackData } from '../types';

interface FeedbackAreaProps {
  feedback: FeedbackData;
}

const FeedbackArea: React.FC<FeedbackAreaProps> = ({ feedback }) => {
  if (feedback.status === GradingStatus.IDLE) return null;

  if (feedback.status === GradingStatus.GRADING) {
    return (
      <div className="mt-6 p-6 rounded-lg border border-cyber-border bg-cyber-dark animate-pulse flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-cyber-green border-t-transparent rounded-full animate-spin"></div>
        <span className="text-cyber-green tracking-widest uppercase text-sm">Initializing AI Evaluator...</span>
      </div>
    );
  }

  const isPass = feedback.status === GradingStatus.PASS;
  const isError = feedback.status === GradingStatus.ERROR;
  
  let borderColor = isPass ? 'border-cyber-green' : 'border-cyber-error';
  let textColor = isPass ? 'text-cyber-green' : 'text-cyber-error';
  let bgColor = isPass ? 'bg-[rgba(0,255,65,0.05)]' : 'bg-[rgba(255,0,51,0.05)]';
  
  if (isError) {
      borderColor = 'border-yellow-500';
      textColor = 'text-yellow-500';
      bgColor = 'bg-[rgba(234,179,8,0.05)]';
  }

  return (
    <div className={`mt-6 p-6 rounded-lg border-l-4 ${borderColor} ${bgColor} shadow-lg transition-all duration-300`}>
      <h3 className={`text-xl font-bold mb-2 ${textColor} flex items-center gap-2`}>
        {isPass ? '✓ SYSTEM PASS' : isError ? '⚠ SYSTEM ERROR' : '✕ SYSTEM FAIL'}
      </h3>
      <p className="text-gray-300 font-mono leading-relaxed">
        <span className="text-gray-500 select-none mr-2">{'>'}</span>
        {feedback.message}
      </p>
    </div>
  );
};

export default FeedbackArea;
