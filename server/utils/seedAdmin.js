const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding...');

        const email = process.env.SEED_ADMIN_EMAIL;
        const password = process.env.SEED_ADMIN_PASSWORD;

        if (!email || !password) {
            console.log('SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD not set in .env');
            process.exit(1);
        }

        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            console.log('Admin already exists in DB!');
            process.exit(0);
        }

        const newAdmin = await Admin.create({
            name: 'System Admin',
            email: email,
            password: password,
            role: 'admin'
        });

        console.log('Admin successfully seeded!');
        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedAdmin();
