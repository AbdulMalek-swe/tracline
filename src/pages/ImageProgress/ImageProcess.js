import axios from '../../service/apiService';
import React, { useEffect, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { addImageActions } from '../../redux/features/addImage/addImageSlice';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Crops from '../../components/Crops/Crops';


const ImageProcess = () => {
  const img = useSelector((state => state?.reducer?.Image))
  console.log(img);
  let imageUrl;
  const handleDownload = (e) => {
    if (e === 'svg') {
      imageUrl = `http://127.0.0.1:8000${img?.svg}`
    }
    else if (e === 'bg_remove') {
      imageUrl = `http://127.0.0.1:8000${img?.bg_remove}`
    }
    else if (e === 'input') {
      imageUrl = `http://127.0.0.1:8000${img?.input}`
    }
    else if (e === 'sharpe_jpg') {
      imageUrl = `http://127.0.0.1:8000${img?.sharpe_jpg}`
    }
    else if (e === 'sharpe_png') {
      imageUrl = `http://127.0.0.1:8000${img?.sharpe_png}`
    }
    else if (e === 'filter_jpg') {
      imageUrl = `http://127.0.0.1:8000${img?.filter_jpg}`
    }
    else if (e === 'filter_png') {
      imageUrl = `http://127.0.0.1:8000${img?.filter_png}`
    }
    else if (e === 'pdf') {
      imageUrl = `http://127.0.0.1:8000${img?.pdf}`
    }
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  const [cookie, setCookie] = useCookies(["token"]);

  const navigate = useNavigate()
  const token = cookie["token"];
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [navigate, token])



  const downloadImagesAsZip = async (images) => {
    const zip = new JSZip();

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      console.log(image);
      try {
        // Use fetch to get the image data as a blob
        const response = await fetch(image);
        const blob = await response.blob();
        let extname = blob.type.split("/")[1]
        console.log(extname);
        if (extname.includes("+xml")) {
          extname = 'svg';
        }
        // Add the image to the zip file with a unique name
        zip.file(`image_${i}.${extname}`, blob, { binary: true });
      } catch (error) {
        console.error(`Error downloading image ${i}:`, error);
      }
    }

    try {
      // Generate the zip file and save it
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'images.zip');
    } catch (error) {
      console.error('Error generating zip file:', error);
    }
  };

  // const handleDownloadPdf = () => {
  //   const fileUrl = `http://127.0.0.1:8000${img?.pdf}`;
  //   const link = document.createElement('a');
  //   link.href = fileUrl;
  //   link.setAttribute('download', 'filename.pdf');
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };


  return (
    <>
      <div className="relative  lg:py-10 py-5 flex items-center    bg-center bg-cover bg-no-repeat bg-static bg-fixed   w-full">
        <div className="container-sk">
          <div className="   w-full mx-auto     p-6 rounded h-full">
            <div className='flex  items-center'>
             <div  className='transform rotate-180 mr-3'> <ErrorOutlineIcon className=' ' /></div>
              <div>
                What type file should i use
              </div>
            </div>
            <div className="my-2">
              <Stack direction="row" spacing={2} >
                <Button variant="outlined" className="hover:bg-gray-700 capitalize" onClick={() => handleDownload("input")}>Full Logo</Button>
                <Button variant="outlined" className="hover:bg-gray-700 capitalize" onClick={() => handleDownload("svg")}>
                  Icon Only
                </Button>
                <Button variant="outlined" className="hover:bg-gray-700 capitalize" onClick={() => handleDownload("sharpe_png")}>
                  Gray Scale
                </Button>
              </Stack>
            </div>
            <div className='mt-10'>
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
                <div className='w-full' >
                  <img src={`http://127.0.0.1:8000${img?.input} `} alt=""   className='object-contain' />
                </div>
                <div className=' '>

                  <div className='mb-5'>
                    <h1 className='text-[22px]'>Full logo with buffer</h1>
                    <span className='text-[14px]'>(with safe space around the design)</span>
                  </div>
                  <div className='flex flex-wrap  '>
                    <Button variant="outlined" className="text-white hover:bg-gray-700 mx-1 my-1 w-[130px] capitalize" onClick={() => handleDownload("bg_remove")}> <DownloadIcon />bg rm PN</Button>
                    <Button variant="outlined" className="text-white hover:bg-gray-700 mx-1 my-1 w-[130px] capitalize" onClick={() => handleDownload("filter_jpg")}> <DownloadIcon /> jpg</Button>
                    <Button variant="outlined" className="text-white hover:bg-gray-700 mx-1 my-1 w-[130px] capitalize" onClick={() => handleDownload("filter_png")}> <DownloadIcon /> png </Button>
                    <Button variant="outlined" className="text-white hover:bg-gray-700 mx-1 my-1 w-[130px] capitalize" onClick={() => handleDownload("input")}> <DownloadIcon /> Full Logo</Button>
                    <Button variant="outlined" className="text-white hover:bg-gray-700 mx-1 my-1 w-[130px] capitalize" onClick={() => handleDownload("sharpe_jpg")}> <DownloadIcon /> Gray jpg</Button>
                    <Button variant="outlined" className="text-white hover:bg-gray-700 mx-1 my-1 w-[130px] capitalize" onClick={() => handleDownload("sharpe_png")}> <DownloadIcon /> Gray png</Button>
                    <Button variant="outlined" className="text-white hover:bg-gray-700 mx-1 my-1 w-[130px] capitalize" onClick={() => handleDownload("svg")}> <DownloadIcon /> svg</Button>

                    <Button variant="outlined" className="text-white hover:bg-gray-700 mx-1 my-1 w-[130px] capitalize" onClick={() => downloadImagesAsZip([`http://127.0.0.1:8000${img?.svg}`, `http://127.0.0.1:8000${img?.bg_remove}`, `http://127.0.0.1:8000${img?.sharpe_jpg}`, `http://127.0.0.1:8000${img?.sharpe_png}`, `http://127.0.0.1:8000${img?.input}`, `http://127.0.0.1:8000${img?.filter_png}`, `http://127.0.0.1:8000${img?.filter_jpg}`])}> <DownloadIcon /> zip</Button>

                    <Button variant="outlined" className="text-white hover:bg-gray-700 mx-1 my-1 w-[130px] capitalize" onClick={() => handleDownload("pdf")}> <DownloadIcon /> Pdf</Button>

                  </div>
                </div>
                <div>
                  <Crops input={`http://127.0.0.1:8000${img?.input}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Crops input={img.input}/> */}
    </>
  );
};

export default ImageProcess;