const DocumentType = require('../models/DocumentType');
const StudentDocument = require('../models/StudentDocument');
const DocumentAuditLog = require('../models/DocumentAuditLog');
const Student = require('../models/Student');

// @desc    Get configured documents specifically for this student
// @route   GET /api/student/documents
// @access  Student
exports.getMyDocuments = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).populate('classGroupId');
        if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

        // Fetch all active document types
        const types = await DocumentType.find({ isActive: true });

        // Fetch all current uploads for this student
        const uploads = await StudentDocument.find({ studentId: req.user.id }).populate('documentTypeId');

        // Logic check: What is required?
        let requiredDocs = [];
        let applicableDocs = [];

        types.forEach(type => {
            let isApplicable = true;

            // Check Class constraint
            // (Assuming string class formatting e.g., student class logic. Here we simplify for demo.)
            if (type.applicableClasses && type.applicableClasses.length > 0) {
                // If student's class string isn't in array, it's not applicable
                // For this sandbox we assume it fits or is left empty to globally apply.
            }

            // Check category constraint (e.g., General vs SC/OBC)
            if (type.applicableCategories && type.applicableCategories.length > 0) {
                if (!type.applicableCategories.includes(student.category || 'General')) {
                    isApplicable = false;
                }
            }

            if (isApplicable) {
                const existingUpload = uploads.find(u => u.documentTypeId._id.toString() === type._id.toString());

                applicableDocs.push({
                    typeId: type._id,
                    name: type.name,
                    category: type.category,
                    description: type.description,
                    isRequired: type.isRequired,
                    status: existingUpload ? existingUpload.status : 'Not Uploaded',
                    uploadDetails: existingUpload ? {
                        id: existingUpload._id,
                        fileUrl: existingUpload.fileUrl,
                        originalFileName: existingUpload.originalFileName,
                        uploadedAt: existingUpload.uploadedAt,
                        rejectionReason: existingUpload.rejectionReason,
                        reuploadReason: existingUpload.reuploadReason
                    } : null
                });
            }
        });

        res.json({
            success: true,
            data: applicableDocs
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Upload or Re-upload a document
// @route   POST /api/student/documents
// @access  Student
exports.uploadDocument = async (req, res) => {
    try {
        // Multer puts file in req.file
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a valid file' });
        }

        const { documentTypeId } = req.body;
        if (!documentTypeId) {
            return res.status(400).json({ success: false, message: 'Document Type ID is required' });
        }

        // Generate virtual URL for served file (we use local disk for this demo)
        const fileUrl = `/uploads/documents/${req.file.filename}`;

        // Check if an existing tracking entry exists
        let doc = await StudentDocument.findOne({ studentId: req.user.id, documentTypeId });

        if (doc) {
            // Append version
            doc.version += 1;
            doc.fileUrl = fileUrl;
            doc.originalFileName = req.file.originalname;
            doc.fileType = req.file.mimetype;
            doc.fileSize = req.file.size;
            doc.status = 'Pending Verification'; // Returns to pending
            doc.uploadedAt = Date.now();
            doc.rejectionReason = null;
            doc.reuploadReason = null;
            await doc.save();
        } else {
            // Create brand new
            doc = await StudentDocument.create({
                studentId: req.user.id,
                documentTypeId,
                fileUrl,
                storageKey: req.file.filename,
                originalFileName: req.file.originalname,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
                status: 'Pending Verification'
            });
        }

        // Audit log
        await DocumentAuditLog.create({
            documentId: doc._id,
            studentId: req.user.id,
            action: 'Uploaded',
            performedBy: req.user.id,
            performedByRole: 'student',
            metadata: { fileName: req.file.originalname, version: doc.version }
        });

        res.status(201).json({ success: true, data: doc });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
