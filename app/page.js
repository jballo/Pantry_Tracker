'use client';
import { useState, useEffect } from "react";
import { Box, Modal, Stack, TextField, Typography, Button, Grid } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { Ranchers } from "next/font/google";

import { useRouter } from 'next/navigation';
import { SignedIn, useUser } from "@clerk/nextjs";
import { SignIn, SignInButton, SignedOut, SignOutButton, SignUpButton } from "@clerk/nextjs";


const ranchers = Ranchers({
    weight: '400',
    style: 'normal',
    subsets: ['latin']
})

export default function Home() {
    
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();



  return <Box
        width="100vw" 
        height="100vh" 
        display={"flex"} 
        flexDirection={"column"}
        // justifyContent={"center"} 
        // alignItems={'center'}
        gap={2}
        sx={{
        // backgroundImage: 'url("/DALLE.jpg")',
        flexGrow: 1,
        backgroundImage: 'url("/DALLEo.jpeg")',
        backgroundSize: 'cover', // Adjusts the size of the background image
        backgroundRepeat: 'no-repeat', // Prevents the background image from repeating
        backgroundPosition: 'center', // Centers the background image
    }}
    >
        <Grid 
            container 
            // spacing={30}
            // bgcolor='teal'
            height='100%'
        >
        <Grid item xs={7} sm={7} bgcolor='#E3E2DF' height={{xs: '10%', sm: '15%', md: '17%'}}>
          <Typography
            variant="h1"
            sx= {{
                fontFamily: ranchers.style.fontFamily
            }}
            color={"#5D001E"}
            // fontSize={{xs: 50, sm: 73, md: 100, lg: 120}}
            fontSize={{xs: 38, sm: 73, md: 100, lg: 120}}

          >PantryGrove</Typography>
        </Grid>
        <Grid item xs={5} sm={5} bgcolor='#E3E2DF' height={{xs: '10%', sm: '15%'}} display='flex' justifyContent='flex-end' alignItems='center'>
          {/* <Typography>Sign-In</Typography> */}
          <SignedOut>
                <SignInButton>
                    <Button
                        variant="contained"
                        sx={{
                            background: '#EE4C7C',
                            '&:hover': {
                                backgroundColor: '#9A1750'
                            },
                            height: '50%',
                            marginTop: { xs: '-2.5rem', sm: '-2.0rem', md: '-1.5rem'}
                        }}
                    >Sign In</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                {/* redirect to /dashboard */}
                <Button href="/dashboard"
                    variant="contained"
                        sx={{
                            background: '#EE4C7C',
                            '&:hover': {
                                backgroundColor: '#9A1750'
                            },
                            height: '50%',
                            marginTop: { xs: '-2.5rem', sm: '-2.0rem', md: '-1.5rem'}
                        }}
                >Proceed</Button>
            </SignedIn>
        </Grid>
        <Grid item xs={12} sm={7}
            bgcolor='#E3E2DF'
            height={{xs: '90%', sm: '85%', md: '83%'}}
            display='flex'
            flexDirection='column'
            justifyContent='center'
        >
          {/* <Typography>xs=4</Typography> */}
          <Typography
                    mt='-12rem'
                    ml='3rem'
                    variant="h2"
                    sx= {{
                        fontFamily: ranchers.style.fontFamily
                    }}
                    color='#9A1750'
                >
                    Track Less,
                    <br/>
                    Cook More
                </Typography>
                <Typography
                    ml='3rem'
                    mr='3rem'
                >
                    Our app simplifies meal preparation by efficiently managing pantry inventory. Users can focus more on cooking and less on tracking ingredients, making mealtime more enjoyable and stress-free.
                </Typography>
        </Grid>
      </Grid>
    </Box>
    
}
