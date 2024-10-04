'use client';
import { Modal, Box, Typography, Stack, TextField, Button } from "@mui/material";
import { useState, useRef } from "react";
import { Camera } from "react-camera-pro";

export default function AddItemButton({ itemName, setItemName, itemCategory, setItemCategory, itemQuantity, setItemQuantity, addItem }) {
  const [modalOpen, setModalOpen] = useState(false);
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const handleClose = () => setModalOpen(false);

  const handleOpen = () => setModalOpen(true);

  const predictItem = async (photo) => {

    if (!photo) {
      console.error("Image is null.");
      return null;
    }

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({ image: photo })
      })

      if (!response.ok) {
        console.error("Failed to predict item.");
        return null;
      }

      const data = await response.json();
      console.log("Prediction result:", data);
      // return data;

    } catch (error) {
      console.error("Error predicting item:", error);
      return null;
    }
  };


  return (
    <>

      <Modal
        open={modalOpen}
        onClose={handleClose}
      >
        <Box
          position={"absolute"}
          top="50%"
          left="50%"
          width={400}
          bgcolor={"#E3E2DF"}
          border={"2px solid black"}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
          boxShadow={24}
          p={4}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          borderRadius={5}
        >
          <Typography
            variant='h5'
          >Add Item</Typography>
          <Stack
            width={"100%"}
            direction={"column"}
            spacing={2}
          >
            <Typography>
              Name:
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <Typography>
              Category:
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              value={itemCategory}
              onChange={(e) => {
                setItemCategory(e.target.value);
              }}
            />

            <Typography>
              Quantity:
            </Typography>
            <TextField
              type="number"
              variant='outlined'
              fullWidth
              value={itemQuantity}
              onChange={(e) => {
                setItemQuantity(e.target.value);
              }}
            />
            <Button
              variant="contained"
              sx={{
                background: '#5D001E',
                '&:hover': {
                  backgroundColor: '#9A1750'
                }
              }}
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >Add</Button>
            <Box
              width='300px'
              height='200px'
            >
              <Camera ref={camera} aspectRatio={16 / 9} />
              {/*<img src={image} width='300px' alt='Taken photo' />*/}
              <Button
                variant="contained"
                sx={{
                  background: '#5D001E',
                  '&:hover': {
                    backgroundColor: '#9A1750'
                  }
                }}
                onClick={() => {
                  const photo = camera.current.takePhoto();
                  setImage(photo);
                  console.log("Image set.");
                  predictItem(photo);
                  console.log("Photo taken.");
                }}
              >Take Photo</Button>

            </Box>
          </Stack>
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
          handleOpen();
        }}
      >
        <Typography>Add Item</Typography>
      </Button>
    </>

  );
};
