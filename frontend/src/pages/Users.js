import React from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';

import ProfileSidebar from '../components/ProfileSidebar';
import UserList from '../components/UserList';




function Users() {
  return (
    <div>

      <TopBar />
      <UserList/>
     
      <SideBar />
      <ProfileSidebar/>
    
   
      
    </div>
  );
}

export default Users;
