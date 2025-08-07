import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">InsightCV</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered CV analysis and job matching platform
          </p>
          <p className="hero-description">
            Upload your CV and job descriptions to get intelligent insights, 
            match analysis, and personalized improvement suggestions.
          </p>
          <div className="hero-buttons">
            <Link to="/upload" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/analysis" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Upload CV</h3>
              <p>Upload your resume in PDF or Word format</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Job Matching</h3>
              <p>Compare your CV with job descriptions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>AI Analysis</h3>
              <p>Get detailed insights and recommendations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Choose InsightCV?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-large">🤖</div>
            <h3>AI-Powered Analysis</h3>
            <p>Advanced AI algorithms provide comprehensive CV analysis and job matching insights.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-large">⚡</div>
            <h3>Fast & Accurate</h3>
            <p>Get instant results with high accuracy using state-of-the-art natural language processing.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-large">📈</div>
            <h3>Detailed Insights</h3>
            <p>Receive detailed breakdowns of skills match, improvement areas, and personalized suggestions.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-large">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your data is protected with enterprise-grade security and privacy measures.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to optimize your career?</h2>
        <p>Start your journey with InsightCV today</p>
        <Link to="/upload" className="btn btn-primary btn-large">
          Start Analysis
        </Link>
      </div>
    </div>
  );
};

export default Home; 