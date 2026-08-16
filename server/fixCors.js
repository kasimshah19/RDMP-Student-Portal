const fs = require('fs');
let content = fs.readFileSync('server.js', 'utf8');

content = content.replace(/const corsOptions = \{[\s\S]*?\};\napp\.use\(cors\(corsOptions\)\);/g, `const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || origin.startsWith('http://localhost:') || origin === process.env.CLIENT_URL) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));`);

fs.writeFileSync('server.js', content);
console.log('CORS fixed.');
