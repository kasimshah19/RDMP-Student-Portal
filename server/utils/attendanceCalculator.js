/**
 * Calculates attendance aggregates mapping exact arrays dynamically.
 * Note: 'leave' mathematically equates to 'absent' resolving percentages logically.
 * 
 * @param {Array} attendanceRecords - Array of Mongoose Attendance documents
 * @returns {Object} mapped parameters resolving final clamped aggregate percent hooks
 */
exports.calculateAttendance = (attendanceRecords) => {
    if (!attendanceRecords || attendanceRecords.length === 0) {
        return {
            totalDays: 0,
            presentDays: 0,
            absentDays: 0,
            leaveDays: 0,
            percentage: 0
        };
    }

    let present = 0;
    let absent = 0;
    let leave = 0;

    attendanceRecords.forEach(record => {
        if (record.status === 'present') present++;
        else if (record.status === 'absent') absent++;
        else if (record.status === 'leave') leave++;
    });

    const totalDays = attendanceRecords.length;
    // Calculation choice: leave is effectively absent logically for percentages
    const percentage = totalDays > 0 ? Math.round((present / totalDays) * 10000) / 100 : 0;

    return {
        totalDays,
        presentDays: present,
        absentDays: absent,
        leaveDays: leave,
        percentage
    };
};
