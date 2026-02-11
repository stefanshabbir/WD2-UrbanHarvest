Urban Harvest Hub – Full-Stack PWA
This project is a digital experience hub for eco-conscious communities, blending commerce and community engagement. It features a React/Vite SPA (Task 1) and a Full-Stack PWA with an Express REST API and MongoDB (Task 2).

🛠 Database Setup
The application uses MongoDB Atlas for data persistence to manage workshops, events, and products.

Cluster Setup: Create a MongoDB Atlas cluster and a database named urban_harvest.

Network Access: In MongoDB Atlas, go to Network Access and whitelist 0.0.0.0/0 to allow the Render deployment to connect.

Connection String: Create a .env file in the /server directory and add your connection string: MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/urban_harvest

🚀 How to Run the Application
1. Backend (Express API)
Navigate to the UrbanHarvestPWA/server directory.

Install dependencies: npm install

Start the server: npm start

The backend will run on http://localhost:5000 (or the port specified in your environment).

2. Frontend (React PWA)
Navigate to the UrbanHarvestPWA/client directory.

Install dependencies: npm install

Start the development server: npm run dev

The frontend will be available at http://localhost:5173.

🧪 Testing the System
Testing the API (Backend)
The REST API supports CRUD operations for workshops, events, and products.

GET /api/items: Use Postman or a browser to verify that the API retrieves the list of products/events.


POST /api/items: Send a JSON body (e.g., { "name": "Composting Workshop", "price": 10 }) to test content creation.


Error Handling: Attempting to send incomplete data should return a 400 Bad Request error.

Testing the GUI & PWA (Frontend)

Responsive Design: Open the app in Chrome, press F12, and toggle Device Mode to test the mobile-first layout.

Offline Mode: In the Chrome DevTools Application tab, select Service Workers and check "Offline." The app should still load cached content.


Installability: Click the "Install" icon in the browser address bar to add the app to your desktop/home screen.


Lighthouse: Run a Lighthouse report in DevTools to verify a PWA score ≥ 90.

📁 Project Structure

/UrbanHarvestSPA: Task 1 - Component-based React SPA (Internal JSON).


/UrbanHarvestPWA: Task 2 - Full-stack PWA with REST API and DB integration.

/client: Frontend React/Vite code.

/server: Backend Node.js/Express code.