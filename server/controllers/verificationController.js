const DocumentType = require('../models/DocumentType');
const StudentDocument = require('../models/StudentDocument');
const DocumentAuditLog = require('../models/DocumentAuditLog');
const Student = require('../models/Student');

// @desc    Get all active document configuration types
// @route   GET /api/admin/documents/types
// @access  Admin
exports.getDocumentTypes = async (req, res) => {
    try {
        const types = await DocumentType.find({});
        res.json({ success: true, count: types.length, data: types });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Create a new Document Type requirement dynamically
// @route   POST /api/admin/documents/types
// @access  Admin
exports.createDocumentType = async (req, res) => {
    try {
        const docType = await DocumentType.create(req.body);
        res.status(201).json({ success: true, data: docType });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all Student Documents (with filters)
// @route   GET /api/admin/documents/submissions
// @access  Admin or Staff
exports.getAllSubmissions = async (req, res) => {
    try {
        const { status, category } = req.query;
        let query = {};
        if (status) query.status = status;

        let docs = await StudentDocument.find(query)
            .populate('studentId', 'name admissionNumber class division rollNumber category')
            .populate('documentTypeId', 'name category')
            .sort({ uploadedAt: -1 });

        // Filter populated documents if category query exists
        if (category) {
            docs = docs.filter(d => d.documentTypeId && d.documentTypeId.category === category);
        }

        res.json({ success: true, count: docs.length, data: docs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Verify or Reject a Student Document
// @route   PATCH /api/admin/documents/submissions/:id/verify
// @access  Admin or Staff
exports.verifyDocument = async (req, res) => {
    try {
        const { status, rejectionReason, reuploadReason } = req.body;

        const doc = await StudentDocument.findById(req.params.id);
        if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });

        if (status === 'Rejected' || status === 'Re-upload Required') {
            if (!rejectionReason && !reuploadReason) {
                return res.status(400).json({ success: false, message: 'Rejection reason is mandatory.' });
            }
        }

        doc.status = status;
        doc.verifiedAt = Date.now();
        doc.verifiedBy = req.user.id;

        if (status === 'Rejected' || status === 'Re-upload Required') {
            doc.rejectionReason = rejectionReason || null;
            doc.reuploadReason = reuploadReason || null;
        } else {
            doc.rejectionReason = null;
            doc.reuploadReason = null;
        }

        await doc.save();

        // Push to Audit Log
        await DocumentAuditLog.create({
            documentId: doc._id,
            studentId: doc.studentId,
            action: status === 'Verified' ? 'Verified' : 'Rejected',
            performedBy: req.user.id,
            performedByRole: req.user.role, // 'admin' or 'teacher'
            metadata: {
                message: `Status transitioned to ${status}`,
                reason: rejectionReason || reuploadReason
            }
        });

        res.json({ success: true, data: doc });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
