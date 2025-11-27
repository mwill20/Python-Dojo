import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="relative w-full h-64 md:h-96 group">
      <div className="absolute inset-0 bg-cyber-green opacity-5 rounded-lg pointer-events-none group-focus-within:opacity-10 transition-opacity"></div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        spellCheck={false}
        className="w-full h-full bg-cyber-dark text-gray-100 p-4 rounded-lg border border-cyber-border focus:border-cyber-green focus:ring-1 focus:ring-cyber-green outline-none resize-none font-mono text-sm md:text-base leading-relaxed transition-all shadow-inner"
        placeholder="# Write your Python code here..."
      />
      <div className="absolute top-2 right-4 text-xs text-gray-500 pointer-events-none">
        Python 3.x
      </div>
    </div>
  );
};

export default CodeEditor;
