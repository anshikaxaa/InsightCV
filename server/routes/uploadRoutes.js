const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// Upload CV/Resume file
router.post('/cv', uploadController.uploadCV);

// Upload Job Description file
router.post('/jd', uploadController.uploadJD);

// Get uploaded files list
router.get('/files', uploadController.getUploadedFiles);

// Delete uploaded file
router.delete('/files/:filename', uploadController.deleteFile);

module.exports = router; 