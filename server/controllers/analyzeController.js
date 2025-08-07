const OpenAI = require('openai');
const pdfParser = require('../utils/pdfParser');
const fs = require('fs');
const path = require('path');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Analyze CV against job description
const analyzeCVMatch = async (req, res) => {
  try {
    const { cvContent, jdContent } = req.body;

    if (!cvContent || !jdContent) {
      return res.status(400).json({ error: 'CV and Job Description content are required' });
    }

    const prompt = `
    Analyze the following CV against the job description and provide a detailed match analysis:

    CV Content:
    ${cvContent}

    Job Description:
    ${jdContent}

    Please provide:
    1. Overall match percentage (0-100%)
    2. Key strengths that match the job requirements
    3. Areas that need improvement
    4. Missing skills or qualifications
    5. Specific recommendations for improvement
    6. A detailed breakdown of skills match
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert HR analyst specializing in CV and job description matching. Provide detailed, actionable insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const analysis = completion.choices[0].message.content;

    res.json({
      success: true,
      analysis: analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
};

// Get CV insights
const getCVInsights = async (req, res) => {
  try {
    const { cvContent } = req.body;

    if (!cvContent) {
      return res.status(400).json({ error: 'CV content is required' });
    }

    const prompt = `
    Analyze the following CV and provide detailed insights:

    CV Content:
    ${cvContent}

    Please provide:
    1. Key strengths and achievements
    2. Areas for improvement
    3. Skills assessment
    4. Experience level evaluation
    5. Recommendations for enhancement
    6. Professional summary
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert CV analyst. Provide comprehensive insights and actionable recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.7
    });

    const insights = completion.choices[0].message.content;

    res.json({
      success: true,
      insights: insights,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Insights error:', error);
    res.status(500).json({ error: 'Failed to generate insights', details: error.message });
  }
};

// Get job description analysis
const getJDAnalysis = async (req, res) => {
  try {
    const { jdContent } = req.body;

    if (!jdContent) {
      return res.status(400).json({ error: 'Job description content is required' });
    }

    const prompt = `
    Analyze the following job description and provide detailed insights:

    Job Description:
    ${jdContent}

    Please provide:
    1. Key requirements and qualifications
    2. Required skills and technologies
    3. Experience level expectations
    4. Company culture indicators
    5. Growth opportunities
    6. Salary range indicators
    7. Application tips
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert job market analyst. Provide comprehensive job description analysis and insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.7
    });

    const analysis = completion.choices[0].message.content;

    res.json({
      success: true,
      analysis: analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('JD analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze job description', details: error.message });
  }
};

// Generate improvement suggestions
const generateSuggestions = async (req, res) => {
  try {
    const { cvContent, jdContent, analysisType } = req.body;

    if (!cvContent || !jdContent) {
      return res.status(400).json({ error: 'CV and Job Description content are required' });
    }

    let prompt = '';
    switch (analysisType) {
      case 'skills':
        prompt = `
        Based on the CV and Job Description, provide specific suggestions for skill improvement:

        CV Content:
        ${cvContent}

        Job Description:
        ${jdContent}

        Please provide:
        1. Missing skills that should be learned
        2. Learning resources and courses
        3. Skill development timeline
        4. Priority order for skill acquisition
        `;
        break;
      case 'experience':
        prompt = `
        Based on the CV and Job Description, provide suggestions for experience enhancement:

        CV Content:
        ${cvContent}

        Job Description:
        ${jdContent}

        Please provide:
        1. Types of projects to work on
        2. Experience gaps to fill
        3. Volunteer or freelance opportunities
        4. Industry-specific experience needed
        `;
        break;
      default:
        prompt = `
        Based on the CV and Job Description, provide comprehensive improvement suggestions:

        CV Content:
        ${cvContent}

        Job Description:
        ${jdContent}

        Please provide:
        1. Overall improvement strategy
        2. Specific action items
        3. Timeline for improvements
        4. Resources and tools to use
        5. Success metrics
        `;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a career development expert. Provide actionable, specific improvement suggestions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const suggestions = completion.choices[0].message.content;

    res.json({
      success: true,
      suggestions: suggestions,
      analysisType: analysisType,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ error: 'Failed to generate suggestions', details: error.message });
  }
};

module.exports = {
  analyzeCVMatch,
  getCVInsights,
  getJDAnalysis,
  generateSuggestions
}; 