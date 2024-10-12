'use client';
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchField({ setItemSearchName }) {

  return (
    <>

      <TextField
        id='searchFieldTextField'
        variant='standard'
        sx={{
          height: '10px'
        }}
        label='Search by Name...'
        onChange={(e) => {
          setItemSearchName(e.target.value);
        }}
      />
      <Box
        display='flex'
        sx={{

          justifyContent: 'center'
        }}
        alignItems='start'
        padding={2}
      >
        <SearchIcon
          // color='#5D001E'
          sx={{
            color: '#5D001E',

            justifyContent: 'center'
          }}

        />

      </Box>
    </>
  );
}
