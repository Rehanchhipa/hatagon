'use client'
import React, {useState}  from 'react'
// import '../landingcss/landingcss.css'; // Import the custom CSS file
import { Box, Grid, Typography, CardMedia, TextField, Button, Modal } from '@mui/material'
import mobileImg from '../Images/Mobile.webp'
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';





const Landingpage = () => {

  const route = useRouter()
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
      });
    
      const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema,
        onSubmit: (values) => {
          // Handle form submission with validated values
          console.log(values);
          
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/api/singin',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : {
    email:values.email,
    password:values.password
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  console.log(response.data)
if(response.data.message === "user login"){

  localStorage.setItem('user',response.data.data._id)
  route.push('./components/allarticles')
  
}else{
  alert(response.data.message)
}
})
.catch((error) => {
  console.log(error);
});

        },
      });


  return (
    <>
    <Box align='center' sx={{m:2}}>
    <Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <Box align='left' sx={{mt:10,paddingX:'20%'}}>
    <Typography sx={{color:'#091133',fontSize:30}}>Design & Build Your Own Articles Pages</Typography>
    <Typography sx={{color:'#6F7CB2'}}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim</Typography>
    </Box>
    <Box sx={{width:'70%',mx:'20%'}}>
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Email"
        id="email"
        name="email"
        type="text"
        variant="standard"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        margin="normal"
      />
      <TextField
        label="Password"
        id="password"
        name="password"
        type="password"
        variant="standard"
        fullWidth
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
      />
      <Button type="submit" fullWidth variant="outlined" color="primary">
        LogIn
      </Button>
    </form>
    <Link href="./components/singup"> singup
    {/* <Button fullWidth color="primary">
        SingUP
      </Button> */}
    </Link>
    </Box>
  </Grid>
  <Grid item xs={12} md={6}>
        <span class="inline-block animate-pulse rounded-full text-white text-sm">animate-pulse
        <Image
        src={mobileImg}
        alt="Description of the image"
        width={300}
        height={500}
      />
    </span>
  </Grid>
 
</Grid>
    </Box>




    </>
  )
}

export default Landingpage
