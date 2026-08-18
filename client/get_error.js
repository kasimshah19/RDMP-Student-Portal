const { execSync } = require('child_process');
try {
    console.log("running build...");
    execSync('npm run build', { stdio: 'pipe' });
    console.log("build succeeded");
} catch (e) {
    const fs = require('fs');
    fs.writeFileSync('build_error_clean.txt', e.stderr.toString());
    console.log("error written to build_error_clean.txt");
}
