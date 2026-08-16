require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Teacher = require('./models/Teacher');
const Student = require('./models/Student');
const ClassGroup = require('./models/ClassGroup');
const Division = require('./models/Division');

const seedDatabase = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected.');

        // Clear existing initial test users (optional, based on email)
        await Admin.deleteMany({ email: 'admin@rdmpcollege.edu.in' });
        await Teacher.deleteMany({ email: 'teacher@rdmpcollege.edu.in' });
        await Student.deleteMany({ email: 'student@rdmpcollege.edu.in' });

        // 1. Create Admin
        await Admin.create({
            name: 'Super Admin',
            email: 'admin@rdmpcollege.edu.in',
            password: 'Password@123',
            role: 'admin'
        });
        console.log('✅ Admin credentials generated:');
        console.log('   Email: admin@rdmpcollege.edu.in');
        console.log('   Pass:  Password@123');

        // 2. Create basic Class & Division for wiring the Teacher & Student correctly
        const classGroup = await ClassGroup.create({ name: '11th', stream: 'Science', subjectsOffered: [], feeStructure: [] });
        const division = await Division.create({ name: 'A', classGroupId: classGroup._id, maxCapacity: 60 });

        // 3. Create Teacher
        const teacher = await Teacher.create({
            name: 'Prof. Ramesh Kumar',
            email: 'teacher@rdmpcollege.edu.in',
            password: 'Password@123',
            role: 'teacher',
            assignedDivisions: [division._id],
            assignedSubjects: [],
            phone: '9876543210'
        });

        // Assign teacher to division
        division.classTeacherId = teacher._id;
        await division.save();

        console.log('✅ Teacher credentials generated:');
        console.log('   Email: teacher@rdmpcollege.edu.in');
        console.log('   Pass:  Password@123');

        // 4. Create Student
        await Student.create({
            name: 'Kasim Shah (Demo Student)',
            email: 'student@rdmpcollege.edu.in',
            password: 'Password@123',
            role: 'student',
            classGroupId: classGroup._id,
            divisionId: division._id,
            rollNumber: '1',
            phone: '1234567890'
        });
        console.log('✅ Student credentials generated:');
        console.log('   Email: student@rdmpcollege.edu.in');
        console.log('   Pass:  Password@123');

        console.log('\nSeed process completed successfully!');
        process.exit();

    } catch (error) {
        console.error('Failed to seed database:', error);
        process.exit(1);
    }
};

seedDatabase();
