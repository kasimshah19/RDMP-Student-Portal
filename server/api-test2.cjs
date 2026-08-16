const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const Student = require('./models/Student');

(async () => {
    try {
        const student = await Student.findOne();
        if (!student) {
            console.log("No student found");
            process.exit(1);
        }

        const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
        console.log("Token:", token);

        const http = require('http');
        http.get('http://localhost:5000/api/student/attendance', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }, r => {
            let bd = '';
            r.on('data', c => bd += c);
            r.on('end', () => {
                console.log("ATTENDANCE STATUS:", r.statusCode);
                console.log("ATTENDANCE BODY:", bd.substring(0, 500));
                process.exit(0);
            });
        });

    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
