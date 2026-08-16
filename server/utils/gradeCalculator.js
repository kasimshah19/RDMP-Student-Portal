/**
 * RDMP Dynamic Grade Logic natively mapping explicitly constructed matrices dynamically tracking bounds explicitly.
 */

exports.calculateGrade = (percentage) => {
    // Basic clamping protecting native execution bounding
    if (percentage < 0) return 'F';
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F'; // Below 40 is implicitly fail logic bounds mapped locally.
};

exports.calculateAggregate = (marksArray, passingMarksBound) => {
    let totalObtained = 0;
    let maxOverall = 0;
    let isFail = false;

    marksArray.forEach(mark => {
        totalObtained += mark.marksObtained;
        maxOverall += mark.maxMarks;
        // Pass/Fail evaluation occurs rigorously per specific subject bounds globally implicitly
        if (mark.marksObtained < passingMarksBound) {
            isFail = true;
        }
    });

    const percentage = maxOverall > 0 ? Math.round((totalObtained / maxOverall) * 10000) / 100 : 0;

    // Natively tracks global structural bounds overriding generic grade logic seamlessly explicitly
    const grade = isFail ? 'F' : exports.calculateGrade(percentage);

    return { totalObtained, maxOverall, percentage, grade, isFail };
};
