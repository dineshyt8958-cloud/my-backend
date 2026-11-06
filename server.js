 const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ==========================================
// TEMPORARY DATABASE (Arrays)
// ==========================================
let messages = []; 
let papers = []; 
let questions = []; 

// ==========================================
// 1. MESSAGES API
// ==========================================
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

app.post('/api/messages', (req, res) => {
    const { message } = req.body;
    if(!message) return res.status(400).json({ error: "Message required" });

    const newMsg = {
        id: "m_" + Date.now(),
        message: message,
        read: false,
        pinned: false,
        date: new Date().toISOString(),
        newUntil: Date.now() + (60 * 1000) 
    };

    messages.push(newMsg);
    res.json({ success: true, data: newMsg });
});

// ==========================================
// 2. PAPERS API
// ==========================================
app.get('/api/papers', (req, res) => {
    res.json(papers);
});

app.post('/api/papers', (req, res) => {
    const { subject, title, minutes } = req.body;
    const newPaper = {
        id: "p_" + Date.now() + "_" + Math.random().toString(36).slice(2,7),
        subject,
        title,
        minutes
    };
    papers.push(newPaper);
    res.json({ success: true, data: newPaper });
});

// ==========================================
// 3. QUESTIONS API
// ==========================================
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

app.post('/api/questions', (req, res) => {
    const { paperId, text, options, correct, solution } = req.body;
    const newQuestion = {
        id: "q_" + Date.now() + "_" + Math.random().toString(36).slice(2,7),
        paperId,
        text,
        options,
        correct,
        solution
    };
    questions.push(newQuestion);
    res.json({ success: true, data: newQuestion });
});

// Server start
app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
});