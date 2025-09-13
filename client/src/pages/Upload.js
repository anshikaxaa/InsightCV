import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload = () => {
  const navigate = useNavigate();
  const [cvFile, setCvFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleCvUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      setCvFile(file);
      setUploadStatus('CV file selected: ' + file.name);
    } else {
      setUploadStatus('Please select a valid PDF or Word document for CV');
    }
  };

  const handleJdUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      setJdFile(file);
      setUploadStatus('Job Description file selected: ' + file.name);
    } else {
      setUploadStatus('Please select a valid PDF or Word document for Job Description');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);
    setUploadStatus('Uploading files...');

    try {
      let uploadPromises = [];

      // Upload CV file if selected
      if (cvFile) {
        const cvFormData = new FormData();
        cvFormData.append('cv', cvFile);
        
        const cvPromise = fetch('http://localhost:5000/api/upload/cv', {
          method: 'POST',
          body: cvFormData,
        });
        uploadPromises.push(cvPromise);
      }

      // Upload JD file if selected
      if (jdFile) {
        const jdFormData = new FormData();
        jdFormData.append('jd', jdFile);
        
        const jdPromise = fetch('http://localhost:5000/api/upload/jd', {
          method: 'POST',
          body: jdFormData,
        });
        uploadPromises.push(jdPromise);
      }

      // Wait for all uploads to complete
      const responses = await Promise.all(uploadPromises);
      const allSuccessful = responses.every(response => response.ok);

      if (allSuccessful) {
        setUploadStatus('Files uploaded successfully!');
        setCvFile(null);
        setJdFile(null);
        navigate('/results');
      } else {
        setUploadStatus('Some files failed to upload. Please try again.');
      }
    } catch (error) {
      setUploadStatus('Error uploading files: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1 className="upload-title">Upload Your Files</h1>
        <p className="upload-subtitle">
          Upload your CV and job description to get started with the analysis
        </p>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="upload-section">
            <h3>📄 Upload CV/Resume</h3>
            <div className="file-upload-area">
              <input
                type="file"
                id="cv-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleCvUpload}
                className="file-input"
              />
              <label htmlFor="cv-upload" className="file-label">
                {cvFile ? cvFile.name : 'Choose CV file (PDF, DOC, DOCX)'}
              </label>
            </div>
          </div>

          <div className="upload-section">
            <h3>🎯 Upload Job Description</h3>
            <div className="file-upload-area">
              <input
                type="file"
                id="jd-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleJdUpload}
                className="file-input"
              />
              <label htmlFor="jd-upload" className="file-label">
                {jdFile ? jdFile.name : 'Choose Job Description file (PDF, DOC, DOCX)'}
              </label>
            </div>
          </div>

          <div className="upload-status">
            {uploadStatus && (
              <div className={`status-message ${uploading ? 'uploading' : ''}`}>
                {uploadStatus}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="upload-btn"
            disabled={!cvFile || !jdFile || uploading}
          >
            {uploading ? 'Uploading...' : 'Start Analysis'}
          </button>
        </form>

        <div className="upload-info">
          <h3>📋 Supported Formats</h3>
          <ul>
            <li>PDF files (.pdf)</li>
            <li>Microsoft Word (.doc, .docx)</li>
            <li>Maximum file size: 10MB</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload; 