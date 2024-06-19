import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import JobOfferCard from './JobOffer';
import Cookies from 'js-cookie';

const InterestedJobOfferList = ({id}) => {
  const [jobOffers, setJobOffers] = useState([]);
  const jwtToken = Cookies.get('jwtToken');

  useEffect(() => {
    axios.get(`http://localhost:8080/auth/interestedJobOffers/${id}`, {
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
    <Container>
      {jobOffers.map((job) => (
        <JobOfferCard key={job.id} job={job} />
      ))}
    </Container>
  );
};


export default InterestedJobOfferList;
