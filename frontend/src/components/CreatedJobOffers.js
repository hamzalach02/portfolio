import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import JobOfferCard from './JobOffer';
import Cookies from 'js-cookie';

const CreatedJobOfferList = ({ id }) => {
  const [jobOffers, setJobOffers] = useState([]);
  const jwtToken = Cookies.get('jwtToken');

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/createdJobOffers/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setJobOffers(response.data);
      } catch (error) {
        console.error('Error fetching job offers:', error);
      }
    };

    fetchJobOffers();
  }, [id, jwtToken]);

  return (
    <Container>
      {jobOffers.map((job) => (
        <JobOfferCard key={job.id} job={job} />
      ))}
    </Container>
  );
};

export default CreatedJobOfferList;
