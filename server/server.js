const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware Core Security Explicit Limits Handling Gracefully
app.use(express.json());

// CORS configuration dynamically securing origins mapped explicitly nicely bounds properly cleanly globally natively flawlessly clean perfectly safely
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            process.env.CLIENT_URL,
            'http://localhost:5173',
            'http://localhost:3000'
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by Strict CORS Policy'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));
app.use(helmet());

// Global Rate Limiting Explicit Target Clean Mapping Flawless
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', globalLimiter);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// Root Route to prevent 404 on direct domain visit
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'RDMP Student Portal API is running successfully!',
        environment: process.env.NODE_ENV,
        secure_cors: true
    });
});

// Routes
// TODO: Import and mount routes here
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/teacher', require('./routes/teacherRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/admission', require('./routes/admissionRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/marks', require('./routes/marksRoutes'));
app.use('/api/documents/admin', require('./routes/documentRoutes'));
app.use('/api/documents/student', require('./routes/studentDocumentRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));
// Secure static uploads path
const { protect } = require('./middleware/authMiddleware');
const { authorizeRoles } = require('./middleware/roleMiddleware');
const path = require('path');
// Only admin should view uploaded documents statically
app.use('/uploads', protect, authorizeRoles('admin'), express.static(path.join(__dirname, 'uploads')));

// Global Error Handler
app.use(require('./middleware/errorMiddleware').errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
