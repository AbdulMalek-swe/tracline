import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import { CssBaseline, StyledEngineProvider, createTheme } from '@mui/material';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Login from './pages/User/Login/Login';
import Signup from './pages/User/SIgnUp/Signup';
import ForgetPassword from './pages/User/ForgatePassword/ForgatePassoword';
import { ThemeProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import ProfileF from './pages/User/Profile/Myprofile';
  
import axios from './service/apiService';
import { addUserActions } from './redux/features/addUser/addUserSlice';
import ImageProcess from './pages/ImageProgress/ImageProcess';
import { addImageActions } from './redux/features/addImage/addImageSlice';
 
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import Stripe from './pages/Payment/StripeForm';
 
const AppLayout = () => {
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate()
  useEffect(()=>{
     async function userProfile(){
      try{
        const profile = await   axios.get("/api/account/profile/")
          console.log(profile.data);
        // .then(res=>{
           store.dispatch(addUserActions.addUser(profile?.data));
        // })
      }
      catch{
        removeCookie("token", { path: "/" });
        navigate("/")
      }
      
     }
   
    userProfile()
   },[])
  return (
    < >
      <Header/>
      <Outlet />
      <Footer/>
      </ >
  );
};
 
const router = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Signup/>
      },
      {
        path:"/forget-password",
        element:<ForgetPassword/>
      },
      {
        path:"/user/myprofile",
        element:<ProfileF/>
      },
      {
        path:"/payment",
        element:<Stripe/>
      },
      {
        path:"/image/process",
        element:<ImageProcess/>
      }
    
    ]
  }
])

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  palette: {
    primary: {
      main: "#FFFAF9", // replace with your desired primary color
    },
    secondary: {
      main: "#FF0000", // replace with your desired secondary color
    },
    text: {
      primary: "#FFFFFF", // set the primary text color to white
    },
  },

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <ToastContainer
                autoClose={2000}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
                draggable={true}
                position="top-right"
                toastClassName=""
                bodyClassName=""
                progressClassName=""
                pauseOnFocusLoss={false}
                newestOnTop={true}
                theme="colored"
              />
    <Provider store={store}>
    <RouterProvider router={router}>
     
     </RouterProvider>
    </Provider>
   
    </ThemeProvider>
    
    
   </StyledEngineProvider>
  
   
);

 
