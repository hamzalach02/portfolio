import React from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import CreateJobOffer from '../components/CreateJobOffer';
import HomeJobOfferList from '../components/HomeJobOfferList';
import ProfileSidebar from '../components/ProfileSidebar';




function Home() {
  return (
    <div>

      <TopBar />
      <CreateJobOffer/>
      <HomeJobOfferList/>
     
      <SideBar />
      <ProfileSidebar/>
    
   
      
    </div>
  );
}

export default Home;
