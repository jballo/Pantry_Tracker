'use client';
import { useState, useEffect } from "react";
import { Box, Modal, Stack, TextField, Typography, Button } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";

const items = ['Tomato', 'granola', 'potato', 'Peanut Butter', 'Water Bottle', 'pepper', 'salt', 'Olive Oil'];

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setPantry(pantryList);
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data());

    if( docSnap.exists() ){
      const {quantity} = docSnap.data();
      await setDoc(docRef, {quantity: quantity + 1});
    } else {
      await setDoc(docRef, {quantity: 1});
    }

    await updateInventory();
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data());

    if( docSnap.exists() ){
      const {quantity} = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {quantity: quantity - 1});
      }
    }

    await updateInventory();
  }

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    updateInventory();
  },[]);

  return <Box 
    width="100vw" 
    height="100vh" 
    display={"flex"} 
    flexDirection={"column"}
    justifyContent={"center"} 
    alignItems={'center'}
    gap={2}
    >
      <Typography
        variant="h1"
      >Pantry Tracker</Typography>
      <Modal
        open={modalOpen}
        onClose={handleClose}
      >
        <Box
          position={"absolute"}
          top="50%"
          left="50%"
          width={400}
          bgcolor={"#fff"}
          border={"2px solid black"}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
          boxShadow={24}
          p={4}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
        >
          <Typography>Add Item</Typography>
          <Stack
            width={"100%"}
            direction={"row"}
            spacing={2}
          >
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            />
            <Button
              variant="outlined"
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
        variant="contained"
        onClick={handleOpen}
      >Add New Item</Button>
      <Box
        border={"1px solid #333"}
      >
        <Box
        width="800px"
        height="100px"
        bgcolor={"#ADD8E6"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        >
          <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
            Pantry Items
          </Typography>
        </Box>
        <Stack
          width="800px"
          height="200px"
          spacing={2}
          overflow={"auto"}
        >
          {pantry.map(({id, name, quantity}) => (
            <Box
              key={name}
              width="100%"
              height="300px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
            > 
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                width={"70%"}
                // minWidth={"70%"}
              >
                <Typography
                  variant="h3"
                  color="#333"
                  textAlign={"center"}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography
                  variant="h3"
                  color="#333"
                  textAlign={"center"}
                >
                  {quantity}
                </Typography>
              </Box>
                <Stack
                  spacing={3}
                  padding={3}
                  direction={"row"}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      removeItem(name);
                    }}
                  >Remove</Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      addItem(name);
                    }}
                  >Add</Button>
                </Stack>
            </Box>
          ))}
          {/* {
            pantry.forEach(({name, quantity}) => {
              return <Box>name</Box>
            })
          } */}
        </Stack>
      </Box>
    </Box>
    
}
