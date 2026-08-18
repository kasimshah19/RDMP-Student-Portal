const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts, drawRoundedRectangle } = require('pdf-lib');

const OUTPUT_DIR = path.join(__dirname, '../../client/public/downloads');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PRIMARY_NAVY = rgb(0.06, 0.09, 0.16); // #0f172a
const ACCENT_BRASS = rgb(0.71, 0.53, 0.0); // #b58800
const LINE_COLOR = rgb(0.4, 0.4, 0.4);

const setupPage = async (pdfDoc) => {
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    return { page, font, fontBold, width: 595.28, height: 841.89 };
};

const drawHeader = (page, font, fontBold, width, height) => {
    page.drawText('Raul Daulatsinhji Multipurpose High School & Jr. College', {
        x: width / 2 - 200, y: height - 50, size: 16, font: fontBold, color: PRIMARY_NAVY
    });
    page.drawText('Dondaicha, Dist. Dhule, Maharashtra | Est. 1929', {
        x: width / 2 - 120, y: height - 70, size: 12, font: font
    });
    page.drawLine({
        start: { x: 50, y: height - 85 },
        end: { x: width - 50, y: height - 85 },
        thickness: 1.5,
        color: PRIMARY_NAVY
    });
    return height - 110;
};

const drawFooter = (page, font, width, pageNum) => {
    page.drawLine({
        start: { x: 50, y: 40 },
        end: { x: width - 50, y: 40 },
        thickness: 1,
        color: LINE_COLOR
    });
    page.drawText('Raul Daulatsinhji Multipurpose High School & Jr. College of Science - Official Document', {
        x: 50, y: 25, size: 8, font: font, color: LINE_COLOR
    });
    page.drawText(`Page ${pageNum}`, {
        x: width - 80, y: 25, size: 8, font: font, color: LINE_COLOR
    });
};

const drawSeal = (page, x, y) => {
    // Outer Navy Ring
    page.drawCircle({ x, y, size: 30, borderColor: PRIMARY_NAVY, borderWidth: 3 });
    // Inner Brass Fill
    page.drawCircle({ x, y, size: 24, color: ACCENT_BRASS });
    // Seal Text
    page.drawText('RDMP', { x: x - 12, y: y + 5, size: 10, color: rgb(1, 1, 1) });
    page.drawText('SEAL', { x: x - 12, y: y - 5, size: 10, color: rgb(1, 1, 1) });
};

const drawCheckbox = (page, x, y, size = 10) => {
    page.drawRectangle({ x, y, width: size, height: size, borderColor: rgb(0, 0, 0), borderWidth: 1 });
};

const drawField = (page, font, label, x, y, lineLength = 200) => {
    page.drawText(label, { x, y, size: 10, font: font });
    page.drawLine({
        start: { x: x + 10 + (label.length * 5), y: y - 2 },
        end: { x: x + 10 + (label.length * 5) + lineLength, y: y - 2 },
        thickness: 1,
        color: LINE_COLOR
    });
};

