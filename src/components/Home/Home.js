import React from 'react';
import Hero from './Hero';
import VerticalLinearStepper from './HowitWorks';
 
import Pricing from './Pricing';
import Faq from './Faq';
import ShareImg from './ShareImg';
import ShareScreenShort from './ShareScreenShort';
import Customize from './Customize';
 
const Home = () => {
    window.scrollTo(0,0)
    return (
      
        <div className="  bg-center bg-cover bg-no-repeat bg-static bg-fixed" >

            {/* <Crops/> */}
        <Hero/>
        <ShareScreenShort/>
       
     <VerticalLinearStepper/>
     {/* <Customize/> */}
     {/* <ShareImg/> */}
     <Pricing/>
     <Faq/>
        </div>
         
    );
};

export default Home;