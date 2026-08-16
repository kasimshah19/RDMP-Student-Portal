const fs = require('fs');
const taskPath = 'C:/Users/kasim/.gemini/antigravity/brain/11cb1dc3-ba8e-4558-a955-254ec2a284c3/task.md';
let task = fs.readFileSync(taskPath, 'utf8');

// The original content had Phase 9 partial, but let's just append the final phase explicitly.
// Actually, earlier we tried to multi_replace Phase 9 but it failed. So it might not even exist.
// Let's just append Phase 9 at the bottom.

if (!task.includes('Phase 9: Student Portal')) {
    task += `\n\n## Phase 9: Student Portal Remaining Pages (Completed)
- [x] 1. My Profile
- [x] 2. Attendance
- [x] 3. Examinations
- [x] 4. Results
- [x] 5. Time Table
- [x] 6. Documents
- [x] 7. Notices
- [x] 8. Fees
- [x] 9. Library
- [x] 10. Feedback
- [x] 11. Leave
- [x] 12. Settings
`;
}

fs.writeFileSync(taskPath, task);
console.log('Task updated.');
