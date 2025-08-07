const pdfParse = require('pdf-parse');
const fs = require('fs');

/**
 * Parse PDF file and extract text content
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<string>} - Extracted text content
 */
const parsePDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
};

/**
 * Extract key information from CV text
 * @param {string} text - CV text content
 * @returns {Object} - Extracted information
 */
const extractCVInfo = (text) => {
  const info = {
    name: '',
    email: '',
    phone: '',
    skills: [],
    experience: [],
    education: []
  };

  // Extract email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = text.match(emailRegex);
  if (emails && emails.length > 0) {
    info.email = emails[0];
  }

  // Extract phone number
  const phoneRegex = /(\+?[\d\s\-\(\)]{10,})/g;
  const phones = text.match(phoneRegex);
  if (phones && phones.length > 0) {
    info.phone = phones[0].trim();
  }

  // Extract skills (basic implementation)
  const skillKeywords = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'HTML', 'CSS',
    'TypeScript', 'Angular', 'Vue.js', 'Express.js', 'Django', 'Flask'
  ];

  info.skills = skillKeywords.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );

  return info;
};

/**
 * Extract key information from Job Description text
 * @param {string} text - Job description text content
 * @returns {Object} - Extracted information
 */
const extractJDInfo = (text) => {
  const info = {
    title: '',
    company: '',
    requirements: [],
    responsibilities: [],
    skills: []
  };

  // Extract job title (basic implementation)
  const titleKeywords = ['Software Engineer', 'Developer', 'Manager', 'Analyst', 'Designer'];
  for (const keyword of titleKeywords) {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      info.title = keyword;
      break;
    }
  }

  // Extract required skills
  const skillKeywords = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'HTML', 'CSS',
    'TypeScript', 'Angular', 'Vue.js', 'Express.js', 'Django', 'Flask'
  ];

  info.skills = skillKeywords.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );

  return info;
};

module.exports = {
  parsePDF,
  extractCVInfo,
  extractJDInfo
}; 