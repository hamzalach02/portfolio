import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const styles = {
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '12px',
  },
  userInfo: {
    marginLeft: '20px',
  },
  dialogContent: {
    paddingBottom: '0',
  },
  dialogActions: {
    justifyContent: 'space-between',
  },
};

function UserDialog({ id, fullName, job, email }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={styles.userContainer} onClick={handleClickOpen}>
        <Avatar>{fullName.charAt(0)}</Avatar>
        <div style={styles.userInfo}>
          <Typography variant="h6">{fullName}</Typography>
          <Typography>{job}</Typography>
          <Typography>{email}</Typography>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{fullName}</DialogTitle>
        <DialogContent style={styles.dialogContent}>
          <Typography variant="subtitle1">Job: {job}</Typography>
          <Typography variant="subtitle1">Email: {email}</Typography>
        </DialogContent>
        <DialogActions style={styles.dialogActions}>
          <Link to={`/userprofile/${id}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" onClick={handleClose}>
              See Profile
            </Button>
          </Link>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserDialog;
