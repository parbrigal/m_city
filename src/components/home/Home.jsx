import React from 'react'
import Featured from '../home/featured/Featured';
import Matches from './matches';
import MeetPlayers from './meetPlayers/MeetPlayers';
import Promotion from './promotion/Promotion';

const Home = () => {
  return (
    <div className='bck_blue'>
      <Featured />
      <Matches />
      <MeetPlayers />
      <Promotion />
    </div>
  )
}

export default Home;
