import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import InterestedUsersList from './InterestedUsersList';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: 'relative',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    backgroundColor: '#ffffff',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    width: theme.spacing(6),
    height: theme.spacing(6),
    fontSize: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  content: {
    paddingBottom: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  createdAt: {
    color: theme.palette.text.secondary,
  },
  button: {
    padding: theme.spacing(1, 3),
    borderRadius: theme.spacing(1),
    color: '#ffffff',
  },
  interestedUsersButton: {
    backgroundColor: '#0077B5', // LinkedIn Blue
    '&:hover': {
      backgroundColor: '#005B8E', // Darker shade of LinkedIn Blue
    },
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const MyJobOfferCard = ({ job }) => {
  const classes = useStyles();
  const [showInterestedUsers, setShowInterestedUsers] = useState(false); // State for showing interested users dialog

  const handleShowInterestedUsers = () => {
    setShowInterestedUsers(true);
  };

  const handleCloseInterestedUsers = () => {
    setShowInterestedUsers(false);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar}>
              {job.creatorFullName.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h5" component="h2" className={classes.title}>
              {job.title}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" className={classes.description}>
          {job.description}
        </Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="body2" className={classes.createdAt}>
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={`${classes.button} ${classes.interestedUsersButton}`}
              onClick={handleShowInterestedUsers}
            >
              Interested Users
            </Button>
            <Dialog open={showInterestedUsers} onClose={handleCloseInterestedUsers}>
              <DialogTitle>Interested Users</DialogTitle>
              <DialogContent>
                <InterestedUsersList id={job.id} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseInterestedUsers} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyJobOfferCard;
