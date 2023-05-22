import { Button } from '@mui/material';
import React from 'react';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import img2 from '../../assets/images/share.png'
const ShareImg = () => {
    return (
        <div className='container-sk pb-[150px]'>
              <div className='grid md:grid-cols-2 grid-cols-1 items-center'>
                <div>
                <h1 className='text-[48px] text-semibold'>
                Share your images
                </h1>
                    <p className='mt-[32px] text-[#94a3b8] text-[18px] mr-[40px] mb-[]'>
                    Save your edits to the clipboard, export to your local disk, or upload the images to TinySnap cloud and create instantly shareable links, and post them on your favorite social media website or forums.
                    </p>
                    
                </div>
                <div>
                <div className='mx-[40px] '>
                            <img src={img2} className='w-full  ' height="100%" width="100%"/>
                        </div>
                </div>
            </div>
           
        </div>
    );
};

export default ShareImg;