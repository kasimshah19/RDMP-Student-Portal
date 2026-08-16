const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

dotenv.config();

const seedDummy = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding dummies...');

        // Seed Teacher
        const teacherExists = await Teacher.findOne({ email: 'teacher@rdmpcollege.edu.in' });
        if (!teacherExists) {
            await Teacher.create({
                name: 'Demo Teacher',
                email: 'teacher@rdmpcollege.edu.in',
                password: 'password123',
                role: 'teacher'
            });
            console.log('Dummy Teacher seeded (teacher@rdmpcollege.edu.in / password123)');
        }

        // Seed Student
        const studentExists = await Student.findOne({ email: 'student@rdmpcollege.edu.in' });
        if (!studentExists) {
            await Student.create({
                name: 'Demo Student',
                email: 'student@rdmpcollege.edu.in',
                password: 'password123',
                class: '11th',
                role: 'student'
            });
            console.log('Dummy Student seeded (student@rdmpcollege.edu.in / password123)');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedDummy();
