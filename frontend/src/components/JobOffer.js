import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
} from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(2),
    position: 'relative',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    backgroundColor: "#fff", // White background
    border: '1px solid #e1e1e1', // Light gray border
  },
  avatar: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    backgroundColor: '#0077B5', // LinkedIn Blue
    color: '#FFFFFF', // White text color
    width: theme.spacing(6),
    height: theme.spacing(6),
    fontSize: theme.spacing(3),
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  content: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(10), // Increase padding to accommodate avatar and name
  },
  creatorName: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(10),
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#0077B5', // LinkedIn Blue
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
    whiteSpace: 'pre-line',
  },
  createdAt: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  interestedButton: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: '#0077B5', // LinkedIn Blue
    color: '#FFFFFF', // White text color
    '&:hover': {
      backgroundColor: '#005B8E', // Darker shade of LinkedIn Blue
    },
    '&:active': {
      backgroundColor: '#004471', // Even darker shade of LinkedIn Blue
    },
  },
  notInterestedButton: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: '#E0E0E0', // Light gray
    color: '#333333', // Dark gray text color
    '&:hover': {
      backgroundColor: '#BDBDBD', // Darker shade of gray
    },
    '&:active': {
      backgroundColor: '#9E9E9E', // Even darker shade of gray
    },
  },
}));

const JobOfferCard = ({ job }) => {
  const classes = useStyles();
  const jwtToken = Cookies.get('jwtToken');
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    setIsInterested(job.isInterested);
  }, [job.isInterested]);

  const handleToggleInterest = () => {
    setIsInterested(!isInterested);

    const endpoint = isInterested ? 'http://localhost:8080/auth/removeJobInterested' : 'http://localhost:8080/auth/addJobInterested';
    axios.post(endpoint, {
      jobOfferId: job.id,
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then(response => {
      console.log('Interest action successful:', response.data);
    })
    .catch(error => {
      console.error('Error toggling interest:', error);
    });
  };

  return (
    <Card className={classes.card}>
      <Avatar className={classes.avatar}>
        {job.creatorFullName.charAt(0)}
      </Avatar>
      <CardContent className={classes.content}>
        <Typography component="div" className={classes.creatorName} color="textPrimary">
          {job.creatorFullName}
        </Typography>
        <Typography className={classes.title} variant="h5" component="h2">
          {job.title}
        </Typography>
        <Typography className={classes.description} variant="body2" component="p">
          {job.description}
        </Typography>
        <Button
          className={isInterested ? classes.notInterestedButton : classes.interestedButton}
          onClick={handleToggleInterest}
        >
          {isInterested ? "Not Interested" : "Interested"}
        </Button>
        <Typography className={classes.createdAt} variant="body2" color="textSecondary">
          {new Date(job.createdAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobOfferCard;
