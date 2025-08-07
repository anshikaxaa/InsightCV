import React, { useState } from 'react';
import './Analysis.css';

const Analysis = () => {
  const [cvContent, setCvContent] = useState('');
  const [jdContent, setJdContent] = useState('');
  const [analysisType, setAnalysisType] = useState('match');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    if (!cvContent || !jdContent) {
      alert('Please provide both CV and Job Description content');
      return;
    }

    setLoading(true);
    try {
      let endpoint = '';
      let requestBody = {};

      switch (analysisType) {
        case 'match':
          endpoint = '/api/analyze/cv-match';
          requestBody = { cvContent, jdContent };
          break;
        case 'cv-insights':
          endpoint = '/api/analyze/cv-insights';
          requestBody = { cvContent };
          break;
        case 'jd-analysis':
          endpoint = '/api/analyze/jd-analysis';
          requestBody = { jdContent };
          break;
        case 'suggestions':
          endpoint = '/api/analyze/suggestions';
          requestBody = { cvContent, jdContent, analysisType: 'skills' };
          break;
        default:
          endpoint = '/api/analyze/cv-match';
          requestBody = { cvContent, jdContent };
      }

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analysis-page">
      <div className="analysis-container">
        <h1 className="analysis-title">AI Analysis</h1>
        <p className="analysis-subtitle">
          Get intelligent insights about your CV and job matching
        </p>

        <div className="analysis-controls">
          <div className="analysis-type-selector">
            <h3>Analysis Type</h3>
            <div className="type-buttons">
              <button
                className={`type-btn ${analysisType === 'match' ? 'active' : ''}`}
                onClick={() => setAnalysisType('match')}
              >
                CV Match Analysis
              </button>
              <button
                className={`type-btn ${analysisType === 'cv-insights' ? 'active' : ''}`}
                onClick={() => setAnalysisType('cv-insights')}
              >
                CV Insights
              </button>
              <button
                className={`type-btn ${analysisType === 'jd-analysis' ? 'active' : ''}`}
                onClick={() => setAnalysisType('jd-analysis')}
              >
                Job Description Analysis
              </button>
              <button
                className={`type-btn ${analysisType === 'suggestions' ? 'active' : ''}`}
                onClick={() => setAnalysisType('suggestions')}
              >
                Improvement Suggestions
              </button>
            </div>
          </div>
        </div>

        <div className="content-inputs">
          <div className="input-section">
            <h3>📄 CV Content</h3>
            <textarea
              value={cvContent}
              onChange={(e) => setCvContent(e.target.value)}
              placeholder="Paste your CV content here or upload a file..."
              className="content-textarea"
              rows="10"
            />
          </div>

          <div className="input-section">
            <h3>🎯 Job Description</h3>
            <textarea
              value={jdContent}
              onChange={(e) => setJdContent(e.target.value)}
              placeholder="Paste the job description here..."
              className="content-textarea"
              rows="10"
            />
          </div>
        </div>

        <div className="analysis-actions">
          <button
            onClick={handleAnalyze}
            disabled={loading || (!cvContent && !jdContent)}
            className="analyze-btn"
          >
            {loading ? 'Analyzing...' : 'Start Analysis'}
          </button>
        </div>

        {results && (
          <div className="analysis-results">
            <h3>Analysis Results</h3>
            <div className="results-content">
              <pre className="results-text">{results.analysis || results.insights || results.suggestions}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis; 