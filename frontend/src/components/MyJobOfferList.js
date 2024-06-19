import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Cookies from 'js-cookie';
import MyJobOfferCard from './myJoboffer';

const JobOfferList = ({ id }) => {
  const [jobOffers, setJobOffers] = useState([]);
  
  useEffect(() => {
    // Fetch job offers data here
    const jwtToken = Cookies.get('jwtToken');
    axios.get(`http://localhost:8080/auth/createdJobOffers/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then(response => {
      setJobOffers(response.data);
    })
    .catch(error => {
      console.error('Error fetching job offers:', error);
    });
  }, [id]); // Include id in the dependency array

  return (
    <Container>
      {jobOffers.map((job) => (
        <MyJobOfferCard key={job.id} job={job} />
      ))}
    </Container>
  );
};

export default JobOfferList;
