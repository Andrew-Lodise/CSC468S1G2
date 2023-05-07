import React from 'react';
import LoginCheck from './header/LoginCheck';
import GetPost from './posts/GetPost';
import CreatePost from './posts/CreatePost';

const WhatsHappening = () => {

  document.title = 'CoderCommune - What\'s Happening';

  return (
    <LoginCheck>
    <CreatePost></CreatePost>
    <GetPost></GetPost>
    </LoginCheck>
  );
  }
  
  export default WhatsHappening;