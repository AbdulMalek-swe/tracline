import  React,{useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
 
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
 
 
import axios from "../../../service/apiService"
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import ImageSection from "../../../components/Layout/userProfile/ImageSection";
import store from "../../../redux/store/store";
import { addUserActions } from "../../../redux/features/addUser/addUserSlice";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'red',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProfileF() {
    const [picture, setPicture] = useState([]);
    // const [open, setOpen] = React.useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [isLoading, setIsLoading] = useState(false);
  
    const User = useSelector((state) => state?.reducer?.User);
    console.log(User);
    // consol .log(User);
    const [cookie, setCookie] = useCookies(["token"]);
    
     const navigate = useNavigate()
    const token = cookie["token"];
  useEffect(()=>{
    if(!token){
      navigate("/login")
    }
  },[navigate,token])

    const sentVerificationCode = async () => {

      const loading = toast.loading("Please wait a moment...");
      try {
        const res = await axios.post(`/api/account/account-verify-code/`);
        const { status, data } = res;
       console.log("res",res);
        setIsLoading(false);
        if (status === 200) {
          toast.dismiss(loading);
          toast.success(data?.message);
          setOpen(true);
        }
      } catch (error) {
        // console.log(error)
        setIsLoading(false);
        const { status, data } = error?.response;
        toast.dismiss(loading);
        if (status === 422) {
          Object.entries(data?.errors)?.map((error) => toast.error(error[1][0]));
        } else {
          toast.error(data?.error);
        }
        
      }
    };
    const [verify,setVerify] = useState(0);
    const handleChangeToken = e =>{
      setVerify(e.target.value)
    }
    const verifyHandle = e =>{
        axios.post("/api/account/verify/",{"otp":verify})
        .then(res=>{
          console.log(res);
          if(res.data.access_token){
            setOpen(false);
          }
          else{
            setOpen(true)
          }
        })
    }
  return (
    <>

<div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="backdrop-blur-xl bg-gray-900/50"
      >
        <Box sx={style}  className="backdrop-blur-xl bg-gray-900/50">
        <TextField
                        fullWidth
                        id="verify"
                        label="Verify Token"
                        name="verify"
                        onChange={handleChangeToken}
                        // onBlur={handleBlur}
                        // value={values.last_name}
                        autoComplete="off"
                        InputLabelProps={{
                          style: { color: "#bbbbbb",  },
                        }}
                        style={{ color: "#bbbbbb",background:"black"} }
                      />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="py-3 bg-primary capitalize lg:text-2xl md:text-xl text-lg text-white hover:font-bold duration-300 font-display"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={verifyHandle}
                      >
                       Verify
                      </Button>
                        <p className="text-red-700 text-sm  flex justify-end"> <span disabled={isLoading} onClick={(e)=>{sentVerificationCode()}} className="cursor-pointer hover:text-red-900"> resend otp </span></p>
        </Box>
      </Modal>
    </div>

      <div className="relative overflow-hidden lg:py-10 py-5 flex items-center  bg-hero-pattern bg-center bg-cover bg-no-repeat bg-static bg-fixed">
        <div className="container-sk">
          <div className=" rotate-border  bg-white w-full mx-auto md:w-2/3 lg:w-1/2    p-1  ">
            <Box className="z-10 rounded-lg bg-hero-pattern  bg-center bg-cover bg-no-repeat bg-static bg-fixed    w-full h-full">
              <div className="md:p-14 p-5  rounded-lg backdrop-blur-xl bg-gray-900/50">         
                <ImageSection/>
                <Typography className="text-center font-display lg:text-2xl md:text-xl text-lg font-bold mt-10">
                  My Profile
                </Typography>
                <Formik
                  enableReinitialize
                  initialValues={{
                    email: User?.email || "",
                    first_name: User?.first_name || "",
                    last_name: User?.last_name || "",
                    password: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "Please enter your email.";
                    } else if (
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
                    ) {
                      errors.email = "Please enter valid email.";
                    }

                    
                    return errors;
                  }}
                  onSubmit={(values, { resetForm }) => {
                    console.log(values);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,

                    /* and other goodies */
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="mt-5 lg:mt-10 flex flex-col gap-4"
                    >
                      <TextField
                        autoComplete="off"
                        name="first_name"
                        fullWidth
                        className="custom-input"
                        id="firstName"
                        label="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                        InputLabelProps={{
                          style: { color: "#FFFFFF" },
                        }}
                        error={
                          errors.first_name &&
                          touched.first_name &&
                          errors.first_name
                        }
                        helperText={
                          errors.first_name &&
                          touched.first_name &&
                          errors.first_name
                        }
                      />

                      <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="last_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                        autoComplete="off"
                        InputLabelProps={{
                          style: { color: "#FFFFFF" },
                        }}
                        error={
                          errors.last_name &&
                          touched.last_name &&
                          errors.last_name
                        }
                        helperText={
                          errors.last_name &&
                          touched.last_name &&
                          errors.last_name
                        }
                      />

                      <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        InputLabelProps={{
                          style: { color: "#FFFFFF" },
                        }}
                        error={errors.email && touched.email && errors.email}
                        helperText={
                          errors.email && touched.email && errors.email
                        }
                      />
                      {
                        !User.is_verified &&  <p className="text-red-700 text-sm  flex justify-end"> <span disabled={isLoading} onClick={(e)=>{sentVerificationCode()}} className="cursor-pointer hover:text-red-900"> verify email </span></p>
                      }
                      
                     
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        InputLabelProps={{
                          style: { color: "#FFFFFF" },
                        }}
                        id="password"
                        error={
                          errors.password && touched.password && errors.password
                        }
                        helperText={
                          errors.password && touched.password && errors.password
                        }
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="py-3 bg-primary capitalize lg:text-2xl md:text-xl text-lg text-white hover:font-bold duration-300 font-display"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Save
                      </Button>

                      <div className="flex justify-end items-center">
                         <Button
                        variant="contained"
                        className="py-3 bg-red-700 shadow-none hover:bg-red-900 capitalize lg:text-sm text-xs text-white hover:font-bold duration-300 font-display"
                      onClick={()=>navigate("/payment")}
                      >
                        Subscribe now
                      </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default  ProfileF; 