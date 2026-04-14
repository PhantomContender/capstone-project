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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1beta' });

    const systemInstruction = `
      You are the 'Zenith Assistant'. Tone: calm, professional. 
      Analyze the user's input: "${userInquiry}".
      Suggest 1 to 3 relevant services from this menu:
      ${serviceMenu}

      Return ONLY a JSON object:
      {
        "message": "...",
        "suggestions": [{ "serviceName": "...", "justification": "...", "serviceID": "..." }]
      }`;

    const result = await model.generateContent(systemInstruction);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json|```/g, "").trim(); 

    try {
      const data = JSON.parse(cleanJson);
      res.json(data);
    } catch (parseError) {
      console.error("Parsing Error:", parseError);
      res.status(200).json({ 
        message: "I have some suggestions for you!", 
        suggestions: [] 
      }); 
    }

  } catch (error) {
    console.error("Assistant Error:", error);
    res.status(500).json({ 
      message: "The Zenith Assistant is temporarily offline.",
      suggestions: [] 
    });
  }
}); 

module.exports = router;