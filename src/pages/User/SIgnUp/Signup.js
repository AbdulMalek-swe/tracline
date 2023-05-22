import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
 
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
 
// import withPublic from "../hoc/withPublic";
 
 
import { useCookies } from "react-cookie";
 
 
import { Link, useNavigate } from "react-router-dom";
import store from "../../../redux/store/store";
import { toast } from "react-toastify";
import axios from "../../../service/apiService";
import { addUserActions } from "../../../redux/features/addUser/addUserSlice";



function SignUp() {

  const { User } = store.getState();
  const [cookie, setCookie] = useCookies(["token"]);
  const [, , removeCookie] = useCookies(["token"]);
  
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();

  const Registerapi = async (values) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("password", values.password);



    const loading = toast.loading("Please wait a moment...");

    try {
      const res = await axios.post(
        `/api/account/sing-up/`,
        formData
      );
      console.log(res);
      const { status, data } = res;
      console.log("submit data ", res);
      if (status === 201) {
        setIsLoading(false);
        toast.dismiss(loading);
        toast.success(data?.message);
          setCookie("token", data?.access_token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
          });
       
          store.dispatch(addUserActions.addUser(data?.data));
   
          navigate("/")

       
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.data?.email[0] ? error?.response?.data?.data?.email[0] : "Something went wrong ! Please try again later.");
      toast.dismiss(loading);
      console.log("error from submit", error);
    }
  };
  const token = cookie["token"];
  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[token])
  return (
    <>

      <div className="relative overflow-hidden h-screen flex items-center  bg-hero-pattern bg-center bg-cover bg-no-repeat bg-static bg-fixed">
        <div className="container-sk">
          <div className=" rotate-border  rotate-border1 bg-white w-full mx-auto md:w-2/3 lg:w-1/2 xl:w-1/3   p-1  ">
            <Box className="z-10 rounded-lg bg-hero-pattern bg-center bg-cover bg-no-repeat bg-static bg-fixed    w-full h-full">
              <div className="md:p-14 p-5  rounded-lg backdrop-blur-xl bg-gray-900/50">
                <Typography className="text-center font-display lg:text-2xl md:text-xl text-lg font-bold text-white">
                  Register New Account
                </Typography>
                <Formik
                  enableReinitialize
                  initialValues={{
                    email: "",
                    password: "",
                    confirm_password: "",
                    first_name: "",
                    last_name: "",
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
                    if (!values.first_name) {
                      errors.first_name = "Please enter your first name.";
                    }
                    if (!values.last_name) {
                      errors.last_name = "Please enter your last name.";
                    }
                    if (!values.password) {
                      errors.password = "Please enter your password.";
                    } else if (values.password?.length < 8) {
                      errors.password =
                        "Password should be more than 8 characters.";
                    }

                    if (!values.confirm_password) {
                      errors.confirm_password = "Please enter password again.";
                    } else if (values.password !== values.confirm_password) {
                      errors.confirm_password = "Password doesn't match";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { resetForm }) => {
                    Registerapi(values);
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
                    <form onSubmit={handleSubmit} className="mt-5 lg:mt-10 ">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
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
                            error={ errors.first_name && touched.first_name && errors.first_name}
                            helperText={errors.first_name && touched.first_name && errors.first_name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                            error={errors.last_name && touched.last_name && errors.last_name}
                            helperText={errors.last_name && touched.last_name && errors.last_name}
                          />
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="py-3 bg-primary capitalize lg:text-2xl md:text-xl text-lg text-white hover:font-bold duration-300 font-display"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Register
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
                          to="/login"
                          className="no-underline hover:text-red-700 duration-300 w-fit text-white"
                        >
                          Already have an account? Sign in
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
export default  SignUp;