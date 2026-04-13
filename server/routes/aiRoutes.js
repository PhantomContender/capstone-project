const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Service = require('../models/Service');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/recommend', async (req, res) => {
  const { userInquiry } = req.body; 

  try {
    const dbServices = await Service.find({});
    const serviceMenu = dbServices.map(s => 
      `${s.name} (ID: ${s._id}) - ${s.description}`
    ).join('\n');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

   const systemInstruction = `
      You are the 'Zenith Assistant' for Zenith Wellness Clinic. Tone: calm, professional. 
      Analyze the user's input: "${userInquiry}".
      
      Suggest 1 to 3 relevant services from this ACTUAL menu:
      ${serviceMenu}

      Return ONLY a JSON object:
      {
        "message": "Encouraging response under 3 sentences.",
        "suggestions": [{ "serviceName": "...", "justification": "...", "serviceID": "MUST_BE_THE_REAL_ID_FROM_MENU" }]
      }`;
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemInstruction }] }],
      generationConfig: { responseMimeType: "application/json" }
    });
    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanJson);
    
    res.json(data);

  } catch (error) {
    console.error("Assistant Error:", error);
    res.status(500).json({ 
        message: "The Zenith Assistant is unavailable. Please try again shortly.",
        suggestions: [] 
    });
  }
});

module.exports = router;