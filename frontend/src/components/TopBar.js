import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PortfolioLogo from './PortfolioLogo'; // Import your PortfolioLogo component here

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#2c3e50', // Custom background color
    boxShadow: 'none', // Remove box shadow
  },
  title: {
    fontFamily: 'Pacifico, cursive', // Custom font
    color: '#ecf0f1', // Custom text color
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center', // Align items vertically in the center
  },
  logoutButton: {
    color: '#e74c3c', // Custom logout button color
  },
}));

function TopBar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from cookies
    Cookies.remove('jwtToken');
    // Perform any additional logout actions (e.g., redirect to login page)
    // window.location.href = '/login'; // Example redirect to login page
    navigate('/');
  };

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {/* Portfolio logo and title */}
          <div className={classes.title}>
            <PortfolioLogo width={32} height={32} /> {/* Adjust width and height as needed */}
           
             
          </div>
          {/* Logout button */}
          <IconButton size="large" color="inherit" onClick={handleLogout} className={classes.logoutButton}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar;
