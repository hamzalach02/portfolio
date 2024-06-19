import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit';
import {
    Avatar,
  } from '@material-ui/core';
  import Button from '@mui/material/Button';

function UserComponent({ id, fullName, job ,email }) {
  return (
    <MDBContainer style={{ marginTop: '-30px' }}>
      <MDBRow className="justify-content-center">
        <MDBCol md="9" lg="7" xl="5" className="mt-5">
          <MDBCard style={{ borderRadius: '15px' }}>
            <MDBCardBody className="p-4">
              <div className="d-flex text-black">
                <div className="flex-shrink-0">
                <Avatar sx={{ width: 64, height: 64, marginRight: '16px' }}>{fullName.charAt(0)}</Avatar>
                </div>
                <div className="flex-grow-1 ms-3">
                  <MDBCardTitle>{fullName}</MDBCardTitle>
                  <MDBCardText>{job}</MDBCardText>
                  <MDBCardText>{email}</MDBCardText>

                  <Link to={`/userprofile/${id}`}>
                    <Button >See Profile</Button>
                  </Link>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default UserComponent;
