const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ClassGroup = require('../models/ClassGroup');
const Division = require('../models/Division');
const Subject = require('../models/Subject');

dotenv.config();

const seedClasses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding classes...');

        // Wipe old Class/Div/Subj
        await ClassGroup.deleteMany();
        await Division.deleteMany();
        await Subject.deleteMany();

        const streams = ['Science', 'Commerce', 'Arts'];
        const names = ['11th', '12th'];

        for (let name of names) {
            for (let stream of streams) {
                // Create ClassGroup
                const cls = await ClassGroup.create({ name, stream });

                // Create Divisions A and B for each ClassGroup
                const divA = await Division.create({ name: 'A', classGroupId: cls._id, capacity: 60 });
                const divB = await Division.create({ name: 'B', classGroupId: cls._id, capacity: 60 });

                // Update ClassGroup
                cls.divisions.push(divA._id, divB._id);
                await cls.save();

                // Standard Subjects
                let subjects = ['English', 'Environmental Science']; // Common
                if (stream === 'Science') {
                    subjects.push('Physics', 'Chemistry', 'Mathematics', 'Biology');
                } else if (stream === 'Commerce') {
                    subjects.push('Accountancy', 'Economics', 'Business Studies', 'Mathematics');
                } else {
                    subjects.push('History', 'Geography', 'Political Science', 'Economics');
                }

                for (let sub of subjects) {
                    await Subject.create({
                        name: sub,
                        classGroupId: cls._id,
                        stream: stream
                    });
                }
            }
        }

        console.log('Base Classes, Divisions, and Subjects successfully generated!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding classes:', error);
        process.exit(1);
    }
};

seedClasses();