// 1. Common Admission Form
async function createAdmissionForm() {
    const pdfDoc = await PDFDocument.create();

    // Page 1
    const p1 = await setupPage(pdfDoc);
    let y = drawHeader(p1.page, p1.font, p1.fontBold, p1.width, p1.height);

    p1.page.drawText('COMMON ADMISSION FORM — Academic Year 2026-27', {
        x: p1.width / 2 - 210, y, size: 16, font: p1.fontBold
    });
    p1.page.drawText('For New Enrollments — Class 11th (Junior College)', {
        x: p1.width / 2 - 140, y: y - 20, size: 12, font: p1.font
    });

    y -= 80;
    p1.page.drawText('INSTRUCTIONS:', { x: 50, y, size: 12, font: p1.fontBold });
    const instructions = [
        '1. Please fill the form in BLOCK LETTERS using Black Ink only.',
        '2. Ensure all fields are filled accurately. Incomplete forms may be rejected.',
        '3. Attach self-attested copies of the following documents:',
        '   - Passport Size Photograph',
        '   - Aadhar Card Copy',
        '   - Class 10th Marksheet',
        '   - Birth Certificate',
        '   - Transfer Certificate / School Leaving Certificate',
        '   - Caste Certificate (if applicable)',
        '   - Domicile Certificate (if applicable)',
        '4. Submission Process: Submit in person at the administrative office or upload online via student portal.'
    ];

    y -= 25;
    instructions.forEach(ins => {
        p1.page.drawText(ins, { x: 60, y, size: 11, font: p1.font });
        y -= 20;
    });

    y -= 40;
    drawField(p1.page, p1.fontBold, 'Last Date for Submission: ', 50, y, 150);
    drawFooter(p1.page, p1.font, p1.width, 1);

    // Page 2
    const p2 = await setupPage(pdfDoc);
    y = drawHeader(p2.page, p2.font, p2.fontBold, p2.width, p2.height);

    p2.page.drawText('Section A: Personal & Contact Details', { x: 50, y, size: 14, font: p2.fontBold });

    // Photo box
    p2.page.drawRectangle({ x: p2.width - 150, y: y - 120, width: 90, height: 110, borderColor: LINE_COLOR, borderWidth: 1 });
    p2.page.drawText('Affix Passport', { x: p2.width - 138, y: y - 60, size: 9, font: p2.font });
    p2.page.drawText('Size Photo', { x: p2.width - 130, y: y - 75, size: 9, font: p2.font });

    y -= 40;
    drawField(p2.page, p2.fontBold, 'Full Name (First / Middle / Last):', 50, y, 320);
    y -= 30;
    drawField(p2.page, p2.fontBold, 'Date of Birth (DD/MM/YYYY):', 50, y, 120);
    drawField(p2.page, p2.fontBold, 'Gender:', 340, y, 100);
    y -= 30;
    drawField(p2.page, p2.fontBold, 'Nationality:', 50, y, 120);
    drawField(p2.page, p2.fontBold, 'Religion:', 300, y, 150);

    y -= 30;
    p2.page.drawText('Category:', { x: 50, y, size: 10, font: p2.fontBold });
    drawCheckbox(p2.page, 110, y); p2.page.drawText('General', { x: 125, y, size: 10, font: p2.font });
    drawCheckbox(p2.page, 180, y); p2.page.drawText('OBC', { x: 195, y, size: 10, font: p2.font });
    drawCheckbox(p2.page, 240, y); p2.page.drawText('SC', { x: 255, y, size: 10, font: p2.font });
    drawCheckbox(p2.page, 290, y); p2.page.drawText('ST', { x: 305, y, size: 10, font: p2.font });
    drawCheckbox(p2.page, 340, y); p2.page.drawText('EWS', { x: 355, y, size: 10, font: p2.font });

    y -= 30;
    drawField(p2.page, p2.fontBold, 'Mother Tongue:', 50, y, 120);
    drawField(p2.page, p2.fontBold, 'Blood Group:', 300, y, 100);
    y -= 30;
    drawField(p2.page, p2.fontBold, 'Aadhar Number:', 50, y, 200);

    y -= 40;
    p2.page.drawText('Contact Information', { x: 50, y, size: 12, font: p2.fontBold });
    y -= 30;
    drawField(p2.page, p2.fontBold, 'Correspondence Address:', 50, y, 350);
    y -= 30;
    drawField(p2.page, p2.fontBold, 'Permanent Address:', 50, y, 350);
    y -= 30;
    drawField(p2.page, p2.fontBold, 'City:', 50, y, 100);
    drawField(p2.page, p2.fontBold, 'District:', 230, y, 100);
    drawField(p2.page, p2.fontBold, 'State:', 400, y, 100);
    y -= 30;
    drawField(p2.page, p2.fontBold, 'PIN Code:', 50, y, 100);
    drawField(p2.page, p2.fontBold, 'Contact Number:', 230, y, 100);
    y -= 30;
    drawField(p2.page, p2.fontBold, 'Email Address:', 50, y, 250);

    y -= 40;
    p2.page.drawText('Section B: Admission Preference', { x: 50, y, size: 14, font: p2.fontBold });
    y -= 30;

    p2.page.drawText('Applied Class: ', { x: 50, y, size: 10, font: p2.fontBold });
    drawCheckbox(p2.page, 130, y); p2.page.drawText('11th', { x: 145, y, size: 10, font: p2.font });

    p2.page.drawText('Stream: ', { x: 200, y, size: 10, font: p2.fontBold });
    drawCheckbox(p2.page, 250, y); p2.page.drawText('Science', { x: 265, y, size: 10, font: p2.font });
    drawCheckbox(p2.page, 320, y); p2.page.drawText('Commerce', { x: 335, y, size: 10, font: p2.font });
    drawCheckbox(p2.page, 400, y); p2.page.drawText('Arts', { x: 415, y, size: 10, font: p2.font });

    y -= 30;
    p2.page.drawText('Subject Combination Choices:', { x: 50, y, size: 10, font: p2.fontBold });
    drawCheckbox(p2.page, 220, y); p2.page.drawText('Physics/Chem/Math/Bio', { x: 235, y, size: 10, font: p2.font });
    y -= 20;
    drawCheckbox(p2.page, 220, y); p2.page.drawText('Acc/Econ/O.C./Maths', { x: 235, y, size: 10, font: p2.font });

    drawFooter(p2.page, p2.font, p2.width, 2);

    // Page 3
    const p3 = await setupPage(pdfDoc);
    y = drawHeader(p3.page, p3.font, p3.fontBold, p3.width, p3.height);

    p3.page.drawText('Section C: Parent / Guardian Details', { x: 50, y, size: 14, font: p3.fontBold });
    y -= 40;
    drawField(p3.page, p3.fontBold, "Father's Name:", 50, y, 250);
    y -= 30;
    drawField(p3.page, p3.fontBold, "Occupation:", 50, y, 150);
    drawField(p3.page, p3.fontBold, "Annual Income:", 320, y, 100);
    y -= 30;
    drawField(p3.page, p3.fontBold, "Contact Number:", 50, y, 150);
    y -= 40;

    drawField(p3.page, p3.fontBold, "Mother's Name:", 50, y, 250);
    y -= 30;
    drawField(p3.page, p3.fontBold, "Occupation:", 50, y, 150);
    drawField(p3.page, p3.fontBold, "Contact Number:", 320, y, 100);
    y -= 40;

    drawField(p3.page, p3.fontBold, "Guardian Details (If applicable) - Name:", 50, y, 200);
    y -= 30;
    drawField(p3.page, p3.fontBold, "Relationship:", 50, y, 120);
    drawField(p3.page, p3.fontBold, "Contact:", 300, y, 120);

    y -= 50;
    p3.page.drawText('Section D: Previous Academic Details', { x: 50, y, size: 14, font: p3.fontBold });
    y -= 40;
    drawField(p3.page, p3.fontBold, "Previous School Name:", 50, y, 350);
    y -= 30;

    p3.page.drawText('Board:', { x: 50, y, size: 10, font: p3.fontBold });
    drawCheckbox(p3.page, 100, y); p3.page.drawText('SSC', { x: 115, y, size: 10, font: p3.font });
    drawCheckbox(p3.page, 150, y); p3.page.drawText('CBSE', { x: 165, y, size: 10, font: p3.font });
    drawCheckbox(p3.page, 210, y); p3.page.drawText('ICSE', { x: 225, y, size: 10, font: p3.font });
    drawCheckbox(p3.page, 270, y); p3.page.drawText('Other', { x: 285, y, size: 10, font: p3.font });

    drawField(p3.page, p3.fontBold, "Seat Number:", 340, y, 100);
    y -= 30;
    drawField(p3.page, p3.fontBold, "Year of Passing:", 50, y, 100);

    y -= 40;
    // Marks Table
    p3.page.drawRectangle({ x: 50, y: y - 10, width: 450, height: 25, color: rgb(0.9, 0.9, 0.9) });
    p3.page.drawRectangle({ x: 50, y: y - 160, width: 450, height: 175, borderColor: LINE_COLOR, borderWidth: 1 });

    p3.page.drawText('Subject', { x: 70, y, size: 10, font: p3.fontBold });
    p3.page.drawText('Marks Obtained', { x: 250, y, size: 10, font: p3.fontBold });
    p3.page.drawText('Out Of', { x: 400, y, size: 10, font: p3.fontBold });

    const subjects = ['Marathi / Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'TOTAL / PERCENTAGE'];
    y -= 25;
    subjects.forEach((subj) => {
        p3.page.drawText(subj, { x: 70, y, size: 10, font: p3.font });
        p3.page.drawLine({ start: { x: 50, y: y - 10 }, end: { x: 500, y: y - 10 }, thickness: 1, color: LINE_COLOR });
        y -= 25;
    });

    drawFooter(p3.page, p3.font, p3.width, 3);

    // Page 4
    const p4 = await setupPage(pdfDoc);
    y = drawHeader(p4.page, p4.font, p4.fontBold, p4.width, p4.height);

    p4.page.drawText('Section E: Document Checklist', { x: 50, y, size: 14, font: p4.fontBold });
    y -= 25;
    const docs = [
        'Passport Size Photograph', 'Aadhar Card Copy', 'Class 10th Marksheet',
        'Birth Certificate', 'Transfer Certificate', 'Caste Certificate (if applicable)', 'Domicile Certificate (if applicable)'
    ];
    let col = 1;
    let tempY = y;
    docs.forEach((doc, idx) => {
        const _x = col === 1 ? 50 : 300;
        drawCheckbox(p4.page, _x, tempY);
        p4.page.drawText(doc, { x: _x + 20, y: tempY, size: 10, font: p4.font });
        tempY -= 20;
        if (idx === 3) { col = 2; tempY = y; }
    });
    y -= 100;

    p4.page.drawText('Section F: Declaration', { x: 50, y, size: 14, font: p4.fontBold });
    y -= 25;
    const declText = "I/We hereby declare that the information furnished above is true to the best of my/our knowledge and belief. If any information is found incorrect, the admission will be liable for cancellation.";
    p4.page.drawText(declText, { x: 50, y, size: 10, font: p4.font, maxWidth: p4.width - 100 });

    y -= 60;
    drawField(p4.page, p4.fontBold, "Date:", 50, y, 100);
    drawField(p4.page, p4.fontBold, "Place:", 300, y, 100);
    y -= 60;
    drawField(p4.page, p4.fontBold, "Student Signature:", 50, y, 150);
    drawField(p4.page, p4.fontBold, "Parent/Guardian Signature:", 300, y, 150);

    y -= 80;
    // Office Use Only Grid
    p4.page.drawRectangle({ x: 50, y: y - 180, width: p4.width - 100, height: 180, borderColor: PRIMARY_NAVY, borderWidth: 2 });
    p4.page.drawRectangle({ x: 50, y: y - 25, width: p4.width - 100, height: 25, color: PRIMARY_NAVY });
    p4.page.drawText('FOR OFFICE USE ONLY', { x: 220, y: y - 15, size: 12, font: p4.fontBold, color: rgb(1, 1, 1) });

    y -= 50;
    drawField(p4.page, p4.fontBold, "Application No.:", 70, y, 120);
    drawField(p4.page, p4.fontBold, "Date Received:", 320, y, 120);
    y -= 30;
    drawField(p4.page, p4.fontBold, "Verified By:", 70, y, 120);
    drawField(p4.page, p4.fontBold, "Division Allotted:", 320, y, 120);
    y -= 30;
    drawField(p4.page, p4.fontBold, "Roll No.:", 70, y, 120);

    y -= 30;
    drawField(p4.page, p4.fontBold, "Admission Committee Remarks:", 70, y, 250);

    // SEAL PLACEMENT
    drawSeal(p4.page, 450, y + 20);

    drawFooter(p4.page, p4.font, p4.width, 4);

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(OUTPUT_DIR, 'Common_Admission_Form_2026_27.pdf'), pdfBytes);
}

