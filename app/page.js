'use client';
import { useState, useEffect } from "react";
import { Box, Modal, Stack, TextField, Typography, Button } from "@mui/material";
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
        justifyContent={"center"} 
        alignItems={'center'}
        gap={2}
        sx={{
        // backgroundImage: 'url("/DALLE.jpg")',
        backgroundImage: 'url("/DALLEo.jpeg")',
        backgroundSize: 'cover', // Adjusts the size of the background image
        backgroundRepeat: 'no-repeat', // Prevents the background image from repeating
        backgroundPosition: 'center', // Centers the background image
    }}
    >
        <Box
            width="100%"
            height="12%"
            bgcolor={"#E3E2DF"}
            position={"absolute"}
            top={0}
            display={"flex"}
            justifyContent={"flex-end"}
            padding={3}
        >
            <SignedOut>
                <SignInButton>
                    <Button
                        variant="contained"
                        sx={{
                            background: '#EE4C7C',
                            '&:hover': {
                                backgroundColor: '#9A1750'
                            }
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
                        }
                    }}
                >Proceed</Button>
            </SignedIn>
        </Box>
        <Box
            width={"55%"}
            height={"100%"}
            position={"absolute"}
            left={0}
            bgcolor={"#E3E2DF"}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            alignContent={'center'}
            padding={9}
            sx={{
                paddingRight: '4rem'
            }}
        >
            <Typography
                // fontFamily={ranchers}
                variant="h1"
                sx= {{
                    fontFamily: ranchers.style.fontFamily
                }}
                color={"#5D001E"}
                fontSize={110}
            >
                PantryGrove
            </Typography>

            <Stack
                direction={'column'}
                gap={3}
            >
                <Typography
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
                >
                    Our app simplifies meal preparation by efficiently managing pantry inventory. Users can focus more on cooking and less on tracking ingredients, making mealtime more enjoyable and stress-free.
                </Typography>
                <Stack
                    direction={'row'}
                    gap={1}
                    width='100%'
                    height='100%'
                >
                    <SignedOut>

                        <TextField
                            // width='80%'
                            fullWidth
                            InputProps={{
                                sx: {
                                    background: '#E3AFBC',
                                    boxSizing: 'border-box',
                                    borderRadius: '4px', // Ensure rounded corners
                                }
                            }}
                            placeholder="Email Address"
                            sx={{
                                paddingRight: '20px'
                            }}
                        />
                        <Box
                            width={"30%"}
                            height={"100%"}
                        >
                            <SignUpButton>
                                <Button
                                    width='40%'
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        background: '#EE4C7C',
                                        minHeight: '100%',
                                        '&:hover': {
                                            backgroundColor: '#9A1750'
                                        }
                                    }}
                                >Get Started</Button>
                            </SignUpButton>
                        </Box>
                    </SignedOut>
                    
                </Stack>

            </Stack>
        </Box>
    </Box>
    
}
