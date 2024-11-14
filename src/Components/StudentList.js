import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, studentData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  // CSV Download Function
  const downloadAsCSV = () => {
    if (!students || students.length === 0) {
      alert("No student data available for download.");
      return;
    }

    // Generate CSV content
    const csvContent = students.map(student => 
      `${student.name},${student.age},${student.grade}`
    ).join('\n');

    const blob = new Blob([`Name,Age,Grade\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = "students.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Student List</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={styles.input}
        />
        <input 
          placeholder="Age" 
          type="number"
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          style={styles.input}
        />
        <input 
          placeholder="Grade" 
          value={grade} 
          onChange={(e) => setGrade(e.target.value)} 
          style={styles.input}
        />
      </div>
      
      <button 
        onClick={saveStudent} 
        style={{
          ...styles.button,
          backgroundColor: editingId ? '#FFA726' : '#4CAF50',
        }}
      >
        {editingId ? "Update Student" : "Add Student"}
      </button>

      <button 
        onClick={downloadAsCSV} 
        style={styles.downloadButton}
      >
        Download CSV
      </button>

      <div style={styles.listContainer}>
        {students.map(student => (
          <div key={student._id} style={styles.card}>
            <div style={styles.cardTitle}>{student.name}</div>
            <div style={styles.cardDetails}>
              Age: {student.age}<br />
              Grade: {student.grade}
            </div>
            <div style={styles.listButtons}>
              <button 
                onClick={() => editStudent(student)} 
                style={styles.editButton}
              >
                Edit
              </button>
              <button 
                onClick={() => deleteStudent(student._id)} 
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// CSS Styles
const styles = {
  container: {
    maxWidth: '700px',
    margin: '30px auto',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f4f7',
    borderRadius: '8px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    display: 'block',
    margin: '12px 0',
    padding: '12px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    padding: '12px 20px',
    margin: '10px 5px 20px 0',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  downloadButton: {
    padding: '12px 20px',
    margin: '10px 5px 20px 0',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#2196F3',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  listContainer: {
    marginTop: '30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    minHeight: '200px',
    transition: 'transform 0.3s ease',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  cardDetails: {
    fontSize: '16px',
    marginBottom: '15px',
  },
  listButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default StudentList;