// 2. Scholarship Application Form
async function createScholarshipForm() {
    const pdfDoc = await PDFDocument.create();

    // Page 1
    const p1 = await setupPage(pdfDoc);
    let y = drawHeader(p1.page, p1.font, p1.fontBold, p1.width, p1.height);

    p1.page.drawText('SCHOLARSHIP APPLICATION FORM', {
        x: p1.width / 2 - 160, y, size: 16, font: p1.fontBold
    });
    p1.page.drawText('Academic Year 2026-27', {
        x: p1.width / 2 - 60, y: y - 20, size: 12, font: p1.font
    });

    y -= 80;
    p1.page.drawText('ELIGIBILITY & CATEGORIES:', { x: 50, y, size: 12, font: p1.fontBold });
    const info = [
        '- Merit-based: Above 85% in previous board examinations.',
        '- Economically Backward Class (EBC): Annual income below State norms.',
        '- SC/ST/OBC Category: Valid certificate required.',
        '- Minority Quota: Valid declaration required.',
        '- Sports Quota: State or National level participation certificate.'
    ];

    y -= 25;
    info.forEach(ins => {
        p1.page.drawText(ins, { x: 60, y, size: 11, font: p1.font });
        y -= 20;
    });

    y -= 40;
    drawField(p1.page, p1.fontBold, 'Last Date for Submission: ', 50, y, 150);
    drawFooter(p1.page, p1.font, p1.width, 1);

    // Page 2
    const p2 = await setupPage(pdfDoc);
    y = drawHeader(p2.page, p2.font, p2.fontBold, p2.width, p2.height);

    p2.page.drawText('Section A: Applicant Details', { x: 50, y, size: 14, font: p2.fontBold });
    y -= 40;
    drawField(p2.page, p2.fontBold, 'Applicant Name:', 50, y, 320);
    y -= 30;
    drawField(p2.page, p2.fontBold, 'Class:', 50, y, 100);
    drawField(p2.page, p2.fontBold, 'Division:', 220, y, 60);
    drawField(p2.page, p2.fontBold, 'Roll No.:', 360, y, 60);
    y -= 30;
    drawField(p2.page, p2.fontBold, 'Admission No.:', 50, y, 120);
    drawField(p2.page, p2.fontBold, 'Contact Number:', 260, y, 150);

    y -= 50;
    p2.page.drawText('Section B: Scholarship Category Applied For', { x: 50, y, size: 14, font: p2.fontBold });
    y -= 30;
    drawCheckbox(p2.page, 50, y); p2.page.drawText('Merit-based', { x: 65, y, size: 10, font: p2.font });
    drawCheckbox(p2.page, 150, y); p2.page.drawText('EBC', { x: 165, y, size: 10, font: p2.font });
    drawCheckbox(p2.page, 210, y); p2.page.drawText('SC/ST/OBC', { x: 225, y, size: 10, font: p2.font });
    drawCheckbox(p2.page, 300, y); p2.page.drawText('Minority', { x: 315, y, size: 10, font: p2.font });
    drawCheckbox(p2.page, 380, y); p2.page.drawText('Sports', { x: 395, y, size: 10, font: p2.font });

    y -= 50;
    p2.page.drawText('Section C: Academic & Family Details', { x: 50, y, size: 14, font: p2.fontBold });
    y -= 40;
    drawField(p2.page, p2.fontBold, 'Previous Class:', 50, y, 100);
    drawField(p2.page, p2.fontBold, 'Percentage Obtained:', 230, y, 80);
    drawField(p2.page, p2.fontBold, 'Attendance %:', 430, y, 50);
    y -= 40;
    drawField(p2.page, p2.fontBold, "Father's/Guardian's Annual Income:", 50, y, 150);
    y -= 30;
    drawField(p2.page, p2.fontBold, "Occupation:", 50, y, 200);
    y -= 30;
    drawField(p2.page, p2.fontBold, "Number of Dependent Family Members:", 50, y, 50);

    drawFooter(p2.page, p2.font, p2.width, 2);

    // Page 3
    const p3 = await setupPage(pdfDoc);
    y = drawHeader(p3.page, p3.font, p3.fontBold, p3.width, p3.height);

    p3.page.drawText('Section D: Bank Account Details', { x: 50, y, size: 14, font: p3.fontBold });
    y -= 40;

    p3.page.drawRectangle({ x: 50, y: y - 100, width: 490, height: 120, borderColor: LINE_COLOR, borderWidth: 1 });
    y -= 10; drawField(p3.page, p3.fontBold, 'Bank Name:', 60, y, 200);
    y -= 30; drawField(p3.page, p3.fontBold, 'Branch:', 60, y, 200);
    y -= 30; drawField(p3.page, p3.fontBold, 'Account Number:', 60, y, 200);
    drawField(p3.page, p3.fontBold, 'IFSC Code:', 340, y, 100);
    y -= 30; drawField(p3.page, p3.fontBold, 'Account Holder Name:', 60, y, 250);

    y -= 60;
    p3.page.drawText('Section E: Document Checklist', { x: 50, y, size: 14, font: p3.fontBold });
    y -= 25;
    const sdocs = [
        'Income Certificate', 'Caste Certificate (if applicable)', 'Previous Year Marksheet Copy',
        'Bank Passbook Copy', 'Aadhar Card Copy'
    ];
    let scol = 1;
    let sY = y;
    sdocs.forEach((doc, idx) => {
        const _x = scol === 1 ? 50 : 300;
        drawCheckbox(p3.page, _x, sY);
        p3.page.drawText(doc, { x: _x + 20, y: sY, size: 10, font: p3.font });
        sY -= 20;
        if (idx === 2) { scol = 2; sY = y; }
    });

    y -= 80;
    p3.page.drawText('Declaration:', { x: 50, y, size: 12, font: p3.fontBold });
    y -= 20;
    p3.page.drawText("I affirm the details provided are accurate and authorize the college to verify them.", { x: 50, y, size: 10, font: p3.font });
    y -= 40;
    drawField(p3.page, p3.fontBold, "Student Signature:", 50, y, 150);
    drawField(p3.page, p3.fontBold, "Parent/Guardian Signature:", 300, y, 130);

    y -= 60;
    // Office Use
    p3.page.drawRectangle({ x: 50, y: y - 110, width: p3.width - 100, height: 110, borderColor: PRIMARY_NAVY, borderWidth: 2 });
    p3.page.drawRectangle({ x: 50, y: y - 25, width: p3.width - 100, height: 25, color: PRIMARY_NAVY });
    p3.page.drawText('FOR OFFICE USE ONLY', { x: 220, y: y - 15, size: 12, font: p3.fontBold, color: rgb(1, 1, 1) });

    y -= 50;
    drawField(p3.page, p3.fontBold, "Verified By:", 60, y, 100);
    drawField(p3.page, p3.fontBold, "Scholarship Committee Recommendation:", 250, y, 100);
    y -= 30;
    drawField(p3.page, p3.fontBold, "Amount Sanctioned: Rs.", 60, y, 100);
    drawField(p3.page, p3.fontBold, "Remarks:", 300, y, 150);

    drawSeal(p3.page, 480, y + 20);

    drawFooter(p3.page, p3.font, p3.width, 3);
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(OUTPUT_DIR, 'Scholarship_Application_Form.pdf'), pdfBytes);
}

