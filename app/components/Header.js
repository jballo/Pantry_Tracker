'use client';
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useUser, useClerk, SignOutButton, SignedIn } from "@clerk/nextjs"
import { Stack, Typography, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Ranchers } from "next/font/google";


const ranchers = Ranchers({
  weight: '400',
  style: 'normal',
  subsets: ['latin']
})



export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleDropDownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropDownClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async () => {
    await signOut({ redirectTo: '/' });
    // router.push('/');
  };


  return (
    <Stack
      width='100%'
      height='20%'
      direction='row'
      display='flex'
      sx={{
        justifyContent: 'space-between'
      }}
    >
      <Typography
        variant='h2'
        sx={{
          fontFamily: ranchers.style.fontFamily
        }}
        color='#9A1750'
      >
        Welcome, {user?.firstName}
      </Typography>
      <Button
        aria-controls={open ? 'positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleDropDownClick}
        sx={{
          background: '#EE4C7C',
          height: '50%',
          '&:hover': {
            backgroundColor: '#9A1750'
          }
        }}
        variant='contained'
      >
        <MenuIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleDropDownClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() => {
            handleDropDownClose();
            try {
              router.push('/');
            } catch (error) {
              console.error("Navigation error: ", error);
            }
          }}
        >Home</MenuItem>
        <MenuItem onClick={handleDropDownClose}>Profile</MenuItem>
        <MenuItem onClick={handleDropDownClose}>My account</MenuItem>
        <MenuItem >
          <Button
            variant='contained'
            sx={{
              background: '#EE4C7C',
              '&:hover': {
                backgroundColor: '#9A1750'
              }
            }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </MenuItem>
      </Menu>
    </Stack>
  );
};
