const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { calculateAggregate, calculateGrade } = require('./gradeCalculator');

exports.generateMarksheetPdf = async (studentData, examData, marksArray) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // Standard A4 Size Native Vector Mapping Array

    const { width, height } = page.getSize();

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Document styling structures implicitly mapping
    const titleSize = 18;
    const subTitleSize = 12;
    const textSize = 10;
    const primaryColor = rgb(0.1, 0.2, 0.5);

    // 1. Header (Placeholder hook explicit mapping image vectors natively over logic structures)
    page.drawText('Raul Daulatsinhji Multipurpose High School & Jr. College of Science', {
        x: width / 2 - 250, y: height - 50, size: titleSize, font: fontBold, color: primaryColor
    });
    page.drawText('Dondaicha, Dist. Dhule, Maharashtra | Establishment - 1929', {
        x: width / 2 - 160, y: height - 70, size: subTitleSize, font: fontReg
    });

    // 2. Exam Context mapped natively
    page.drawText('ACADEMIC MARKSHEET RECORD', {
        x: width / 2 - 100, y: height - 110, size: 14, font: fontBold, color: rgb(0.2, 0.2, 0.2)
    });

    page.drawText(`Exam: ${examData.name} | Term: ${examData.term} | Year: ${examData.academicYear}`, {
        x: width / 2 - 140, y: height - 130, size: textSize, font: fontReg
    });

    // 3. Student Identification Struct
    const startY = height - 180;
    page.drawText(`Student Name: ${studentData.name}`, { x: 50, y: startY, size: textSize, font: fontBold });
    page.drawText(`Roll Number: ${studentData.rollNumber || 'N/A'}`, { x: 400, y: startY, size: textSize, font: fontBold });
    page.drawText(`Class: ${studentData.classGroupId.name} ${studentData.classGroupId.stream}`, { x: 50, y: startY - 20, size: textSize, font: fontReg });
    page.drawText(`Division: ${studentData.divisionId.name}`, { x: 400, y: startY - 20, size: textSize, font: fontReg });

    // 4. Data Matrix Table Draw explicitly bounded mapping
    const tableY = startY - 60;

    // Header Bounds Mapping explicitly
    page.drawRectangle({ x: 50, y: tableY, width: 495, height: 25, color: rgb(0.9, 0.9, 0.9) });
    page.drawText('Subject', { x: 60, y: tableY + 8, size: textSize, font: fontBold });
    page.drawText('Max Marks', { x: 300, y: tableY + 8, size: textSize, font: fontBold });
    page.drawText('Obtained', { x: 400, y: tableY + 8, size: textSize, font: fontBold });
    page.drawText('Grade', { x: 480, y: tableY + 8, size: textSize, font: fontBold });

    let currentY = tableY - 25;

    marksArray.forEach((mark) => {
        const subGrade = calculateGrade(mark.marksObtained / mark.maxMarks * 100);
        page.drawText(mark.subjectId.name, { x: 60, y: currentY + 8, size: textSize, font: fontReg });
        page.drawText(mark.maxMarks.toString(), { x: 300, y: currentY + 8, size: textSize, font: fontReg });
        page.drawText(mark.marksObtained.toString(), { x: 400, y: currentY + 8, size: textSize, font: fontReg });
        page.drawText(subGrade, { x: 480, y: currentY + 8, size: textSize, font: fontReg });

        // Internal Grid border explicitly mapping Native arrays logic
        page.drawLine({ start: { x: 50, y: currentY }, end: { x: 545, y: currentY }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) });
        currentY -= 25;
    });

    // 5. Total Grid Box Aggregation implicitly mapping execution natively!
    const agg = calculateAggregate(marksArray, examData.passingMarks);

    currentY -= 10;
    page.drawRectangle({ x: 50, y: currentY - 15, width: 495, height: 25, color: rgb(0.95, 0.95, 0.95) });
    page.drawText('TOTAL', { x: 60, y: currentY - 5, size: textSize, font: fontBold });
    page.drawText(agg.maxOverall.toString(), { x: 300, y: currentY - 5, size: textSize, font: fontBold });
    page.drawText(agg.totalObtained.toString(), { x: 400, y: currentY - 5, size: textSize, font: fontBold });

    currentY -= 40;
    page.drawText(`Percentage: ${agg.percentage}%`, { x: 60, y: currentY, size: textSize, font: fontBold });
    page.drawText(`Final Grade: ${agg.grade}`, { x: 250, y: currentY, size: textSize, font: fontBold });

    const resultString = agg.isFail ? 'FAIL' : 'PASS';
    const resultColor = agg.isFail ? rgb(0.8, 0, 0) : rgb(0, 0.6, 0);
    page.drawText(`Overall Result: ${resultString}`, { x: 420, y: currentY, size: textSize, font: fontBold, color: resultColor });

    // 6. Footer Disclaimer bounds explicit layout cleanly explicitly
    page.drawText('This is a system generated explicit document strictly bounding execution metrics locally natively.', { x: 50, y: 50, size: 8, font: fontReg, color: rgb(0.5, 0.5, 0.5) });
    page.drawText(`Generated on: ${new Date().toLocaleDateString()}`, { x: 50, y: 40, size: 8, font: fontReg });

    page.drawText('_______________________', { x: 400, y: 60, size: textSize, font: fontReg });
    page.drawText('Principal / Class Teacher', { x: 405, y: 45, size: textSize, font: fontReg });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
};
