import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserComponent from './UserComponent';
import UserDialog from './userDialog';

function InterestedUsersList({ id }) {
  const [users, setUsers] = useState([]);
  const jwtToken = Cookies.get('jwtToken');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (jwtToken) {
          const response = await axios.post(
            `http://localhost:8080/auth/interestedUsers/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
          setUsers(response.data);
          console.log(users);
        }
       
      } catch (error) {
        console.error('Error fetching user list:', error);
      }

      
    };

    fetchUsers();
  }, [jwtToken, id]); // Include id in the dependency array

  return (
    <div style={{ marginTop: '60px' }}>
      {users.map((user) => (
        <UserDialog
          key={user.id}
          id={user.id}
          fullName={user.fullName}
          job={user.job}
          email={user.email}
        />
      ))}
    </div>
  );
}

export default InterestedUsersList;
