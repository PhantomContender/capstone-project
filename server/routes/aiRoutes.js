const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/recommend', async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemInstruction = `
      You are the 'Zenith Assistant', a sophisticated AI assistant for Zenith Wellness Clinic. 
      Your tone is calm and professional.
      Based on the user's physical or mental fatigue, recommend ONE of these services:
      1. Zenith Deep Tissue Massage - for intense muscle pain.
      2. Himalayan Salt Stone Ritual - for stress and circulation.
      3. Guided Mindfulness Meditation - for mental clarity.
      4. Express Radiance Facial Treatment - for skin health.
      5. Infared Sauna Therap - for detoxification, circulation, and muscle recovery.
      6. Holistic Wellness Assessment - for personalized health insights
      
      Keep your response under 3 sentences. Be encouraging.
    `;

    const result = await model.generateContent([systemInstruction, prompt]);
    const response = await result.response;
    const text = response.text();

    res.json({ recommendation: text });
  } catch (error) {
    console.error("Assistant Error:", error);
    res.status(500).json({ recommendation: "The stars are occluded. Please consult the ledger directly." });
  }
});

module.exports = router;