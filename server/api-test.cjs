const http = require('http');

const reqOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/student/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const req = http.request(reqOptions, res => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.log("LOGIN FAILED:", res.statusCode, body);
            return;
        }

        try {
            const data = JSON.parse(body);
            const token = data.token;

            console.log("LOGIN SUCCESS, FETCHING ATTENDANCE...");

            http.get('http://localhost:5000/api/student/attendance', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }, r => {
                let bd = '';
                r.on('data', c => bd += c);
                r.on('end', () => {
                    console.log("ATTENDANCE STATUS:", r.statusCode);
                    console.log("ATTENDANCE BODY:", bd);
                });
            });

        } catch (e) {
            console.log("PARSE ERR:", e.message, "\nBODY:", body);
        }
    });
});

req.write(JSON.stringify({ email: 'student1@rdmp.edu', password: 'password123' }));
req.end();
