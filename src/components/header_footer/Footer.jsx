import React from 'react';
import CityLogo from '../ui/Icons';

 const Footer = () => {
  return (
    <footer className='bck_blue'>
        <div className='footer_logo'>
            <CityLogo width='70px' height='70px' link={false}/>
        </div>
        <div className="footer_disclaimer">
            Manchester City 2018. All Rights Reserved.
        </div>
      
    </footer>
  )
}
     

export default Footer;