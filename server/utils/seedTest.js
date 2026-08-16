const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const ClassGroup = require('../models/ClassGroup');
const Division = require('../models/Division');

const seed = async () => {
    try {
        let classGroup = await ClassGroup.findOne({ name: '11th' });
        if (!classGroup) classGroup = await ClassGroup.create({ name: '11th', stream: 'Science' });

        let division = await Division.findOne({ divisionName: 'A' });
        if (!division) {
            await Division.collection.insertOne({ divisionName: 'A', classGroupId: classGroup._id, sectionTeacher: new mongoose.Types.ObjectId() });
            division = await Division.findOne({ divisionName: 'A' });
        }

        await Teacher.collection.insertOne({ name: 'Demo Teacher', email: 'teacher@rdmpcollege.edu.in', password: await bcrypt.hash('teacher123', 10), employeeId: 'EMP001', department: 'Science', role: 'teacher' });
        await Student.collection.insertOne({ name: 'Demo Student', email: 'student@rdmpcollege.edu.in', password: await bcrypt.hash('student123', 10), admissionNumber: 'ADM001', rollNumber: '1', class: classGroup._id, section: division._id, parentName: 'Demo Parent', parentPhone: '1234567890', role: 'student' });

        console.log('Test Accounts Seeded completely!');
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
seed();
