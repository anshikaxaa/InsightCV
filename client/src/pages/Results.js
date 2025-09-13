import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './Results.css';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    // Fetch real analysis results from backend API
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        // Example: Fetch CV Match Analysis result
        const response = await fetch('http://localhost:5000/api/analyze/cv-match', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cvContent: 'Sample CV: Experienced software developer with skills in JavaScript, HTML, CSS, and basic Python.',
            jdContent: 'Sample Job Description for a software engineer role requiring React, Node.js, and Python skills.',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transform the data to match the results array structure
        const dynamicResults = [
          {
            id: 1,
            type: 'CV Match Analysis',
            date: new Date().toISOString().split('T')[0],
            matchPercentage: extractMatchPercentage(data.analysis),
            summary: extractSummary(data.analysis),
            details: data.analysis,
          },
          // You can add other analysis types here similarly
        ];

        setResults(dynamicResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Helper functions to extract match percentage and summary from analysis text
  const extractMatchPercentage = (analysisText) => {
    // Simple regex to find percentage number in the text, fallback to null
    const match = analysisText.match(/(\d{1,3})%/);
    return match ? parseInt(match[1], 10) : null;
  };

  const extractSummary = (analysisText) => {
    // Extract first 100 characters as summary fallback
    return analysisText ? analysisText.substring(0, 100) + '...' : '';
  };

  const handleViewFullReport = (result) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  const handleExportPDF = (result) => {
    const { jsPDF } = require('jspdf');
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(result.type, 10, 20);
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(result.details, 180);
    doc.text(lines, 10, 40);
    doc.save('report.pdf');
  };

  return (
    <div className="results-page">
      <div className="results-container">
        <h1 className="results-title">Analysis Results</h1>
        <p className="results-subtitle">
          View your previous analysis results and insights
        </p>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading results...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>Error loading results: {error}</p>
          </div>
        ) : results.length > 0 ? (
          <div className="results-grid">
            {results.map((result) => (
              <div key={result.id} className="result-card">
                <div className="result-header">
                  <h3>{result.type}</h3>
                  <span className="result-date">{result.date}</span>
                </div>

                {result.matchPercentage && (
                  <div className="match-percentage">
                    <div className="percentage-circle">
                      <span className="percentage">{result.matchPercentage}%</span>
                      <span className="label">Match</span>
                    </div>
                  </div>
                )}

                <div className="result-summary">
                  <h4>Summary</h4>
                  <p>{result.summary}</p>
                </div>

                <div className="result-details">
                  <h4>Details</h4>
                  <ReactMarkdown>{result.details}</ReactMarkdown>
                </div>

                <div className="result-actions">
                  <button className="view-btn" onClick={() => handleViewFullReport(result)}>View Full Report</button>
                  <button className="export-btn" onClick={() => handleExportPDF(result)}>Export PDF</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No Results Yet</h3>
            <p>Start your first analysis to see results here</p>
            <button className="start-analysis-btn">Start Analysis</button>
          </div>
        )}

        {showModal && selectedResult && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h2>{selectedResult.type}</h2>
              <ReactMarkdown>{selectedResult.details}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
