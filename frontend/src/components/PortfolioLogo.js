import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  logoContainer: {
    display: 'inline-block',
  },
  logoText: {
    fontFamily: 'Arial, sans-serif', // LinkedIn uses a standard sans-serif font
    fontSize: '24px',
    fontWeight: 'bold', // Add bold font weight for emphasis
    color: '#FFFFFF', // White color
    textDecoration: 'none', // Remove underline from the link
    cursor: 'pointer', // Change cursor to pointer on hover
    transition: 'color 0.3s ease', // Smooth color transition on hover
  },
};

const PortfolioLogo = () => {
  return (
    <div style={styles.logoContainer}>
      <Link to="/home" style={styles.logoText}>Portfolio</Link>
    </div>
  );
};

export default PortfolioLogo;
