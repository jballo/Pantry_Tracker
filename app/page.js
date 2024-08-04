'use client';
import { useState, useEffect } from "react";
import { Box, Modal, Stack, TextField, Typography, Button } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { Ranchers } from "next/font/google";


const ranchers = Ranchers({
    weight: '400',
    style: 'normal',
    subsets: ['latin']
})

export default function Home() {

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
            {/* <Typography>Nav Bar</Typography> */}
            <Button
                variant="contained"
                sx={{
                    background: '#EE4C7C',
                    '&:hover': {
                        backgroundColor: '#9A1750'
                    }
                }}
                // borderRadius={24}
            >
                Log In
            </Button>
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
                Pantry Tracker
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
                        >
                            Get Started
                        </Button>

                    </Box>
                </Stack>

            </Stack>
        </Box>
    </Box>
    
}
