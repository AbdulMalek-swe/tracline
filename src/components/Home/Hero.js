import { Button } from '@mui/material'
import React, { useState } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import axios from '../../service/apiService';


 
import store from '../../redux/store/store';
import { addImageActions } from '../../redux/features/addImage/addImageSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Hero() {
  const [upImg, setUpImg] = useState();
  const [cookie] = useCookies("token");
  let token = cookie["token"];
  const navigate = useNavigate()
  const [img,setImg] = useState({})
  const user = useSelector(state=>state?.reducer?.User)
  console.log(user);
  const handleImage = e => {
  //  console.log(e.target.files);
  const getImageExtension = (filename) => {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  };
  
  const imageName = e.target.files[0].name;
  const imageExtension = getImageExtension(imageName);
  console.log(imageExtension);
   const formadata = new FormData()
    // console.log(e.target.files[0].name);
    // formadata.append("input", e.target.files[0])
  // if(imageExtension==='pdf'){
  //   formadata.append("input", e.target.files[0])
  //   axios.post("/api/app/pdf-proccess/", formadata)
  //       .then(res => {
  //         console.log(res, "thisis werowert");
  //         if(res.status===200){
  //           console.log(res);
  //         // setImg(res?.data?.data)
  //         // store.dispatch(addImageActions.addImage(res?.data?.data))
  //         // navigate("/image/process")
  //         }
  //       })
  //       return;
  //   }
    // else {
    //   navigate("/login")
    // }
  
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
    // const formadata = new FormData()
    console.log(e.target.files[0]);
    formadata.append("input", e.target.files[0])
    if (token) {
      axios.post("/api/app/image-proccess/", formadata)
        .then(res => {
          console.log(res, "thisis werowert");
          if(res.status===200){
            toast.success("Photo Upload Succefully");
          setImg(res?.data?.data)
          store.dispatch(addImageActions.addImage(res?.data?.data))
          navigate("/image/process")
          }
        })
    }
    else {
      navigate("/login")
    }
  }



  return (
    <section className="  ">
      <div className="container-sk lg:py-40 md:py-20 py-10">
        <div className='flex justify-center '>
          <h1 className='font-display w-full lg:text-5xl md:text-4xl text-2xl text-center '>Take your photo to the next level.</h1>
        </div>
        <p className='pt-4 font-display w-full lg:text-3xl md:text-2xl text-xl text-center'>Upload your photo below</p>
        <div className='flex justify-center'>
          {user.is_subscribed &&  <Button
            variant="contained"
            component="label"
            className='font-display lg:text-3xl text-2xl bg-primary hover:bg-primary2 text-white mt-5 capitalize'
          >
            <PhotoCameraIcon className='mr-3 lg:text-3xl text-2xl' /> Upload Now
            <input
              type="file"
              hidden
              onChange={handleImage}
            />
          </Button>
          }
          { !user.email?  <Button
            variant="contained"
            component="label"
            className='font-display lg:text-3xl text-2xl bg-primary hover:bg-primary2 text-white mt-5 capitalize'
            onClick={() => navigate("/login")}
          >
            <PhotoCameraIcon className='mr-3 lg:text-3xl text-2xl' /> Upload Now
            <input
              hidden
            />
          </Button>:!user.is_subscribed?<Button
            variant="contained"
            component="label"
            className='font-display lg:text-3xl text-2xl bg-primary hover:bg-primary2 text-white mt-5 capitalize'
            onClick={() => navigate("/user/myprofile")}
          >
            <PhotoCameraIcon className='mr-3 lg:text-3xl text-2xl' /> Upload Now
            <input
              hidden
            />
          </Button>:""
        
        }

        </div>
        {/* <Crops upImg={upImg} /> */}
         {/* <img src={imageUrl} alt='loading...'/> */}
         
         {/* <button onClick={handleDownload}>Download Image</button> */}
      </div>

    </section>
  )
}
