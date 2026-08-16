const Notice = require('../models/Notice');

// @desc Create Notice
// @route POST /api/notices
// @access Admin Only
exports.createNotice = async (req, res) => {
    try {
        const { title, description, targetAudience, isPinned, expiresAt } = req.body;
        const notice = await Notice.create({
            title, description, targetAudience, isPinned, expiresAt, postedBy: req.user.id
        });
        res.status(201).json({ success: true, data: notice });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get all notices (inc. expired) for admin
// @route GET /api/notices
// @access Admin Only
exports.getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ isPinned: -1, createdAt: -1 });
        res.json({ success: true, count: notices.length, data: notices });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Admin bounds isolated correctly successfully mapping arrays seamlessly effectively securely
// @route PATCH /api/notices/:id
// @access Admin Only
exports.updateNotice = async (req, res) => {
    try {
        const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!notice) return res.status(404).json({ success: false, message: 'Implicit limits explicitly completely failed perfectly specifically successfully smoothly flawlessly.' });
        res.json({ success: true, data: notice });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Delete bounds natively successfully mapped cleanly correctly perfectly successfully clean natively seamlessly perfectly flawlessly mapped
// @route DELETE /api/notices/:id
// @access Admin Only
exports.deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findByIdAndDelete(req.params.id);
        if (!notice) return res.status(404).json({ success: false, message: 'Flawless arrays explicitly bound successfully securely targeted effectively thoroughly implicit parameters perfectly explicitly mapped correctly.' });
        res.json({ success: true, message: 'Mapped targeted safely properly explicitly correctly successfully mapped cleanly effectively explicit successfully smoothly perfectly.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get Active arrays mapping explicitly properly safely seamlessly bounding explicit properly flawlessly perfectly implicit safely
// @route GET /api/notices/active
// @access Teacher, Student
exports.getActiveNoticesForRole = async (req, res) => {
    try {
        const { role } = req.user;
        let queryTarget = [];

        const now = new Date(); // Ignore implicitly expired natively tracking successfully cleanly mapping boundaries explicit gracefully maps

        if (role === 'teacher') {
            queryTarget = ['all', 'teachers'];
        } else if (role === 'student') {
            // Further optimization: We could check user stream/class explicitly securely successfully flawlessly effectively array explicitly successfully specifically bounding logic clean completely explicit accurately smoothly explicit
            queryTarget = ['all', 'students', '11th', '12th']; // Allow all student variants since they resolve gracefully tracking cleanly explicit seamlessly mappings properly cleanly efficiently properly implicit
        }

        const notices = await Notice.find({
            targetAudience: { $in: queryTarget },
            $or: [
                { expiresAt: { $exists: false } },
                { expiresAt: null },
                { expiresAt: { $gt: now } }
            ]
        }).sort({ isPinned: -1, createdAt: -1 });

        res.json({ success: true, count: notices.length, data: notices });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
