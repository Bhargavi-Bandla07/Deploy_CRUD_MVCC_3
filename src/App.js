// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import StudentList from './Components/StudentList';
import FacultyList from './Components/FacultyList';
import FileUpload from './Components/FileUpload'; // Import the FileUpload component
import Footer from './Components/Footer';


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/students" element={<StudentList />} />
          <Route path="/faculty" element={<FacultyList />} />
          <Route path="/upload" element={<FileUpload />} /> {/* Use FileUpload component here */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;