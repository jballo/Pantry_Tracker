'use client';
import { Modal, Box, Typography, Button } from "@mui/material";
import { useState } from "react";


export default function SortByButton() {


  const [sortByModalOpen, setSortByModalOpen] = useState(false);


  const handleSortByHandleOpen = () => setSortByModalOpen(true);
  const handleSortByHandleClose = () => setSortByModalOpen(false);


  return (
    <>

      <Modal
        open={sortByModalOpen}
        onClose={handleSortByHandleClose}
      >
        <Box
          position={"absolute"}
          top="50%" r
          left="50%"
          width={400}
          bgcolor={"#E3E2DF"}
          border={"2px solid black"}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
          boxShadow={24}
          padding={3}
          borderRadius={5}
        >
          <Typography>Sort By Coming Soon...</Typography>
        </Box>

      </Modal>

      <Button
        variant='contained'
        sx={{
          height: '50px',
          background: '#5D001E',
          '&:hover': {
            backgroundColor: '#9A1750'
          }
        }}
        onClick={() => {
          handleSortByHandleOpen();
        }}
      >
        <Typography>Sort By</Typography>
      </Button>
    </>
  );
}
