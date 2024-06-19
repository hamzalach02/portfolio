import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserComponent from './UserComponent';

function UserList() {
  const [users, setUsers] = useState([]);
  const jwtToken = Cookies.get('jwtToken');

  useEffect(() => {
    if (jwtToken) {
      axios.get('http://localhost:8080/auth/users', {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
    }
  }, [jwtToken]);

  return (
    <div style={{ marginTop: '60px' }}>
      
      {users.map(user => (
        <UserComponent
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

export default UserList;