// 3. TC Form
async function createTCForm() {
    const pdfDoc = await PDFDocument.create();
    const p1 = await setupPage(pdfDoc);
    let y = drawHeader(p1.page, p1.font, p1.fontBold, p1.width, p1.height);

    p1.page.drawText('TRANSFER CERTIFICATE (TC) REQUEST FORM', {
        x: p1.width / 2 - 180, y, size: 16, font: p1.fontBold
    });

    y -= 60;
    drawField(p1.page, p1.fontBold, 'Student Name:', 50, y, 320);
    y -= 30;
    drawField(p1.page, p1.fontBold, 'Class:', 50, y, 100);
    drawField(p1.page, p1.fontBold, 'Division:', 220, y, 60);
    drawField(p1.page, p1.fontBold, 'Roll No.:', 360, y, 60);
    y -= 30;
    drawField(p1.page, p1.fontBold, 'Admission No.:', 50, y, 120);
    drawField(p1.page, p1.fontBold, 'Date of Admission:', 260, y, 100);
    y -= 30;
    drawField(p1.page, p1.fontBold, "Father's/Guardian's Name:", 50, y, 300);

    y -= 40;
    p1.page.drawText('Reason for TC: ', { x: 50, y, size: 10, font: p1.fontBold });
    drawCheckbox(p1.page, 140, y); p1.page.drawText('Relocation', { x: 155, y, size: 10, font: p1.font });
    drawCheckbox(p1.page, 230, y); p1.page.drawText('Higher Studies Elsewhere', { x: 245, y, size: 10, font: p1.font });
    drawCheckbox(p1.page, 380, y); drawField(p1.page, p1.font, 'Other (specify):', 395, y, 100);

    y -= 40;
    drawField(p1.page, p1.fontBold, 'Last Date of Attendance Required:', 50, y, 150);

    y -= 40;
    p1.page.drawText('Dues Clearance Checklist:', { x: 50, y, size: 10, font: p1.fontBold });
    drawCheckbox(p1.page, 200, y); p1.page.drawText('Tuition Fee', { x: 215, y, size: 10, font: p1.font });
    drawCheckbox(p1.page, 290, y); p1.page.drawText('Library', { x: 305, y, size: 10, font: p1.font });
    drawCheckbox(p1.page, 360, y); p1.page.drawText('Laboratory', { x: 375, y, size: 10, font: p1.font });
    drawCheckbox(p1.page, 450, y); p1.page.drawText('Sports/Other', { x: 465, y, size: 10, font: p1.font });

    y -= 60;
    drawField(p1.page, p1.fontBold, "Student/Parent Signature:", 50, y, 150);
    drawField(p1.page, p1.fontBold, "Class Teacher:", 320, y, 120);
    y -= 60;
    drawField(p1.page, p1.fontBold, "Office Verification:", 50, y, 150);
    drawField(p1.page, p1.fontBold, "Principal's Signature:", 320, y, 150);
    drawSeal(p1.page, 380, y + 25); // Seal beside principal

    y -= 70;
    // Office Use
    p1.page.drawRectangle({ x: 50, y: y - 80, width: p1.width - 100, height: 80, borderColor: PRIMARY_NAVY, borderWidth: 2 });
    p1.page.drawRectangle({ x: 50, y: y - 25, width: p1.width - 100, height: 25, color: PRIMARY_NAVY });
    p1.page.drawText('FOR OFFICE USE ONLY', { x: 220, y: y - 15, size: 12, font: p1.fontBold, color: rgb(1, 1, 1) });

    y -= 50;
    drawField(p1.page, p1.fontBold, "TC Number:", 60, y, 120);
    drawField(p1.page, p1.fontBold, "Date of Issue:", 280, y, 120);

    drawFooter(p1.page, p1.font, p1.width, 1);
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(OUTPUT_DIR, 'Transfer_Certificate_Request_Form.pdf'), pdfBytes);
}

