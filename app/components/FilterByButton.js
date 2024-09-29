'use client';
import { useState } from "react";
import { Modal, Box, Typography, Checkbox, Slider, Button, FormControlLabel } from "@mui/material";

export default function FilterByButton({ minMaxQuantity, handleQuantityChange, categoryList, categoryListFilters, handleCategoryFilterChange }) {

  const [filterModelOpen, setFilterModelOpen] = useState(false);
  const filterHandleOpen = () => setFilterModelOpen(true);
  const filterHandleClose = () => setFilterModelOpen(false);

  return (
    <>

      <Modal
        open={filterModelOpen}
        onClose={filterHandleClose}
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
          padding={5}
          display='flex'
          flexDirection='column'
          gap={1}
          borderRadius={5}
        >
          <Typography>Select Category</Typography>
          {
            categoryList.map((categoryName) => {
              return <FormControlLabel
                key={categoryName}
                control={
                  <Checkbox
                    checked={categoryListFilters.includes(categoryName)}
                    onChange={() => {
                      console.log("checkbox pressed")
                      handleCategoryFilterChange(categoryName);
                    }}
                    sx={{
                      color: '#9A1750',
                      '&.Mui-checked': {
                        color: '#9A1750',
                      },
                    }}
                  />
                }
                label={categoryName}
                onChange={() => {
                  console.log("Form control label")
                }}
              >
              </FormControlLabel>
            })
          }
          <Typography>Quantity Range</Typography>
          <Slider
            value={minMaxQuantity}
            valueLabelDisplay="on"
            onChange={handleQuantityChange}
            color='#5D001E'
          />
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
          filterHandleOpen();
        }}
      >
        <Typography>Filter By</Typography>
      </Button>
    </>
  );
}
