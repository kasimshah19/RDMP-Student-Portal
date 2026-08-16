const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ success: false, message: 'Admin already exists' });
        }

        const admin = await Admin.create({
            name,
            email,
            password,
            role: 'admin'
        });

        if (admin) {
            res.status(201).json({
                success: true,
                user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
                token: generateToken(admin._id, admin.role)
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                success: true,
                user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
                token: generateToken(admin._id, admin.role)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await Teacher.findOne({ email });

        if (teacher && (await teacher.matchPassword(password))) {
            res.json({
                success: true,
                user: { id: teacher._id, name: teacher.name, email: teacher.email, role: teacher.role },
                token: generateToken(teacher._id, teacher.role)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        if (student && (await student.matchPassword(password))) {
            res.json({
                success: true,
                user: { id: student._id, name: student.name, email: student.email, role: student.role },
                token: generateToken(student._id, student.role)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
