import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>CRUD MVC</h1>
      <div style={styles.linkContainer}>
        <Link to="/students" style={styles.link}>Students</Link>
        <Link to="/faculty" style={styles.link}>Faculty</Link>
        <Link to="/upload" style={styles.link}>Upload</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: '0',
    zIndex: '1000',
  },
  title: {
    color: '#ecf0f1',
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '15px',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
};

export default Navbar;
