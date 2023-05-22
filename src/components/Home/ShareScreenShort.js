import { Button } from '@mui/material';
import React from 'react';
 
import img1 from '../../assets/images/hero-sub-image-dark.png'
import img2 from '../../assets/images/share.png'

const ShareScreenShort = () => {
    return (
         
              <div className='container-sk'>
            
            <div className='text-center'>
                <h1 className='text-[72px] text-center'>
                    Image.
                    <span className='mx-[4px] text-[#3b82f6]'>
                        Beautified.
                    </span>
                </h1>
                <p className='mt-[32px] text-[#94a3b8] text-[20px] mr-[40px] lg:mb-10 mb-5'>
                        No more boring screenshots! Select what you want, tweak the graphic, and you are good to share. It doesn't get simpler than this.
                    </p>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1'>
                <div>
                   
                    <div className='flex items-center  lg:flex-row 2xl:flex-row  flex-col '>
                    </div>
                    <div className='mt-[88px]'>
                            <img src={img1} className='w-full h-[288px] object-contain' />
                        </div>
                </div>
                <div>
                <div className='mx-[40px] '>
                            <img src={img2} className='w-full h-[515px] object-contain'  />
                        </div>
                </div>
            </div>
        </div>
        
    );
};

export default ShareScreenShort;