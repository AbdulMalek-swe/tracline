import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
 
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../service/apiService";
 
 
 

function ForgetPassword() {
  
  const [isLoading, setIsLoading] = useState(false);

   
const navigate = useNavigate()
  const SendToken = async (email) => {

    console.log(email)
    // setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);


    const loading = toast.loading("Please wait a moment...");
    try {
      const res = await axios.post(`api/recovery-account/reset-password/`, formData);

      console.log(res);
    //   const response = await fetch("http://127.0.0.1:8000/api/reset-password/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: JSON.stringify({email:"abdulmalek.swe.585@gmail.com"}),
    // });
    // console.log(response);

      
      // const { status, data } = res;
      // console.log("submit data ", res);
      // if (status === 200) {
      //   setIsLoading(false);
      //   toast.dismiss(loading);
      //   toast.success(data?.message);
    
      // }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.dismiss(loading);
      toast.error(error?.response?.data?.message);
    }
  };

  const ResetPassword = async (values) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("new_password", values.password);
    formData.append("password_reset_token", values.otp);

    const loading = toast.loading("Please wait a moment...");
    try {
      const res = await axios.post(`/api/recovery-account/reset-password-send-token/`, formData);
      const { status, data } = res;
      console.log("submit data ", res);
      if (status === 202) {
        setIsLoading(false);
        toast.dismiss(loading);
        toast.success(data?.message);
        navigate('/login');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.dismiss(loading);
      toast.error(error?.response?.data?.message);
    }
  };




  return (
    <>
      

      <div className="relative overflow-hidden h-screen flex items-center  bg-hero-pattern bg-center bg-cover bg-no-repeat bg-static bg-fixed">
        <div className="container-sk">
          <div className=" rotate-border  bg-white w-full mx-auto md:w-2/3 lg:w-1/2 xl:w-1/3   p-1  ">
            <Box className="z-10 rounded-lg bg-hero-pattern bg-center bg-cover bg-no-repeat bg-static bg-fixed    w-full h-full">
              <div className="md:p-14 p-5  rounded-lg backdrop-blur-xl bg-gray-900/50">
                <Typography className="text-center font-display lg:text-2xl md:text-xl text-lg font-bold text-white">
                  Forget Password ?
                </Typography>
                <Formik
                  enableReinitialize
                  initialValues={{
                    email: "",
                    password: "",
                    confirm_password: "",
                    otp: "",
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
                    if (!values.otp) {
                      errors.otp = "Please enter token here.";
                    }
                    if (!values.password) {
                      errors.password = "Please enter your password.";
                    } else if (values.password?.length < 8) {
                      errors.password =
                        "Password should be more than 8 characters.";
                    }

                    if (!values.confirm_password) {
                      errors.confirm_password = "Please enter confirm password.";
                    } else if (values.password !== values.confirm_password) {
                      errors.confirm_password = "Password doesn't match";
                    }

                    return errors;
                  }}
                  onSubmit={(values, { resetForm }) => {
                    ResetPassword(values);
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
                      <div>
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
                          helperText={errors.email && touched.email && errors.email}
                        />
                        <div className="flex justify-end lg:text-sm text-xs mt-2">
                          <Button
                          onClick={(e)=>{SendToken(values?.email)}}
                          disabled={errors.email || isLoading}
                            variant="contained"
                            className=" bg-primary capitalize text-xs lg:text-sm py-0 text-white hover:font-bold duration-300 font-display"
                          >
                            Sent OTP
                          </Button>
                        </div>
                      </div>

                      <TextField
                        
                        fullWidth
                        name="otp"
                        label="Token"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.otp}
                        InputLabelProps={{
                          style: { color: "#FFFFFF" },
                        }}
                        id="password"
                        error={errors.otp && touched.otp && errors.otp}
                        helperText={errors.otp && touched.otp && errors.otp}
                      />
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
                        error={errors.password && touched.password && errors.password}
                        helperText={errors.password && touched.password && errors.password}
                      />
                      <TextField
                        
                        fullWidth
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirm_password}
                        InputLabelProps={{
                          style: { color: "#FFFFFF" },
                        }}
                        id="password"
                        error={errors.confirm_password && touched.confirm_password && errors.confirm_password}
                        helperText={errors.confirm_password && touched.confirm_password && errors.confirm_password}
                      />

                      <Button
                        type="submit"
                        disabled={isLoading}
                        fullWidth
                        variant="contained"
                        className="py-3 bg-primary capitalize lg:text-2xl md:text-xl text-lg text-white hover:font-bold duration-300 font-display"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Reset Password
                      </Button>
                      <div className="text-sm flex flex-col  gap-1 flex-wrap">
                        <Link
                          to="/register"
                          variant="body2"
                          className="hover:text-red-700 duration-300 w-fit text-white"
                        >
                          {"Already have an account? Login"}
                        </Link>
                        <Link
                          to="/register"
                          variant="body2"
                          className="hover:text-red-700 duration-300 w-fit text-white"
                        >
                          {"Don't have an account? Sign Up"}
                        </Link>
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
export default  ForgetPassword;