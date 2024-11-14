import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FacultyList() {
  const [facultyList, setFacultyList] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [editingId, setEditingId] = useState(null);

  const FACULTY_API_URL = process.env.REACT_APP_FACULTY_API_URL;

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(FACULTY_API_URL);
      setFacultyList(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const saveFaculty = async () => {
    if (!name || !department || !experience) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const facultyData = { name, department, experience };

      if (editingId) {
        await axios.put(`${FACULTY_API_URL}/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(FACULTY_API_URL, facultyData);
      }

      setName('');
      setDepartment('');
      setExperience('');
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${FACULTY_API_URL}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const editFaculty = (member) => {
    setEditingId(member._id);
    setName(member.name);
    setDepartment(member.department);
    setExperience(member.experience);
  };

  const styles = {
    container: {
      maxWidth: '700px',
      margin: '0 auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f4f7',
      borderRadius: '8px',
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
      fontSize: '16px',
      lineHeight: '1.6',
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
    listContainer: {
      marginTop: '30px',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      borderRadius: '5px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '15px',
    },
    listButtons: {
      display: 'flex',
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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Faculty List</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Experience (years)"
        type="number"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        style={styles.input}
      />
      <button onClick={saveFaculty} style={styles.button}>
        {editingId ? "Update Faculty" : "Add Faculty"}
      </button>

      <div style={styles.listContainer}>
        {facultyList.map((member) => (
          <div key={member._id} style={styles.listItem}>
            <span>
              {member.name} - {member.department} - {member.experience} years
            </span>
            <div style={styles.listButtons}>
              <button
                onClick={() => editFaculty(member)}
                style={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => deleteFaculty(member._id)}
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

export default FacultyList;
