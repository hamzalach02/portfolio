import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  CircularProgress
} from '@material-ui/core';
import { Language, Phone, Work, Favorite } from '@material-ui/icons'; // Import Material-UI icons
import TopBar from '../../components/TopBar';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import CreatedJobOfferList from '../../components/CreatedJobOffers';
import InterestedJobOfferList from '../../components/interestedJobList';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/user/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]); // Fetch data whenever id changes

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getAvatarLetter = () => {
    return userData ? userData.fullName.charAt(0).toUpperCase() : '';
  };

  const userId = userData?.id;

  return (
    <>
      <TopBar />
      <section style={{ marginTop: '40px' }}>
        <Grid container justify="center" className="py-5">
          <Grid item xs={12} md={10} lg={8}>
            {loading ? (
              <CircularProgress style={{ marginTop: '20px' }} />
            ) : (
              <>
                <Paper elevation={3} className="p-4 mb-4" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px', marginBottom: '20px' }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar style={{ width: '120px', height: '120px', fontSize: '2.5rem', border: '2px solid #0077B5' }}>
                        {getAvatarLetter()}
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '1.8rem', color: '#0077B5' }} variant="h4">{userData ? userData.fullName : ''}</Typography>
                      <Typography variant="body2" color="textSecondary" style={{ fontSize: '1.2rem', color: '#4B4F56' }}>{userData ? userData.email : ''}</Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {userData && (
                  <Paper elevation={3} className="p-4 mb-4" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px', marginBottom: '20px' }}>
                    <List>
                      <ListItem>
                        <ListItemIcon><Language style={{ color: '#0077B5' }} /></ListItemIcon> {/* Add Language icon */}
                        <ListItemText primary={`Website: ${userData.website}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Phone style={{ color: '#0077B5' }} /></ListItemIcon> {/* Add Phone icon */}
                        <ListItemText primary={`Birthdate: ${userData.birthdate}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Work style={{ color: '#0077B5' }} /></ListItemIcon> {/* Add Work icon */}
                        <ListItemText primary={`Job: ${userData.job}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><SchoolIcon style={{ color: '#0077B5' }} /></ListItemIcon> {/* Add SchoolIcon */}
                        <ListItemText primary={`Education Degree: ${userData.educationDegree}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><ComputerIcon style={{ color: '#0077B5' }} /></ListItemIcon> {/* Add ComputerIcon */}
                        <ListItemText primary={`Skills: ${userData.skills.join(', ')}`} />
                      </ListItem>
                    </List>
                  </Paper>
                )}

                <AppBar position="static" color="default" style={{ width: '100%', backgroundColor: '#ffffff', boxShadow: 'none' }}>
                  <Toolbar style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                      <Tab icon={<Work style={{ marginBottom: '0', color: '#0077B5' }} />} label="His Job Offers" style={{ flex: '1', fontSize: '1.2rem', fontWeight: 'bold', color: '#0077B5' }} />
                      <Tab icon={<Favorite style={{ marginBottom: '0', color: '#0077B5' }} />} label="Interested Job Offers" style={{ flex: '1', fontSize: '1.2rem', fontWeight: 'bold', color: '#0077B5' }} />
                    </Tabs>
                  </Toolbar>
                </AppBar>

                {/* Conditionally render component based on the selected tab value */}
                {tabValue === 0 && <CreatedJobOfferList id={userId} />}
                {tabValue === 1 && <InterestedJobOfferList id={userId} />}
              </>
            )}
          </Grid>
        </Grid>
      </section>
    </>
  );
}
