import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import FeedbackArea from './components/FeedbackArea';
import ChatInterface from './components/ChatInterface';
import EducationalCard from './components/EducationalCard';
import { CHALLENGES } from './constants';
import { Challenge, GradingStatus, FeedbackData, DifficultyLevel, ChatMessage, AppPhase } from './types';
import { evaluateCode, getChatResponse, evaluateRetroCode } from './services/geminiService';

const App: React.FC = () => {
  // --- State ---
  // Core Progress
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [streak, setStreak] = useState<number>(0);
  
  // Lesson State
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(CHALLENGES[0]);
  const [phase, setPhase] = useState<AppPhase>('LEARN');
  
  // Inputs
  const [userCode, setUserCode] = useState<string>("");
  const [retroCode, setRetroCode] = useState<string>(""); // For the memory check
  
  // Feedback
  const [feedback, setFeedback] = useState<FeedbackData>({ status: GradingStatus.IDLE, message: '' });
  const [retroFeedback, setRetroFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // --- Persistence & Initialization ---
  useEffect(() => {
    const savedStreak = localStorage.getItem('pg_streak');
    const savedCompleted = localStorage.getItem('pg_completed');
    
    if (savedStreak) setStreak(parseInt(savedStreak, 10));
    
    let loadedCompleted: number[] = [];
    if (savedCompleted) {
        loadedCompleted = JSON.parse(savedCompleted);
        setCompletedIds(loadedCompleted);
    }
    
    // Determine start lesson
    const nextId = loadedCompleted.length > 0 
        ? Math.max(...loadedCompleted) + 1 
        : 0;
    
    const startChallenge = CHALLENGES.find(c => c.id === nextId) || CHALLENGES[CHALLENGES.length - 1];
    
    setCurrentChallenge(startChallenge);
    setUserCode(startChallenge.stub);

    // Initial Phase Logic
    if (startChallenge.id > 0 && startChallenge.prevChallengeId !== undefined) {
        setPhase('RETRO');
    } else {
        setPhase('LEARN');
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('pg_streak', streak.toString());
      localStorage.setItem('pg_completed', JSON.stringify(completedIds));
    }
  }, [streak, completedIds, isLoading]);


  // --- Logic Handlers ---

  const handleRetroSubmit = async () => {
    if (!retroCode.trim() || !currentChallenge.prevConceptTitle) return;
    
    setRetroFeedback("Analyzing memory engram...");
    
    const passed = await evaluateRetroCode(currentChallenge.prevConceptTitle, retroCode);
    
    if (passed) {
        setRetroFeedback("");
        setPhase('LEARN');
        setRetroCode(""); // Clear for next time
    } else {
        setRetroFeedback("Memory Corrupted. Try again. Focus on the core syntax.");
    }
  };

  const handleStartDrill = () => {
    setPhase('DRILL');
  };

  const handleCheckCode = async () => {
    if (!userCode.trim()) return;

    setFeedback({ status: GradingStatus.GRADING, message: '' });

    try {
      const resultText = await evaluateCode(currentChallenge.description, userCode);
      
      let status = GradingStatus.FAIL;
      let cleanMessage = resultText;

      if (resultText.startsWith("PASS:")) {
        status = GradingStatus.PASS;
        cleanMessage = resultText.replace("PASS:", "").trim();
        
        // Update Stats on Pass
        if (!completedIds.includes(currentChallenge.id)) {
          setCompletedIds(prev => [...prev, currentChallenge.id]);
          setStreak(prev => prev + 1);
        }
      } else if (resultText.startsWith("FAIL:")) {
        status = GradingStatus.FAIL;
        cleanMessage = resultText.replace("FAIL:", "").trim();
        setStreak(0); 
      } else {
        // Fallback parsing
        status = resultText.toLowerCase().includes("pass") ? GradingStatus.PASS : GradingStatus.FAIL;
        if (status === GradingStatus.PASS && !completedIds.includes(currentChallenge.id)) {
           setCompletedIds(prev => [...prev, currentChallenge.id]);
           setStreak(prev => prev + 1);
        }
      }

      setFeedback({ status, message: cleanMessage });
    } catch (error) {
        setFeedback({ 
            status: GradingStatus.ERROR, 
            message: `System Error: ${(error as Error).message}` 
        });
    }
  };

  const handleNextLevel = () => {
      // Move to next challenge
      const nextId = currentChallenge.id + 1;
      const nextChallenge = CHALLENGES.find(c => c.id === nextId);

      if (nextChallenge) {
          setCurrentChallenge(nextChallenge);
          setUserCode(nextChallenge.stub);
          setFeedback({ status: GradingStatus.IDLE, message: '' });
          setChatMessages([]);
          // Start the loop again
          setPhase('RETRO'); 
      }
  };

  const handleSendMessage = async (text: string) => {
    const newMessage: ChatMessage = { role: 'user', text, timestamp: Date.now() };
    setChatMessages(prev => [...prev, newMessage]);
    setIsChatLoading(true);

    try {
      const responseText = await getChatResponse(
        chatMessages, 
        text, 
        { 
          title: currentChallenge.title,
          description: currentChallenge.description,
          code: userCode
        }
      );

      const aiMessage: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', text: "Uplink failed.", timestamp: Date.now() };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-cyber-bg flex items-center justify-center text-cyber-green font-mono">Loading Security Protocols...</div>;

  return (
    <div className="min-h-screen bg-cyber-bg text-gray-300 p-4 md:p-8 font-mono selection:bg-cyber-green selection:text-cyber-dark">
      <div className="max-w-7xl mx-auto">
        <Header streak={streak} />

        <main className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Academy Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* RETRO PHASE: Memory Check */}
            {phase === 'RETRO' && (
                <div className="bg-cyber-dark border border-yellow-500/50 p-8 rounded-lg shadow-lg animate-fadeIn relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <span className="text-yellow-500">↺</span> RECALL PROTOCOL
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Before accessing <strong>{currentChallenge.title}</strong>, you must demonstrate retention of the previous concept:
                        <br/>
                        <span className="text-cyber-green font-bold text-lg mt-2 block">
                            {currentChallenge.prevConceptTitle}
                        </span>
                    </p>
                    
                    <textarea 
                        value={retroCode}
                        onChange={(e) => setRetroCode(e.target.value)}
                        placeholder="# Write the previous code snippet from memory..."
                        className="w-full h-32 bg-black border border-gray-700 text-gray-200 p-4 rounded mb-4 font-mono focus:border-yellow-500 focus:outline-none"
                    />
                    
                    {retroFeedback && (
                        <div className="text-yellow-500 mb-4 text-sm font-bold animate-pulse">
                            {retroFeedback}
                        </div>
                    )}

                    <button 
                        onClick={handleRetroSubmit}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded transition-colors"
                    >
                        VERIFY MEMORY
                    </button>
                </div>
            )}

            {/* LEARN PHASE: Deep Learning Card */}
            {phase === 'LEARN' && (
                <EducationalCard 
                    conceptTitle={currentChallenge.conceptTitle}
                    conceptExplanation={currentChallenge.conceptExplanation}
                    securityContext={currentChallenge.securityContext}
                    codeBreakdown={currentChallenge.codeBreakdown}
                    onStartDrill={handleStartDrill}
                />
            )}

            {/* DRILL PHASE: The Editor */}
            {phase === 'DRILL' && (
                <div className="animate-fadeIn">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                            ACTIVE DRILL: {currentChallenge.title}
                        </h2>
                        <span className="text-xs text-gray-500 uppercase tracking-widest border border-gray-700 px-2 py-1 rounded">
                            Attempting Mastery
                        </span>
                    </div>

                    <div className="bg-cyber-dark border border-cyber-border p-4 rounded-t-lg border-b-0">
                        <p className="text-gray-300">{currentChallenge.description}</p>
                    </div>
                    
                    <CodeEditor 
                        value={userCode} 
                        onChange={setUserCode} 
                        disabled={feedback.status === GradingStatus.GRADING} 
                    />

                    <div className="flex justify-between items-center mt-4">
                        <FeedbackArea feedback={feedback} />
                        
                        <div className="flex gap-4">
                            {feedback.status === GradingStatus.PASS && (
                                <button
                                    onClick={handleNextLevel}
                                    className="bg-white text-black font-bold px-8 py-3 rounded hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                >
                                    NEXT LEVEL ➜
                                </button>
                            )}
                            
                            {feedback.status !== GradingStatus.PASS && (
                                <button
                                    onClick={handleCheckCode}
                                    disabled={feedback.status === GradingStatus.GRADING}
                                    className="bg-cyber-green text-black font-bold px-8 py-3 rounded hover:bg-white transition-colors disabled:opacity-50"
                                >
                                    {feedback.status === GradingStatus.GRADING ? 'EVALUATING...' : 'EXECUTE'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

          </div>

          {/* RIGHT COLUMN: Chat Tutor */}
          <div className="lg:col-span-1">
             <ChatInterface 
                messages={chatMessages} 
                onSendMessage={handleSendMessage} 
                isLoading={isChatLoading} 
             />
          </div>

        </main>
        
        <footer className="mt-16 text-center text-gray-600 text-xs border-t border-cyber-border pt-8">
            <p>AI AGENT SECURITY ACADEMY • DEEP LEARNING PROTOCOL v2.0</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
