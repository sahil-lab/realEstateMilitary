# Military Veteran Real Estate Consultancy - Complete Setup Guide

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account (already configured with your credentials)

### Step 1: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend API will run on: **http://localhost:3001**

### Step 2: Frontend Access
Once the backend is running, open your browser and visit:
- **Main Website**: http://localhost:3001/index.html
- **Registration Page**: http://localhost:3001/registration.html

## 🔐 Default Admin Accounts

### Super Admin
- **Email**: superadmin@gmail.com
- **Password**: abCD123@

### Admin  
- **Email**: admin@gmail.com
- **Password**: abCD123@

## 📱 Features

### Frontend Features
- ✅ Responsive real estate website
- ✅ Property listings with search
- ✅ Partner showcase (EMAAR, Danube, Bhutani, etc.)
- ✅ WhatsApp integration (+91 8559067075)
- ✅ Contact form with email (sahil.aps2k12@gmail.com)
- ✅ User/Admin/SuperAdmin registration
- ✅ Mobile-friendly navigation

### Backend API Features
- ✅ JWT Authentication
- ✅ Role-based access control
- ✅ Property management (CRUD)
- ✅ User management
- ✅ MongoDB integration
- ✅ File upload support

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/adminRegister` - Admin registration (requires super admin token)
- `POST /api/auth/adminLogin` - Admin login
- `POST /api/auth/superAdminRegister` - Super admin registration
- `POST /api/auth/superAdminLogin` - Super admin login

### Properties
- `GET /api/properties` - Get all properties (public)
- `POST /api/properties` - Add property (admin/superadmin only)
- `DELETE /api/properties/:id` - Delete property (superadmin only)

## 🚀 Deploy to Production

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from the backend directory
cd backend
vercel --prod

# Follow the prompts to connect your GitHub repo
```

### Option 2: Railway
1. Go to railway.app
2. Connect your GitHub repository
3. Add environment variables from `.env`
4. Deploy automatically

### Option 3: Render
1. Go to render.com
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

## 📁 Project Structure
```
realEstateMilitary/
├── backend/
│   ├── public/              # Frontend files served by Express
│   │   ├── index.html       # Main website
│   │   ├── registration.html # Registration page
│   │   ├── script.js        # Frontend JavaScript
│   │   ├── styles.css       # Custom styles
│   │   └── images/          # All property and logo images
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Authentication middleware
│   ├── server.js            # Express server
│   ├── package.json         # Dependencies
│   └── .env                 # Environment variables
├── images/                  # Original image assets
├── index.html               # Original frontend (use backend/public/ instead)
├── registration.html        # Original registration page
├── script.js                # Original JavaScript
├── styles.css               # Original styles
└── README.md               # This file
```

## 🔧 Environment Variables (.env)
```env
VITE_MONGODB_URI=mongodb+srv://sahilaps2k12:oK4nFmyRXPQ0HYBY@cluster0.6sljnqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=military_veteran_real_estate_jwt_secret_key_2024
PORT=3001
VITE_API_URL=http://localhost:3001
# ... other Firebase and API keys
```

## ✨ Next Steps
1. **Test locally**: Run `npm start` in backend directory
2. **Add properties**: Login as admin and use API endpoints
3. **Customize**: Update company details, colors, images
4. **Deploy**: Choose your preferred hosting platform
5. **Domain**: Point your custom domain to the deployed URL

## 📞 Support
- **Phone**: +91 8559067075
- **Email**: sahil.aps2k12@gmail.com
- **WhatsApp**: Direct integration in the website

Your complete real estate consultancy platform is ready! 🎉 