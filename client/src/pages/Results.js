import React, { useState, useEffect } from 'react';
import './Results.css';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading results
    setTimeout(() => {
      setResults([
        {
          id: 1,
          type: 'CV Match Analysis',
          date: '2024-01-15',
          matchPercentage: 85,
          summary: 'Strong match with required skills and experience',
          details: 'Your CV shows excellent alignment with the job requirements...'
        },
        {
          id: 2,
          type: 'CV Insights',
          date: '2024-01-14',
          summary: 'Good overall profile with areas for improvement',
          details: 'Your CV demonstrates strong technical skills...'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

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
        ) : (
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
                  <p>{result.details}</p>
                </div>
                
                <div className="result-actions">
                  <button className="view-btn">View Full Report</button>
                  <button className="export-btn">Export PDF</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No Results Yet</h3>
            <p>Start your first analysis to see results here</p>
            <button className="start-analysis-btn">Start Analysis</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results; 