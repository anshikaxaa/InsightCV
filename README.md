# InsightCV - AI-Powered CV Analysis Platform

InsightCV is a modern web application that uses AI to analyze CVs and job descriptions, providing intelligent insights and matching analysis to help job seekers optimize their applications.

## 🚀 Features

- **AI-Powered Analysis**: Advanced CV and job description analysis using OpenAI
- **File Upload Support**: Upload PDF and Word documents
- **Multiple Analysis Types**: CV match analysis, insights, and improvement suggestions
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Real-time Results**: Instant analysis with detailed breakdowns

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Modern CSS with gradients and animations
- Responsive design

### Backend
- Node.js with Express
- OpenAI API integration
- PDF parsing with pdf-parse
- File upload handling with Multer
- CORS enabled for cross-origin requests

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd InsightCV
```

### 2. Install dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3. Environment Setup

Create a `.env` file in the server directory:
```bash
cd server
cp config.env .env
```

Edit the `.env` file and add your OpenAI API key:
```
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
```

### 4. Start the application

#### Start the backend server
```bash
cd server
npm start
```

#### Start the frontend development server
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
InsightCV/
│
├── client/ # React Frontend
│ ├── public/
│ └── src/
│ ├── components/
│ │ ├── Navbar.js
│ │ └── Navbar.css
│ ├── pages/
│ │ ├── Home.js
│ │ ├── Home.css
│ │ ├── Upload.js
│ │ ├── Upload.css
│ │ ├── Analysis.js
│ │ ├── Analysis.css
│ │ ├── Results.js
│ │ └── Results.css
│ ├── App.js
│ └── index.js
│
├── server/ # Node.js + Express Backend
│ ├── controllers/
│ │ ├── analyzeController.js
│ │ └── uploadController.js
│ ├── routes/
│ │ ├── analyzeRoutes.js
│ │ └── uploadRoutes.js
│ ├── utils/
│ │ └── pdfParser.js
│ ├── app.js
│ └── package.json
│
├── README.md
└── .gitignore
```

## 🔧 API Endpoints

### Upload Endpoints
- `POST /api/upload/cv` - Upload CV file
- `POST /api/upload/jd` - Upload job description file
- `GET /api/upload/files` - Get uploaded files list
- `DELETE /api/upload/files/:filename` - Delete uploaded file

### Analysis Endpoints
- `POST /api/analyze/cv-match` - Analyze CV against job description
- `POST /api/analyze/cv-insights` - Get CV insights
- `POST /api/analyze/jd-analysis` - Analyze job description
- `POST /api/analyze/suggestions` - Generate improvement suggestions

## 🎨 Features Overview

### Home Page
- Modern landing page with feature highlights
- Call-to-action buttons
- Responsive design

### Upload Page
- Drag-and-drop file upload
- Support for PDF and Word documents
- File validation and error handling
- Progress indicators

### Analysis Page
- Multiple analysis types
- Real-time text input
- AI-powered insights
- Detailed results display

### Results Page
- Historical analysis results
- Match percentage visualization
- Export functionality
- Responsive card layout

## 🔒 Security Features

- File type validation
- File size limits
- CORS configuration
- Environment variable protection
- Input sanitization

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Serve the build folder
3. Configure API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

## 🔮 Future Enhancements

- User authentication and profiles
- Advanced analytics dashboard
- Integration with job boards
- Resume builder functionality
- Email notifications
- Mobile app development

---

**Note**: Make sure to replace `your_openai_api_key_here` with your actual OpenAI API key in the `.env` file before running the application. 