// 4. Academic Calendar
async function createAcademicCalendar() {
    const pdfDoc = await PDFDocument.create();

    const p1 = await setupPage(pdfDoc);
    let y = drawHeader(p1.page, p1.font, p1.fontBold, p1.width, p1.height);

    p1.page.drawText('ACADEMIC CALENDAR 2026-27', {
        x: p1.width / 2 - 120, y, size: 16, font: p1.fontBold
    });

    y -= 60;
    p1.page.drawRectangle({ x: 50, y: y - 25, width: p1.width - 100, height: 25, color: PRIMARY_NAVY });
    p1.page.drawText('TERM 1', { x: p1.width / 2 - 20, y: y - 15, size: 12, font: p1.fontBold, color: rgb(1, 1, 1) });
    y -= 50;

    p1.page.drawText('Term 1 Start/End Dates:', { x: 50, y, size: 10, font: p1.fontBold });
    p1.page.drawText('June 15, 2026 to October 30, 2026', { x: 250, y, size: 10, font: p1.font });
    y -= 30;
    p1.page.drawText('Unit Test 1 Dates:', { x: 50, y, size: 10, font: p1.fontBold });
    p1.page.drawText('August 5 - August 9, 2026', { x: 250, y, size: 10, font: p1.font });
    y -= 30;
    p1.page.drawText('Term 1 Examination Dates:', { x: 50, y, size: 10, font: p1.fontBold });
    p1.page.drawText('October 15 - October 26, 2026', { x: 250, y, size: 10, font: p1.font });
    y -= 30;
    p1.page.drawText('Major Term 1 Holidays:', { x: 50, y, size: 10, font: p1.fontBold });
    p1.page.drawText('Independence Day, Ganesh Chaturthi, Gandhi Jayanti', { x: 250, y, size: 10, font: p1.font });

    drawFooter(p1.page, p1.font, p1.width, 1);

    const p2 = await setupPage(pdfDoc);
    y = drawHeader(p2.page, p2.font, p2.fontBold, p2.width, p2.height);

    y -= 50;
    p2.page.drawRectangle({ x: 50, y: y - 25, width: p2.width - 100, height: 25, color: PRIMARY_NAVY });
    p2.page.drawText('TERM 2', { x: p2.width / 2 - 20, y: y - 15, size: 12, font: p2.fontBold, color: rgb(1, 1, 1) });
    y -= 50;

    p2.page.drawText('Term 2 Start/End Dates:', { x: 50, y, size: 10, font: p2.fontBold });
    p2.page.drawText('November 15, 2026 to April 30, 2027', { x: 250, y, size: 10, font: p2.font });
    y -= 30;
    p2.page.drawText('Unit Test 2 Dates:', { x: 50, y, size: 10, font: p2.fontBold });
    p2.page.drawText('January 10 - January 15, 2027', { x: 250, y, size: 10, font: p2.font });
    y -= 30;
    p2.page.drawText('Final/Annual Examinations:', { x: 50, y, size: 10, font: p2.fontBold });
    p2.page.drawText('March 10 - March 24, 2027', { x: 250, y, size: 10, font: p2.font });
    y -= 30;
    p2.page.drawText('Result Declaration Date:', { x: 50, y, size: 10, font: p2.fontBold });
    p2.page.drawText('April 25, 2027', { x: 250, y, size: 10, font: p2.font });
    y -= 40;

    p2.page.drawText('Key Annual Events', { x: 50, y, size: 12, font: p2.fontBold });
    y -= 25;
    drawField(p2.page, p2.fontBold, "Independence Day Celebration:", 50, y, 100);
    p2.page.drawText('August 15, 2026', { x: 260, y: y + 2, size: 10, font: p2.font });
    y -= 30;
    drawField(p2.page, p2.fontBold, "Republic Day Celebration:", 50, y, 100);
    p2.page.drawText('January 26, 2027', { x: 260, y: y + 2, size: 10, font: p2.font });
    y -= 30;
    drawField(p2.page, p2.fontBold, "Annual Day Function:", 50, y, 100);
    y -= 30;
    drawField(p2.page, p2.fontBold, "Sports Day:", 50, y, 100);

    drawFooter(p2.page, p2.font, p2.width, 2);

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(OUTPUT_DIR, 'Academic_Calendar_2026_27.pdf'), pdfBytes);
}

