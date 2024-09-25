'use client';
import { Modal, Box, Typography, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function AddItemButton({ itemName, setItemName, itemCategory, setItemCategory, itemQuantity, setItemQuantity, addItem }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => setModalOpen(false);

  const handleOpen = () => setModalOpen(true);



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
