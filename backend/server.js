require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const { protect, admin: isAdmin } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');
const app = express();

// Initialize Firebase Admin (commented out for now)
// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     // Use provided config if needed
// });

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Database connection
mongoose.connect(process.env.VITE_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// File upload for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images/properties'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
app.post('/api/upload', protect, isAdmin, upload.single('image'), (req, res) => {
    res.json({ filePath: `/public/images/properties/${req.file.filename}` });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 