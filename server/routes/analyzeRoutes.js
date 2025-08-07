const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyzeController');

// Analyze CV against job description
router.post('/cv-match', analyzeController.analyzeCVMatch);

// Get CV analysis insights
router.post('/cv-insights', analyzeController.getCVInsights);

// Get job description analysis
router.post('/jd-analysis', analyzeController.getJDAnalysis);

// Generate improvement suggestions
router.post('/suggestions', analyzeController.generateSuggestions);

module.exports = router; 