import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
 
 
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
 
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
 import logo2 from '../../assets/images/logo2.png'
import { useCookies } from "react-cookie";
// import store from "../../rtk/store/store";
// import { addUserActions } from "../../rtk/feautes/addUser/addUserSlice";
import axios from "../../service/apiService";
import { Link, useLocation } from "react-router-dom";
import AccountMenu from "./Down/ProfileDropDown";
// import axios from "axios";
// import AccountMenu from "./Down/ProfileDropDown";
 
const handleClick = (id) => {
  const section = document.getElementById(id);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
};


export default function Header() {
   const {pathname} = useLocation()
  const [, , removeCookie] = useCookies(["token"]);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const config = {
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg1MTE1MDk0LCJpYXQiOjE2ODMzODcwOTQsImp0aSI6ImNiYzg4ZmFlODc3ZDQ2OGM4YzdjMGZhY2RjYjczMmY3IiwidXNlcl9pZCI6NDZ9.tT9sOdZqp8LN2-tEjZieUkWnqnub9N9siMQBgmZwlRM' }
};
  useEffect(() => {
    async function GetProfile() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/account/profile-picture/`,config);
        const { status, data } = res;
        console.log("header profile",res)
        // if (status == 200) {
        //   store.dispatch(addUserActions.addUser(res?.data?.data));
        // }
      } catch (error) {
        console.log("error",error)
        // store.dispatch(addUserActions.removeUser());
        // removeCookie("token", { path: "/" });
      }
    }
    GetProfile();
  }, []);

  return (
    <>
      <div className="bg-primary">
        <div className="container-sk py-1 flex justify-between items-center ">
          <div className="flex items-center gap-2">
            { pathname == "/" && (
              <IconButton
                onClick={toggleDrawer}
                className="text-white md:hidden"
                aria-label="upload picture"
                component="label"
              >
                <MenuIcon />
              </IconButton>
            )}

            <Link to="/">
              <Button
                variant="contained"
                className="hover:bg-gray-700 w-40 md:w-48 lg:w-64"
              >
                <img
                  placeholder="blur"
                  src={logo2}
                  alt="Logo"
                  width={200}
                  height={80}
                  blurDataURL="/blur.png"
                  className="object-contain h-full w-full"
                />
              </Button>
            </Link>
          </div>
          { pathname == "/" && (
            <div className="md:flex hidden items-center gap-4 ">
         
                <Button
                  variant="contained"
                  onClick={()=>{handleClick("howitworks")}}
                  className="hover:bg-gray-700 shadow-none  font-display normal-case lg:text-xl md:text-lg text-base w-fit text-white"
                >
                  How it works
                </Button>
                <Button
                 onClick={()=>{handleClick("pricing")}}
                  variant="contained"
                  className="hover:bg-gray-700 shadow-none font-display normal-case lg:text-xl md:text-lg text-base w-fit text-white"
                >
                  Pricing
                </Button>
         
              
                <Button
                  variant="contained"
                  className="hover:bg-gray-700  shadow-none  font-display normal-case lg:text-xl md:text-lg text-base w-fit text-white"
                  onClick={()=>{handleClick("faq")}}
                >
                  FAQ
                </Button>
              
                {/* <Link to="/image/process">     
              <Button
                  variant="contained"
                  className="hover:bg-gray-700  shadow-none  font-display normal-case lg:text-xl md:text-lg text-base w-fit text-white"
                  onClick={()=>{handleClick("faq")}}
                >
                Image
                </Button>
                </Link> */}
          
            </div>
          )}

          <div>
            <AccountMenu/>
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className=""
        lockBackgroundScroll={true}
      >
        <div className="bg-primary h-full flex flex-col gap-3 items-center pt-10">
          <Link to="/">
            <Button
              onClick={toggleDrawer}
              variant="contained"
              className="hover:bg-gray-700 w-40 md:w-48 lg:w-64"
            >
              <img
                placeholder="blur"
                src="/logo2.png"
                alt="Logo"
                width={200}
                height={200}
                blurDataURL="/blur.png"
                className="object-contain h-full w-full"
              />
            </Button>
          </Link>
          <Link to="/" className="pt-10" onClick={toggleDrawer}>
            <Button
              variant="contained"
              className="hover:bg-gray-700 shadow-none  font-display normal-case lg:text-xl md:text-lg text-base w-fit text-white"
            >
              How it works
            </Button>
          </Link>
          <Link to="/" onClick={toggleDrawer}>
            <Button
              variant="contained"
              className="hover:bg-gray-700 shadow-none font-display normal-case lg:text-xl md:text-lg text-base w-fit text-white"
            >
              Pricing
            </Button>
          </Link>
          <Link to="/" onClick={toggleDrawer}>
            <Button
              variant="contained"
              className="hover:bg-gray-700  shadow-none  font-display normal-case lg:text-xl md:text-lg text-base w-fit text-white"
            >
              FAQ
            </Button>
          </Link>
          {/* <Link to="/image/process"  >
            <Button
              variant="contained"
              className="hover:bg-gray-700  shadow-none  font-display normal-case lg:text-xl md:text-lg text-base w-fit text-white"
            >
              Image
            </Button>
          </Link> */}
        </div>
      </Drawer>
    </>
  );
}
