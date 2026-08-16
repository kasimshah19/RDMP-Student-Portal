const Admin = require('../models/Admin');

exports.getAdminDashboard = async (req, res) => {
    res.status(200).json({ success: true, message: 'Admin dashboard placeholder' });
};

exports.getMe = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).select('-password');
        res.status(200).json({ success: true, user: admin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
