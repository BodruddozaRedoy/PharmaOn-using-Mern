PharmaOn
(Add a relevant logo or banner image here if available)

🚀 Introduction
PharmaOn is a multi-vendor e-commerce platform specializing in the sale of medicines and healthcare products. Built using the MERN stack, it provides a seamless shopping experience, allowing users to purchase medications, submit queries, and receive expert advice.

📌 Live Demo
🔗 PharmaOn Live Website (Replace with actual URL)

🔑 Admin Credentials
Email: admin@gmail.com
Password: Aa1234
📚 Table of Contents
Key Features
Technology Stack
Installation
Usage
Configuration
Dependencies
Examples
Troubleshooting
Contributors
License
🎯 Key Features
✅ Responsive Design – Fully responsive for mobile, tablet, and desktop views, including the admin dashboard.
✅ User Authentication – Supports email/password login and social authentication (Google).
✅ Dynamic Role Management – Admins can promote users to sellers or downgrade them.
✅ Shop Page – Displays medicines in a tabular format with "select" and "view" options.
✅ Cart Functionality – Users can add/remove medicines, adjust quantities, and proceed to checkout.
✅ Secure Checkout – Payments processed securely via Stripe.
✅ Dynamic Invoice – Automatically generated invoice after payment, with a PDF download option.
✅ Category Management – Users can browse medicines by category.
✅ Real-Time Notifications – SweetAlerts and toast notifications for CRUD operations and authentication.
✅ Optimized Data Fetching – Efficient GET requests using TanStack Query.

🛠 Technology Stack
Frontend:
⚛️ React.js
🚏 React Router
🎨 Tailwind CSS
🔄 TanStack Query
State Management:
🏗 Context API
Notifications & Alerts:
🚀 React Toastify
⚠️ SweetAlert2
File Management & PDFs:
🖼 ImgBB (Image hosting)
📄 React-PDF Renderer, jsPDF, and AutoTable (PDF generation & printing)
Other Libraries:
💳 Stripe for Payments
📆 React DatePicker
📊 React Data Table Component
🔧 Installation
Prerequisites
Ensure you have the following installed:

Node.js (>= 16.x)
npm or yarn
Steps to Run Locally
Clone the repository

sh
Copy
Edit
git clone https://github.com/your-repo/pharmaon.git
cd pharmaon
Install dependencies

sh
Copy
Edit
npm install
Run the development server

sh
Copy
Edit
npm run dev
Open in browser
The app will be available at http://localhost:3000

▶ Usage
Users can browse and buy medicines.
Admins can manage users, promote them to sellers, and handle inventory.
Payments are processed via Stripe.
Users receive dynamic invoices with a download option.
⚙ Configuration
To configure authentication, payments, and image uploads, set the following environment variables in a .env file:

env
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
REACT_APP_IMGBB_API_KEY=your_imgbb_api_key
📦 Dependencies
Main Dependencies:

json
Copy
Edit
{
  "react": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "tailwindcss": "^3.4.17",
  "firebase": "^11.1.0",
  "axios": "^1.7.9",
  "sweetalert2": "^11.15.10",
  "@tanstack/react-query": "^5.64.1",
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "jspdf": "^2.5.2",
  "react-hook-form": "^7.54.2",
  "react-hot-toast": "^2.5.1"
}
Dev Dependencies:

json
Copy
Edit
{
  "@vitejs/plugin-react": "^4.3.4",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "postcss": "^8.4.49",
  "vite": "^6.0.5"
}
📌 Examples
Here are some sample screenshots:

(Add images here to showcase the UI, authentication, checkout, etc.)

🛠 Troubleshooting
🔴 Issue: "Module not found"
Solution: Run npm install again to reinstall dependencies.

🔴 Issue: Firebase Authentication Not Working
Solution: Ensure your Firebase API keys are correctly set in .env and the Firebase project allows authentication.

🔴 Issue: Payments Failing
Solution: Check that your Stripe API keys are correctly set up.

👥 Contributors
🚀 Created by Your Name
🔗 GitHub Profile (Replace with actual profile link)

📜 License
This project is licensed under the MIT License.

