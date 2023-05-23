import React, { useRef } from "react";
import { useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import axios from "../../../service/apiService";

import store from "../../../redux/store/store";
import { addUserActions } from "../../../redux/features/addUser/addUserSlice";
import noimg from '../../../assets/images/noimage.png'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
 
export default function ImageSection() {
  const fileInputRef = useRef(null);
  const [picture, setPicture] = useState([]);
  const [preview, setPreview] = useState();
  const User = useSelector((state) => state?.reducer?.User);
  // console.log(User);
  const myImg = process.env.REACT_APP_BASE_URL + User?.profile_picture[0]?.img ;
  // const myImg = process.env.REACT_BASE_URL + user?.profile_picture[0]?.img || noimg;
  // let myImg;
  // if(user?.profile_picture?.length){
  //   console.log("oi beta error ki hoice tor");
  //   myImg = process.env.REACT_BASE_URL + user?.profile_picture[0]?.img;
  // }
  // else{
  //   myImg = noimg;
  // }
   
  // console.log(myImg,process.env.REACT_BASE_URL);
  useEffect(()=>{
      setPreview(myImg) 
  },[myImg])
 
 

  const triggerInputFile = () => {
    fileInputRef.current.click();
  };

  
  useEffect(() => {
    if (picture?.size > 0) {
      const objectUrl = URL.createObjectURL(picture);
      setPreview(objectUrl);
    }
  }, [picture]);

  const uniqueParam = new Date().getTime();

  const UpdateProfileAvatar = async () => {
    toast.success("profile pic uploaded");
    const formData = new FormData();
   
    formData.append("img", picture);
  
    // const loading = toast.loading("Please wait a moment...");
    try {
      const res = await axios.post(`/api/account/profile-picture/`, formData);
      const { status, data } = res;
    console.log(res);
      if (status === 200) {
       
        {
          setPicture([]);setPreview(null)
        };
        // toast.dismiss(loading);
        toast.success(data?.message);
        store.dispatch(addUserActions.addUser(data?.user));
     
      }
    } catch (error) {
      const { status, data } = error?.response;
      
      if (status === 422) {
        // console.log("422 test");
        Object.entries(data?.errors)?.map((error) => toast.error(error[1][0]));
      } else {
        toast.error(data?.error);
      }
      // console.log("error from submit", error);
    }
  };
  console.log(preview);
  return (
    <div className="flex flex-col items-center gap-4 ">
      <div className="rounded-full md:h-52 h-44 w-44 md:w-52  overflow-hidden relative group cursor-pointer">
        <PhotoProvider
          toolbarRender={({ onScale, scale, rotate, onRotate }) => {
            return (
              <>
                <i
                  className="PhotoView-Slider__toolbarIcon fa-solid fa-magnifying-glass-plus"
                  onClick={() => onScale(scale + 1)}
                />
                <i
                  className="PhotoView-Slider__toolbarIcon fa-solid fa-magnifying-glass-minus"
                  onClick={() => onScale(scale - 1)}
                />
                <i
                  className="PhotoView-Slider__toolbarIcon fa-solid fa-rotate-right"
                  onClick={() => onRotate(rotate + 90)}
                />
              </>
            );
          }}
        >
          <PhotoView src={preview || noimg}>
            <img
              placeholder="blur"
              src={preview ? preview || myImg : noimg}
              alt="Logo"
              width={400}
              height={400}
              className="w-full h-full object-cover border-2 border-red-700 rounded-full"
              blurDataURL="/blur.png"
            />
          </PhotoView>
        </PhotoProvider>

        <Button
          onClick={triggerInputFile}
          variant="contained"
          className="bg-black/50 group-hover:flex hover:bg-black/70  lg:hidden  absolute top-2/3 overflow-hidden h-1/3 w-full text-white  flex-col items-center duration-500 justify-center text-sm font-bold"
        >
          <CameraAltIcon />
          <span>Change</span>
        </Button>
      </div>

      <div className="hidden">
        <input
          type="file"
          id="fileInput"
          name="fileInput"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => setPicture(e.currentTarget.files[0])}
        ></input>
      </div>
      <div className="flex items-center gap-4">
        {picture?.size > 0 && (
          <Button
            onClick={(e) => {
              setPicture([]); setPreview(null);
            }}
            variant="contained"
            className="font-display capitalize bg-red-700/30 text-white hover:bg-red-700 lg:text-xl md:text-lg text-base"
          >
            <DoNotDisturbIcon className="pr-2" />
            Cancel
          </Button>
        )}
        {picture?.size > 0 && (
          <Button
            onClick={(e) => UpdateProfileAvatar()}
            variant="contained"
            className="font-display capitalize bg-gray-300 text-white hover:bg-gray-700 lg:text-xl md:text-lg text-base"
          >
            <SaveIcon className="pr-2" />
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
