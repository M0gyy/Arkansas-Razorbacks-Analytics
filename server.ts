import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini AI setup
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// AI Football EPA Analyst Endpoint
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const { prompt, seasonContext, queryType } = req.body;
    
    const genAI = getGenAI();
    if (!genAI) {
      return res.status(503).json({
        error: 'Gemini API Key is missing or not configured. Please add GEMINI_API_KEY in secrets.',
        fallbackAnswer: 'The Arkansas Razorbacks EPA dataset spans from 2014 to present. Top offensive EPA seasons include 2015 (+0.214 EPA/play under Dan Enos & Brandon Allen) and 2021 (+0.158 EPA/play under Kendal Briles & KJ Jefferson). Top defensive EPA season was 2014 (-0.115 EPA/play allowed under Robb Smith).'
      });
    }

    const systemInstruction = `You are the Official Arkansas Razorbacks Football Analytics & EPA Specialist. 
Your job is to provide deep, accurate statistical insights on Expected Points Added (EPA) per play across offense, defense, and special teams for Arkansas Razorbacks football from 2014 to present.
Be passionate, professional, knowledgeable about Arkansas coaches (Bielema, Morris, Pittman, Petrino, Briles, Enos, Odom, Travis Williams), key players (KJ Jefferson, Treylon Burks, Brandon Allen, Alex Collins, Taylen Green, Hunter Henry, Drew Sanders, Bumper Pool, etc.), and SEC football context. Keep answers concise, data-informed, structured, and easy for fans and analysts to read.`;

    const fullPrompt = `User Query: ${prompt}

Context provided: ${JSON.stringify(seasonContext || {})}
Query Type: ${queryType || 'general'}

Please provide a clear analysis addressing the user's question, highlighting specific EPA per play numbers, offensive/defensive trends, key game turnarounds, or coaching impact where relevant.`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    const reply = response.text || 'Analysis completed.';
    res.json({ result: reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to analyze EPA data.',
      fallbackAnswer: 'Unable to process query via AI right now. Please try again shortly.'
    });
  }
});

// Configure Vite or Static files
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Razorbacks EPA Tracker server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Server failed to start:', err);
});
