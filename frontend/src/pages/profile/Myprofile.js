import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress // Added for loading indicator
} from '@material-ui/core';
import { Language, Phone } from '@material-ui/icons';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import TopBar from '../../components/TopBar';
import UserUpdate from '../../components/updateData';
import Cookies from 'js-cookie';
import MyJobOfferList from '../../components/MyJobOfferList';
import InterestedJobOfferList from '../../components/interestedJobList';
import axios from 'axios';

export default function ProfilePage() {
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(true); // Added for loading indicator

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
      setLoading(false); // Data loaded, set loading to false
    })
    .catch(error => {
      console.error('Error fetching user info:', error);
      setLoading(false); // Error occurred, set loading to false
    });
  }, []);

  const handleSettingsDialogOpen = () => {
    setOpenSettingsDialog(true);
  };

  const handleSettingsDialogClose = () => {
    setOpenSettingsDialog(false);
  };

  const handleChangePasswordDialogOpen = () => {
    setOpenChangePasswordDialog(true);
  };

  const handleChangePasswordDialogClose = () => {
    setOpenChangePasswordDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getAvatarLetter = () => {
    return userInfo ? userInfo.fullName.charAt(0).toUpperCase() : '';
  };

  const handlePasswordChange = () => {
    const jwtToken = Cookies.get('jwtToken');
    const data = {
      prevPassword: currentPassword,
      newPassword: newPassword
    };

    axios.put('http://localhost:8080/auth/updatePassword', data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // Password updated successfully
      console.log(response.data);
      setOpenChangePasswordDialog(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    })
    .catch(error => {
      // Error updating password
      console.error('Error updating password:', error);
    });
  };

  return (
    <>
      <TopBar />
      <section style={{ marginTop: '40px', backgroundColor: '#f3f2ef', padding: '20px' }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            {loading ? ( // Display loading indicator while data is being fetched
              <CircularProgress style={{ marginTop: '20px' }} />
            ) : (
              <>
                <Paper elevation={3} className="p-4 mb-4" style={{ padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar style={{ width: '120px', height: '120px', fontSize: '2.5rem', backgroundColor: '#0077B5' }}>{getAvatarLetter()}</Avatar>
                    </Grid>
                    <Grid item>
                      <Typography style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '1.8rem', color: '#0077B5' }} variant="h4">{userInfo ? userInfo.fullName : ''}</Typography>
                      <Typography variant="body1" color="textSecondary" style={{ fontStyle: 'italic', fontSize: '1.2rem', color: '#4B4F56' }}>{userInfo ? userInfo.email : ''}</Typography>
                      <div style={{ marginTop: '20px' }}>
                        <Button variant="contained" style={{ backgroundColor: '#0077B5', color: '#fff', marginRight: '10px' }} onClick={handleSettingsDialogOpen}>Edit Profile</Button>
                        <Button variant="outlined" style={{ color: '#0077B5', borderColor: '#0077B5' }} onClick={handleChangePasswordDialogOpen}>Change Password</Button>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper elevation={3} className="p-4 mb-4" style={{ padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <List>
                    <ListItem>
                      <ListItemIcon><Language style={{ color: '#0077B5' }} /></ListItemIcon>
                      <ListItemText primary={`Website: ${userInfo ? userInfo.website : ''}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Phone style={{ color: '#0077B5' }} /></ListItemIcon>
                      <ListItemText primary={`Birthdate: ${userInfo ? userInfo.birthdate : ''}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><WorkIcon style={{ color: '#0077B5' }} /></ListItemIcon>
                      <ListItemText primary={`Job: ${userInfo ? userInfo.job : ''}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><SchoolIcon style={{ color: '#0077B5' }} /></ListItemIcon>
                      <ListItemText primary={`Education: ${userInfo ? userInfo.educationDegree : ''}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><ComputerIcon style={{ color: '#0077B5' }} /></ListItemIcon>
                      <ListItemText primary={`Skills: ${userInfo ? userInfo.skills.join(', ') : ''}`} />
                    </ListItem>
                  </List>
                </Paper>

                <AppBar position="static" color="default" style={{ width: '100%', backgroundColor: '#fff', boxShadow: 'none', marginTop: '20px' }}>
                  <Toolbar style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                      TabIndicatorProps={{ style: { display: 'none' } }}
                      style={{ minHeight: '48px', backgroundColor: '#fff' }}
                    >
                      <Tab
                        icon={<WorkIcon style={{ marginBottom: '0', color: '#0077B5' }} />}
                        label="My Job Offers"
                        style={{
                          flex: '1',
                          fontSize: '1.2rem',
                          fontWeight: tabValue === 0 ? 'bold' : 'normal',
                          textTransform: 'none',
                          color: tabValue === 0 ? '#0077B5' : '#4B4F56',
                          transition: 'color 0.3s ease',
                          minHeight: '48px',
                          padding: '12px 16px',
                          position: 'relative', // Add position relative
                          overflow: 'hidden', // Hide overflow for the animation
                          borderBottom: tabValue === 0 ? '2px solid #0077B5' : 'none', // Add bottom border
                          zIndex: 1, // Ensure tabs are above the bar
                        }}
                      />
                      <Tab
                        icon={<FavoriteIcon style={{ marginBottom: '0', color: '#0077B5' }} />}
                        label="Interested Job Offers"
                        style={{
                          flex: '1',
                          fontSize: '1.2rem',
                          fontWeight: tabValue === 1 ? 'bold' : 'normal',
                          textTransform: 'none',
                          color: tabValue === 1 ? '#0077B5' : '#4B4F56',
                          transition: 'color 0.3s ease',
                          minHeight: '48px',
                          padding: '12px 16px',
                          position: 'relative', // Add position relative
                          overflow: 'hidden', // Hide overflow for the animation
                          borderBottom: tabValue === 1 ? '2px solid #0077B5' : 'none', // Add bottom border
                          zIndex: 1, // Ensure tabs are above the bar
                        }}
                      />
                      {/* Animated bar */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          height: '2px',
                          backgroundColor: '#0077B5', // Color of the animated bar
                          left: tabValue === 0 ? '0%' : '50%', // Initial position based on active tab
                          width: '50%', // Initial width based on active tab
                          transition: 'left 0.3s ease, width 0.3s ease', // Smooth transition
                          zIndex: 0, // Ensure below the tabs
                        }}
                      />
                    </Tabs>
                  </Toolbar>
                </AppBar>
                <div style={{ padding: '16px' }}>
                  {tabValue === 0 && userInfo && (
                    <Paper elevation={3} className="p-4 mb-4" style={{ backgroundColor: '#fff', padding: '20px' }}>
                      <MyJobOfferList id={userInfo.id} />
                    </Paper>
                  )}
                  {tabValue === 1 && userInfo && (
                    <Paper elevation={3} className="p-4 mb-4" style={{ backgroundColor: '#fff', padding: '20px' }}>
                      <InterestedJobOfferList id={userInfo.id} />
                    </Paper>
                  )}
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </section>

      {/* Settings Dialog */}
      <Dialog open={openSettingsDialog} onClose={handleSettingsDialogClose}>
        <DialogTitle style={{ backgroundColor: '#0077B5', color: '#fff' }}>Settings</DialogTitle>
        <DialogContent>
          {/* Content of settings dialog */}
          <Typography>
            <UserUpdate user={userInfo} />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={openChangePasswordDialog} onClose={handleChangePasswordDialogClose}>
        <DialogTitle style={{ backgroundColor: '#0077B5', color: '#fff' }}>Change Password</DialogTitle>
        <DialogContent>
          {/* Content of change password dialog */}
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePasswordDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePasswordChange} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

