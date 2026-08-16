const fs = require('fs');
let c = fs.readFileSync('server.js', 'utf8');

c = c.replace(/const corsOptions = \{[\s\S]*?app\.use\(cors\(corsOptions\)\);/,
    `const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true,
};
app.use(cors(corsOptions));`);

fs.writeFileSync('server.js', c);
console.log('Fixed');