// 5. Holiday List
async function createHolidayList() {
    const pdfDoc = await PDFDocument.create();
    const p1 = await setupPage(pdfDoc);
    let y = drawHeader(p1.page, p1.font, p1.fontBold, p1.width, p1.height);

    p1.page.drawText('HOLIDAY LIST — 2026', {
        x: p1.width / 2 - 80, y, size: 16, font: p1.fontBold
    });

    y -= 40;
    const holidays = [
        ['1', 'Republic Day', '26th Jan', 'Monday'],
        ['2', 'Maha Shivaratri', '15th Feb', 'Sunday'],
        ['3', 'Holi', '3rd Mar', 'Tuesday'],
        ['4', 'Gudi Padwa', '19th Mar', 'Thursday'],
        ['5', 'Ram Navami', '27th Mar', 'Friday'],
        ['6', 'Eid ul Fitr', '20th Apr', 'Monday'],
        ['7', 'Maharashtra Day', '1st May', 'Friday'],
        ['8', 'Independence Day', '15th Aug', 'Saturday'],
        ['9', 'Ganesh Chaturthi', '14th Sep', 'Monday'],
        ['10', 'Gandhi Jayanti', '2nd Oct', 'Friday'],
        ['11', 'Dussehra', '19th Oct', 'Monday'],
        ['12', 'Diwali', '8th Nov', 'Sunday'],
        ['13', 'Christmas', '25th Dec', 'Friday']
    ];

    // Table Header
    p1.page.drawRectangle({ x: 50, y: y - 10, width: 495, height: 25, color: rgb(0.9, 0.9, 0.9) });
    p1.page.drawText('Sr. No.', { x: 60, y: y, size: 10, font: p1.fontBold });
    p1.page.drawText('Occasion', { x: 120, y: y, size: 10, font: p1.fontBold });
    p1.page.drawText('Date', { x: 320, y: y, size: 10, font: p1.fontBold });
    p1.page.drawText('Day', { x: 440, y: y, size: 10, font: p1.fontBold });

    y -= 25;
    holidays.forEach(h => {
        p1.page.drawText(h[0], { x: 65, y, size: 10, font: p1.font });
        p1.page.drawText(h[1], { x: 120, y, size: 10, font: p1.font });
        p1.page.drawText(h[2], { x: 320, y, size: 10, font: p1.font });
        p1.page.drawText(h[3], { x: 440, y, size: 10, font: p1.font });
        p1.page.drawLine({ start: { x: 50, y: y - 5 }, end: { x: 545, y: y - 5 }, thickness: 1, color: LINE_COLOR });
        y -= 20;
    });

    y -= 30;
    p1.page.drawText('* Note: Dates are placeholders and are subject to the official Maharashtra', { x: 50, y, size: 9, font: p1.font, color: LINE_COLOR });
    y -= 12;
    p1.page.drawText('government holiday notification for the year 2026.', { x: 50, y, size: 9, font: p1.font, color: LINE_COLOR });

    drawFooter(p1.page, p1.font, p1.width, 1);

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(OUTPUT_DIR, 'Holiday_List_2026.pdf'), pdfBytes);
}

