const mongoose = require('mongoose');
const dotenv = require('dotenv');
const DocumentType = require('./models/DocumentType');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const defaultTypes = [
    {
        name: 'Aadhaar Card',
        category: 'Identity Documents',
        description: 'Upload a clear PDF or image of your Aadhaar Card (Front and Back).',
        isRequired: true,
        verificationRequired: true
    },
    {
        name: 'Student Photograph',
        category: 'Identity Documents',
        description: 'Passport-sized recent photograph with white background.',
        isRequired: true,
        verificationRequired: true,
        allowedFileTypes: ['image/jpeg', 'image/png']
    },
    {
        name: '10th Marksheet',
        category: 'Previous Education Documents',
        description: 'Original scanned copy of your 10th standard marks evaluation.',
        isRequired: true,
        applicableClasses: ['Class 11th - Science', 'Class 11th - Commerce', 'Class 11th - Arts']
    },
    {
        name: 'Class 11th Marksheet',
        category: 'Previous Education Documents',
        description: 'Applicable only for returning senior students natively.',
        isRequired: true,
        applicableClasses: ['Class 12th - Science', 'Class 12th - Commerce', 'Class 12th - Arts']
    },
    {
        name: 'Caste Certificate',
        category: 'Category / Reservation Documents',
        description: 'Mandatory for reserved category admission validation.',
        isRequired: true,
        applicableCategories: ['SC', 'ST', 'OBC', 'NT', 'SBC', 'EWS']
    },
    {
        name: 'Income Certificate',
        category: 'Scholarship / Financial Documents',
        description: 'Upload current financial year income certificate from Tahsildar.',
        isRequired: true, // Only for those who fall under EWS or specific categories natively applying
        applicableCategories: ['EWS']
    },
    {
        name: 'Domicile Certificate',
        category: 'Address / Residence Documents',
        description: 'Required if you are outside current native region boundaries.',
        isRequired: false
    }
];

const seedDocs = async () => {
    try {
        await DocumentType.deleteMany();
        await DocumentType.insertMany(defaultTypes);
        console.log("Document Types seeded successfully!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedDocs();
