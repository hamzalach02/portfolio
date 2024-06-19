import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

function SideBar() {
  const location = useLocation();
  const items = ['Job Offers', 'Users'];

  return (
    <Drawer variant="permanent" sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        borderRight: '1px solid #DFE1E6', // Light Grey
        borderRadius: '10px',
        backgroundColor: '#F4F6F8', // Light Blue-Grey
        marginTop: '80px',
        marginLeft: '20px',
        height: 'fit-content',
      },
    }}>
      <List>
        {items.map((item, index) => (
          <ListItem 
            button 
            key={item} 
            component={Link} 
            to={index === 0 ? '/home' : '/users'} 
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              borderLeft: location.pathname === (index === 0 ? '/home' : '/users') ? '4px solid #0077B5' : 'none', // LinkedIn Blue
              backgroundColor: location.pathname === (index === 0 ? '/home' : '/users') ? 'rgba(0, 119, 181, 0.1)' : 'inherit', // LinkedIn Blue with opacity
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
              paddingLeft: '20px',
              paddingRight: '20px',
              borderRadius: '5px',
              marginBottom: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ minWidth: '40px' }}>
              {index === 0 ? <WorkIcon style={{ color: '#0077B5' }} /> : <PeopleIcon style={{ color: '#0077B5' }} />} {/* LinkedIn Blue */}
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
