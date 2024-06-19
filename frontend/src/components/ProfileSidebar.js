import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'; // Using EmojiObjects as a substitute
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import UserUpdate from './updateData';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function ProfileSidebar() {
  const [userInfo, setUserInfo] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');

    fetch('http://localhost:8080/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setUserInfo(data);
    })
    .catch(error => console.error('Error fetching user info:', error));
  }, []);

  const handleSettingsClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#F4F6F8', // Light Blue-Grey
          color: '#333', // Dark Grey
          marginTop: '80px',
          marginX:'20px',
          height: 'fit-content',
          border: '2px solid #DFE1E6', // Light Grey border
        },
      }}
      anchor="right"
    >
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        {userInfo && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Avatar sx={{ width: 64, height: 64, marginRight: '16px', backgroundColor: '#0077B5', color: '#FFFFFF' }}>{userInfo.fullName.charAt(0)}</Avatar> {/* LinkedIn Blue */}
            <Link to={`/myprofile`}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0077B5' }}>{userInfo.fullName}</div> {/* LinkedIn Blue */}
            </Link>
          </div>
        )}
        <List>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Job" secondary={userInfo?.job} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Education" secondary={userInfo?.educationDegree} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EmojiObjectsIcon /> {/* Using EmojiObjects as a substitute */}
            </ListItemIcon>
            <ListItemText primary="Skills" secondary={userInfo?.skills?.join(', ')} />
          </ListItem>
          <ListItem button onClick={handleSettingsClick}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </div>
      {/* Dialog for settings */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <UserUpdate user={userInfo}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
}

export default ProfileSidebar;
