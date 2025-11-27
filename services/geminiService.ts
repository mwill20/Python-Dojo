import { GoogleGenAI, Content } from "@google/genai";
import { ChatMessage } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }
  return new GoogleGenAI({ apiKey });
};

export const evaluateCode = async (description: string, userCode: string): Promise<string> => {
  const ai = getClient();
  
  const prompt = `Act as a strict Python unit test. The user is solving: "${description}". 
  
Here is their code:
\`\`\`python
${userCode}
\`\`\`

Evaluate it based on correctness, edge cases, and syntax.
If correct, start your response strictly with "PASS:".
If incorrect or buggy, start your response strictly with "FAIL:".

After the status, provide a brief, helpful explanation of the result. Do not provide the full solution code. Keep it under 50 words.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // Safety check if response is empty
    if (!response.text) {
      return "FAIL: No response received from the AI tutor.";
    }

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const evaluateRetroCode = async (conceptTitle: string, userCode: string): Promise<boolean> => {
  const ai = getClient();
  const prompt = `The user is asked to recall the Python code for the concept: "${conceptTitle}".
  
  Their memory recall code:
  \`\`\`python
  ${userCode}
  \`\`\`
  
  Does this code correctly demonstrate the concept? 
  Ignore minor syntax errors if the logic is right.
  Return strictly "TRUE" if acceptable, or "FALSE" if they missed the concept.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text?.trim().includes("TRUE") ?? false;
  } catch (error) {
    console.error("Retro Grading Error", error);
    return false;
  }
};

export const getChatResponse = async (
  history: ChatMessage[], 
  userMessage: string, 
  context: { title: string; description: string; code: string }
): Promise<string> => {
  const ai = getClient();

  // Convert app ChatMessage to Gemini Content format
  // We exclude the very last user message because we send it in sendMessage
  const historyContent: Content[] = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  const systemInstruction = `You are an expert Python Tutor specializing in Cybersecurity (Red/Blue Team) and AI Agent development.
  Your goal is to help the user understand Python concepts within the context of security vulnerabilities, defenses, and building AI systems.

  Current Context:
  - Challenge: "${context.title}"
  - Description: "${context.description}"
  
  Persona:
  - Tone: Cyber-expert, encouraging, precise.
  - Expertise: Python, OWASP Top 10, LLM Security (Prompt Injection, Jailbreaks), AI Agent Architecture.

  Rules:
  1. Keep answers concise and conversational (under 3 sentences usually).
  2. Do NOT give the full answer/code solution. Guide them to it.
  3. Explain the "Security Context" or "AI Concept" behind the code.
  4. If they ask about their code, refer to the code snippet provided in the prompt.
  `;

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: { systemInstruction },
    history: historyContent
  });

  // Inject current code context into the message invisibly to the user's view of history,
  // but visible to the model for this turn.
  const messageWithContext = `
  [User's Current Code Context]:
  \`\`\`python
  ${context.code}
  \`\`\`
  
  [User Question]:
  ${userMessage}
  `;

  try {
    const response = await chat.sendMessage({ message: messageWithContext });
    return response.text || "I'm having trouble connecting to the neural net. Try again?";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};
