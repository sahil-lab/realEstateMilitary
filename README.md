# 🏠 Military Veteran Real Estate Consultancy

> Professional real estate services with military precision and dedication

[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=military-veteran-real-estate)](https://military-veteran-real-estate.vercel.app)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)

## 📞 Contact Information

**Phone Numbers:**
- +91 9414062575
- +91 9829088366  
- +91 8559067075

**Email:** sahil.aps2k12@gmail.com

## ✨ Features

### 🎯 **Core Functionality**
- **Property Listings**: Dynamic property search and filtering
- **User Authentication**: Role-based access (User, Admin, Super Admin)
- **Property Management**: Add, edit, delete properties (Admin)
- **User Management**: Manage admins and users (Super Admin)
- **Contact Forms**: WhatsApp & Email integration
- **Real-time Communication**: Direct WhatsApp integration

### 🎨 **Modern Design**
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: GSAP-powered transitions
- **Interactive Elements**: Particles.js backgrounds
- **Enhanced UX**: Smooth scrolling with Lenis
- **Professional UI**: Tailwind CSS with custom styling

### 🔐 **Security**
- **JWT Authentication**: Secure token-based auth
- **Password Encryption**: bcryptjs hashing
- **Role-based Access**: Multi-level user permissions
- **Input Validation**: Server-side validation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahil-lab/realEstateMilitary.git
   cd realEstateMilitary
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   ```
   http://localhost:3001
   ```

## 🌐 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Push code to GitHub
   - Import project in Vercel
   - Configure environment variables

2. **Environment Variables (Required)**
   ```
   VITE_MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch

## 📁 Project Structure

```
realEstateMilitary/
├── backend/
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   ├── public/           # Static frontend files
│   ├── server.js         # Express server
│   └── package.json      # Backend dependencies
├── vercel.json           # Vercel configuration
├── package.json          # Root package.json
└── README.md
```

## 🛠️ Technology Stack

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

### **Frontend**
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS
- **JavaScript** - Vanilla JS
- **GSAP** - Animations
- **Particles.js** - Background effects
- **Lenis** - Smooth scrolling

### **Deployment**
- **Vercel** - Hosting platform
- **MongoDB Atlas** - Cloud database
- **GitHub** - Version control

## 👥 User Roles

### **Super Admin**
- Manage all admin users
- View system statistics
- Full system access

### **Admin**
- Add/edit/delete properties
- Manage property listings
- View user statistics

### **User**
- Browse properties
- Submit inquiries
- Contact via WhatsApp/Email

## 📱 Contact Integration

### **WhatsApp Integration**
- Direct WhatsApp messaging
- Pre-formatted property inquiries
- Contact: +91 8559067075

### **Email Integration**
- Auto-formatted emails
- Property inquiry forms
- Email: sahil.aps2k12@gmail.com

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Military Veterans** - For their service and inspiration
- **Real Estate Community** - For trust and support
- **Open Source** - For amazing tools and libraries

---

**Built with ❤️ by Military Veteran Real Estate Consultancy**

For support: sahil.aps2k12@gmail.com | +91 8559067075 