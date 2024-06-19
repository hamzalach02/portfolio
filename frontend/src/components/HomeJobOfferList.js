import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import JobOfferCard from './JobOffer';
import Cookies from 'js-cookie';

const HomeJobOfferList = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const jwtToken = Cookies.get('jwtToken');

  useEffect(() => {
    axios.get('http://localhost:8080/auth/allJobs', {
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
  }, [jwtToken]);

  return (
    <Container style={{ marginTop: '80px' }}>
      {jobOffers.map((job) => (
        <JobOfferCard key={job.id} job={job} />
      ))}
    </Container>
  );
};


export default HomeJobOfferList;
