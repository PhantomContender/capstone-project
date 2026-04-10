# 🌿 Zenith Wellness Spa
**A Full-Stack Wellness Management System**

Zenith Wellness is a MERN stack application designed to bridge the gap between holistic health and modern technology. It features a seamless booking experience and an integrated AI assistant to provide personalized service recommendations.

## 🚀 Live Demo
- **Frontend:** [(https://zenith-wellness-spa.netlify.app/)]
- **Backend API:** [(https://zenith-wellness.onrender.com/)]

## 🛠️ The Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (MERN Stack)
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt
- **AI Integration:** Google Gemini API (Zenith Assistant)

## ✨ Key Features
- **Dynamic Service Menu:** Real-time data fetching from MongoDB.
- **Secure Authentication:** User registration and login with protected routes.
- **Zenith AI Assistant:** A custom-tuned AI that recommends services based on user wellness goals.
- **Responsive Design:** Fully optimized for mobile and desktop viewing.

## 🔧 Installation & Setup

1. **Clone the repo:**
   git clone [https://github.com/PhantomContender/capstone-project.git]

2. **Install Dependencies**
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

3. **Enviromental Variables**
Create a .env file in the server directory and add:

MONGO_URI (Your Atlas Connection String)

JWT_SECRET (Your private key)

GEMINI_API_KEY (For the AI assistant)

4. **Seed the Database**
cd server
node seeder.js

5. **Run the App**
# From the root
npm run dev

