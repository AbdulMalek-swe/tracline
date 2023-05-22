import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
 
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
 
 
import { useCookies } from "react-cookie";
 
// import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../service/apiService";
import store from "../../../redux/store/store";
import { addUserActions } from "../../../redux/features/addUser/addUserSlice";
import { toast } from "react-toastify";

const Login = () => {
  const { User } = store.getState();
  const [cookie, setCookie] = useCookies(["token"]);
  const [, , removeCookie] = useCookies(["token"]);
   const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
   
  const loginapifunction = async (values) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const loading = toast.loading("Please wait a moment...");
    try {
      const res = await axios.post(`/api/account/login/`, formData);
      const { status, data } = res;
      console.log("submit data ", res);
      if (status === 200) {
        setIsLoading(false);
        toast.dismiss(loading);
        toast.success(data?.message);
          setCookie("token", data?.access_token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
          });
       
          store.dispatch(addUserActions.addUser(data?.data));
console.log(data?.data)

       navigate('/');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.dismiss(loading);
      toast.error(error?.response?.data?.message);
    }
  };
const token = cookie["token"];
  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[navigate,token])
    return (
        <div>
             <div className="relative overflow-hidden h-screen flex items-center  bg-hero-pattern bg-center bg-cover bg-no-repeat bg-static bg-fixed">
        <div className="container-sk">
          <div className=" rotate-border  bg-white w-full mx-auto md:w-2/3 lg:w-1/2 xl:w-1/3   p-1  ">
            <Box className="z-10 rounded-lg bg-hero-pattern  bg-center bg-cover bg-no-repeat bg-static bg-fixed    w-full h-full">
              <div className="md:p-14 p-5  rounded-lg backdrop-blur-xl bg-gray-900/50">
                <Typography className="text-center font-display lg:text-2xl md:text-xl text-lg font-bold text-white">
                  Sign in
                </Typography>
                <Formik
                  enableReinitialize
                  initialValues={{
                    email: "",
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

                    if (!values.password) {
                      errors.password = "Please enter your password.";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { resetForm }) => {
                    loginapifunction(values);
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
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        InputLabelProps={{
                          style: { color: "#FFFFFF",backgroundL:"red" },
                        }}
                        className="text-white"
                        sx={{color:"white"}}
                        error={errors.email && touched.email && errors.email}
                        helperText={
                          errors.email && touched.email && errors.email
                        }
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
                        Login
                      </Button>

                      <div className="text-sm flex flex-col  gap-1 flex-wrap">
                        <Link
                          to="/forget-password"
                          variant="body2"
                          className="hover:text-red-700 duration-300 w-fit text-white"
                        >
                          Forgot password? Reset
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
        </div>
    );
};

export default Login;