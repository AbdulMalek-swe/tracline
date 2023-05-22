import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
 
import RedeemIcon from "@mui/icons-material/Redeem";
import LogoutIcon from "@mui/icons-material/Logout";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import acount from '../../../assets/images/noimage.png'
 
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
 
import { Link, useNavigate } from "react-router-dom";
import { Store } from "@mui/icons-material";
import store from "../../../redux/store/store";
import { addUserActions } from "../../../redux/features/addUser/addUserSlice";
import { useSelector } from "react-redux";
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cookies] = useCookies(["token"]);
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutFunction = () => {
          toast.success("Logged out successfully.");
          store.dispatch(addUserActions.removeUser());
          removeCookie("token", { path: "/" });
          navigate("/")
    
  };
  const user = useSelector(state=>state?.reducer?.User)
  const myImg = "http://127.0.0.1:8000" + user?.profile_picture[0]?.img;
  return (
    <>
      <IconButton
        variant="text"
        className="text-primary w-fit h-fit"
        onClick={handleClick}
      >
        {user?.profile_picture[0]?.img && <img
          src={myImg}
          width={40}
          height={40}
          alt="profile"
          className="object-cover h-9 w-9 rounded-full"
        />}
         {!user?.profile_picture[0]?.img && <img
          src={acount}
          width={40}
          height={40}
          alt="profile"
          className="object-cover h-9 w-9 rounded-full"
        />}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {cookies?.token ? (
          <div>
            <Link to="/user/myprofile"  className="text-black">
              <MenuItem
                onClick={handleClose}
                className="text-md font-sans  hover:bg-primary hover:text-white duration-300 "
              >
                <div className="flex items-center gap-4 ">
                  <PersonIcon className="text-md   " /> My Profile
                </div>
              </MenuItem>
            </Link>

            <div onClick={(e) => logoutFunction()}  className="text-black">
              <MenuItem
                onClick={handleClose}
                className="text-md font-sans  hover:bg-primary hover:text-white duration-300"
              >
                <div className="flex items-center gap-4 ">
                  <LogoutIcon className="text-md  " /> Logout
                </div>
              </MenuItem>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/login" className="text-black">
              <MenuItem
                onClick={handleClose}
                className="text-md font-sans  hover:bg-primary hover:text-white duration-300"
              >
                <div className="flex items-center gap-4  ">
                  <VpnKeyIcon className="text-md   " /> Login
                </div>
              </MenuItem>
            </Link>
            <Link to="/register"  className="text-black">
              <MenuItem
                onClick={handleClose}
                className="text-md font-sans  hover:bg-primary hover:text-white duration-300"
              >
                <div className="flex items-center gap-4 ">
                  <LockOpenIcon className="text-md  " /> Create Account
                </div>
              </MenuItem>
            </Link>
          </div>
        )}
      </Menu>
    </>
  );
}
