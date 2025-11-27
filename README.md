<div align="center">
<<<<<<< HEAD
<img width="1200" height="475" alt="Python Gym Banner" src="./Python Dojo Image.png" />
</div>

# 🐍 Python Gym

**A cyberpunk-themed Python practice arena focused on AI Agents, Cybersecurity, and AI Safety (Red/Blue Team)**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Google AI](https://img.shields.io/badge/Google%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

## 🎯 About

Python Gym is an interactive learning platform that teaches Python programming through the lens of AI Agent security and cybersecurity best practices. Built in part with **Google Antigravity**, this cyberpunk-themed academy combines cutting-edge AI tutoring with hands-on security training.

Each lesson combines three core elements:

1. **🧠 Python Fundamentals** - Core programming concepts
2. **🛡️ Security Context** - Real-world cybersecurity applications  
3. **🤖 AI Agent Safety** - Preventing vulnerabilities in AI systems

## 🔥 Features

### Learning Experience
- **Multi-phase Learning**: RETRO → LEARN → DRILL progression
- **Memory Retention**: Spaced repetition system with recall challenges
- **Progressive Difficulty**: 10 levels from basic strings to advanced async patterns
- **Streak Tracking**: Gamified progress system

### AI-Powered Tutoring
- **Live Code Evaluation**: AI-powered grading with detailed feedback
- **Interactive Chat Tutor**: Context-aware assistance powered by Gemini 2.5 Flash
- **Security-focused Curriculum**: Learn through real attack/defense scenarios

### Cyberpunk Interface
- **Dark Theme**: Cyberpunk aesthetic with neon green accents
- **Responsive Design**: Works on desktop and mobile
- **Real-time Feedback**: Instant code evaluation and suggestions

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **AI Integration**: Google Generative AI (Gemini 2.5 Flash)
- **Code Evaluation**: Real-time Python syntax and logic checking
- **State Management**: React hooks with localStorage persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd python-dojo
   ```
   
   ```powershell
   git clone <repository-url>
   cd python-dojo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   ```powershell
   npm install
   ```

3. **Configure environment**
   ```bash
   # Create .env.local file
   echo "API_KEY=your_gemini_api_key_here" > .env.local
   ```
   
   ```powershell
   # Create .env.local file
   "API_KEY=your_gemini_api_key_here" | Out-File -FilePath .env.local -Encoding UTF8
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   ```powershell
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:8080
   ```

## 📚 Curriculum Overview

The curriculum is structured in 3 phases across 10 progressive levels:

### Phase 1: Python Foundations for Security
- **Level 0**: Input Sanitization (String replacement)
- **Level 1**: Environment Secrets (Environment variables)
- **Level 2**: Logic Guardrails (Conditional statements)

### Phase 2: Agent Mechanics  
- **Level 3**: Tool Allowlisting (Lists & membership)
- **Level 4**: Role Configuration (Dictionaries)
- **Level 5**: Secure Execution Wrappers (Functions)

### Phase 3: Advanced Defense
- **Level 6**: Structured Output (JSON parsing)
- **Level 7**: API Rate Limiting (Time delays)
- **Level 8**: MCP Server Connection (Async/await)
- **Level 9**: Red Team Assertion (Testing & validation)

Each level teaches a Python concept while addressing real security vulnerabilities like:
- 🚫 Prompt injection attacks
- 🔐 Credential exposure prevention  
- 🛡️ AI jailbreak protection
- ⚡ DoS attack mitigation
- 🔍 Code injection prevention

## 🏗️ Project Structure

```
python-dojo/
├── components/           # React components
│   ├── ChatInterface.tsx    # AI tutor chat system
│   ├── CodeEditor.tsx       # Code input area
│   ├── EducationalCard.tsx  # Learning content display
│   ├── FeedbackArea.tsx     # Code evaluation results
│   └── Header.tsx           # App header with streak counter
├── services/
│   └── geminiService.ts     # AI integration & evaluation
├── App.tsx              # Main application logic
├── constants.ts         # Challenge definitions
├── types.ts            # TypeScript type definitions
└── vite.config.ts      # Build configuration
```

## 🎮 How to Use

1. **Start Learning**: Begin with Level 0 and progress sequentially
2. **Three-Phase System**: 
   - **RETRO**: Recall previous concepts from memory
   - **LEARN**: Study new concepts with security context
   - **DRILL**: Practice coding with AI evaluation
3. **Get Help**: Use the AI tutor chat for hints and explanations
4. **Track Progress**: Build your streak by completing challenges

## 🔧 Scripts

**Bash/Terminal:**
```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run preview  # Preview production build
npm start        # Start production server
```

**PowerShell:**
```powershell
npm run dev      # Start development server
npm run build    # Build for production  
npm run preview  # Preview production build
npm start        # Start production server
```

## 🤝 Contributing

This project teaches essential skills for building secure AI systems. Contributions are welcome for:

- Additional security-focused challenges
- UI/UX improvements
- Performance optimizations
- Documentation enhancements

## 📄 License

This project is open source. Please provide attribution when using or modifying.

## 🙏 Credits

- **Google AntiGravity** for assistance with this v1 implementation
- **Google AI** for Gemini 2.5 Flash integration
- **Tailwind CSS** for styling framework
- **React + Vite** for development experience

---

**Ready to level up your AI Security Python skills? Start your training in the Python Dojo! 🥋**
=======
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/15A4M78EzMf5Y0rbh0p07MIBHWu-qbTfT

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
>>>>>>> 7c3b2e1e315ba0bd466f3f6706fe7d600d68b2fa
