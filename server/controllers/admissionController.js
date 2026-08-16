const Admission = require('../models/Admission');
const Document = require('../models/Document');
const Student = require('../models/Student');
const crypto = require('crypto');

// Helpers for application ID generation
const generateApplicationId = async () => {
    const currentYear = new Date().getFullYear();
    const count = await Admission.countDocuments();
    const sequence = (count + 1).toString().padStart(4, '0');
    return `RDMP${currentYear}-${sequence}`;
};

// @desc Submit general admission form
// @route POST /api/admission/apply
// @access Public
exports.submitAdmission = async (req, res) => {
    try {
        const { fullName, dob, gender, email, phone, address, appliedClass, previousSchool, previousPercentage, previousBoard } = req.body;

        // Validate required inputs here (basic check)
        if (!fullName || !email || !appliedClass) {
            return res.status(400).json({ success: false, message: 'Please provide all mandatory fields' });
        }

        const applicationId = await generateApplicationId();

        const admission = await Admission.create({
            applicationId,
            fullName, dob, gender, email, phone, address,
            appliedClass, previousSchool, previousPercentage, previousBoard
        });

        res.status(201).json({ success: true, applicationId: admission.applicationId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Upload a document
// @route POST /api/admission/:applicationId/documents
// @access Public
exports.uploadDocument = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { documentType } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded or invalid format' });
        }

        const admission = await Admission.findOne({ applicationId });
        if (!admission) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        const doc = await Document.create({
            admissionId: admission._id,
            documentType,
            fileUrl: `/uploads/documents/${req.file.filename}`, // internal path mapping
            fileName: req.file.filename
        });

        // Add document to admission and update status
        admission.documents.push(doc._id);
        if (admission.status === 'pending') {
            admission.status = 'documents_pending';
        }
        await admission.save();

        res.status(201).json({ success: true, document: doc });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Check Application Status Tracker
// @route GET /api/admission/status/:applicationId
// @access Public
exports.getApplicationStatus = async (req, res) => {
    try {
        const admission = await Admission.findOne({ applicationId: req.params.applicationId })
            .populate('documents', 'documentType verified rejectionReason');

        if (!admission) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        res.json({
            success: true,
            data: {
                applicationId: admission.applicationId,
                fullName: admission.fullName,
                status: admission.status,
                remarks: admission.remarks,
                documents: admission.documents
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get all applications
// @route GET /api/admission/all
// @access Admin Only
exports.getAllAdmissions = async (req, res) => {
    try {
        const { status, appliedClass } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (appliedClass) filter.appliedClass = appliedClass;

        const admissions = await Admission.find(filter).sort('-appliedAt').populate('documents');
        res.json({ success: true, count: admissions.length, data: admissions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get admission by ID deeply populated
// @route GET /api/admission/:id
// @access Admin Only
exports.getAdmissionById = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id).populate('documents');
        if (!admission) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }
        res.json({ success: true, data: admission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Verify a specific document
// @route PATCH /api/admission/:id/verify-document/:docId
// @access Admin Only
exports.verifyDocument = async (req, res) => {
    try {
        const { verifyAction, rejectionReason } = req.body;
        // verifyAction: true = verify, false = reject

        const doc = await Document.findById(req.params.docId);
        if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });

        doc.verified = verifyAction;
        doc.verifiedBy = req.user.id;
        doc.verifiedAt = Date.now();
        doc.rejectionReason = verifyAction ? null : rejectionReason;

        await doc.save();

        res.json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Approve admission
// @route PATCH /api/admission/:id/approve
// @access Admin Only
exports.approveAdmission = async (req, res) => {
    try {
        const { classGroupId, divisionId } = req.body;

        if (!classGroupId || !divisionId) {
            return res.status(400).json({ success: false, message: 'Class and Division selection overrides are required for Approval.' });
        }

        const admission = await Admission.findById(req.params.id).populate('documents');
        if (!admission) return res.status(404).json({ success: false, message: 'Not found' });

        // Check if mandatory documents exist and are verified
        const requiredDocs = ['photo', 'aadhar'];
        const uploadedDocs = admission.documents;

        for (let reqDoc of requiredDocs) {
            const found = uploadedDocs.find(d => d.documentType === reqDoc);
            if (!found || !found.verified) {
                return res.status(400).json({ success: false, message: `Missing or unverified required document: ${reqDoc}` });
            }
        }

        admission.status = 'approved';
        admission.appliedDivision = 'assigned'; // Softly fallback mapping

        // Validate if student email exists
        const emailExists = await Student.findOne({ email: admission.email });
        if (emailExists) {
            return res.status(400).json({ success: false, message: 'A student account with this email already exists' });
        }

        // Assign roll numbers generating
        const countInDiv = await Student.countDocuments({ divisionId });
        const rollNumberStr = `${countInDiv + 1}`;

        // Auto Generate Student Account
        const tempPassword = crypto.randomBytes(4).toString('hex'); // 8 char string

        const newStudent = await Student.create({
            name: admission.fullName,
            email: admission.email,
            password: tempPassword,
            phone: admission.phone,
            dob: admission.dob,
            gender: admission.gender,
            address: admission.address,
            classGroupId,
            divisionId,
            rollNumber: rollNumberStr,
            admissionStatus: 'approved',
            role: 'student'
        });

        admission.linkedStudentId = newStudent._id;
        await admission.save();

        res.json({
            success: true,
            message: 'Admission approved and student created.',
            credentials: {
                email: newStudent.email,
                password: tempPassword
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Reject admission
// @route PATCH /api/admission/:id/reject
// @access Admin Only
exports.rejectAdmission = async (req, res) => {
    try {
        const { remarks } = req.body;
        if (!remarks) return res.status(400).json({ success: false, message: 'Rejection remarks are required' });

        const admission = await Admission.findById(req.params.id);
        if (!admission) return res.status(404).json({ success: false, message: 'Not found' });

        admission.status = 'rejected';
        admission.remarks = remarks;
        await admission.save();

        res.json({ success: true, data: admission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
