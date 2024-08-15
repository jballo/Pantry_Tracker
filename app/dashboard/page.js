'use client';
import {useState, useEffect, useCallback} from 'react';
import { Box, Modal, Stack, TextField, Typography, Button, IconButton, Checkbox, Slider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Menu, MenuItem, LinearProgress } from "@mui/material";

import { useRouter } from 'next/navigation';

// import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { firestore } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, or, query, setDoc } from "firebase/firestore";
import { Ranchers } from "next/font/google";


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useUser, useClerk, SignOutButton, SignedIn } from "@clerk/nextjs";


const ranchers = Ranchers({
    weight: '400',
    style: 'normal',
    subsets: ['latin']
})

export default function Page() {
    const router = useRouter();
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const [loading, setLoading] = useState(true);



    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleDropDownClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDropDownClose = () => {
        setAnchorEl(null);
    };


    const [pantry, setPantry] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterModelOpen, setFilterModelOpen] = useState(false);
    const [sortByModalOpen, setSortByModalOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);
    const [minMaxQuantity, setMinMaxQuantity] = useState([0, 100]);
    const [minMaxCalories, setMinMaxCalories] = useState([0, 1000]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const [categoryList, setCategoryList] = useState([]);
    const [itemSearchName, setItemSearchName] = useState('');
    
    
    const [categoryListFilters, setCategoryListFilters] = useState([]);
    
    const handleSignOut = async () => {
        await signOut({redirectTo: '/'});
        // router.push('/');
    };

    const createUser = async () => {
        try{
            const collectionRef = collection(firestore, 'users');
            const docRef = doc(collectionRef, user?.id);
            const docSnap = await getDoc(docRef);
    
            if(docSnap.exists()){
                // console.log("User already exists in db: " + docSnap);
                console.log("User already exists in db.");
            } else {
                console.log("User does not exist in db. Creating a new user in db.");
                await setDoc(docRef, {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userImage: user.imageUrl,
                })
            }

        } catch (error) {
            console.error("Error adding user to db: " + error.message);
        }
    }

    const updateInventory = async () => {
        console.log("updateInventory called");
        try{
            const pantryRef = collection(firestore, 'Pantry');
            const userRef = doc(pantryRef, user?.id);
            const getUserPantry = collection(userRef, 'Items');
            const items = await getDocs(getUserPantry);

            const pantryList = [];
            items.forEach((item) => {
                pantryList.push({
                    name: item.id,
                    ...item.data(),
                });
            });
            setPantry(pantryList);

        } catch (error) {
            console.error("Error fetching pantry data: ", error.message);
        }
    }

    useEffect(() => {
        if(isSignedIn){
            createUser();
            updateInventory();
        }
    }, [isSignedIn, user]);



    // const updateInventory = useCallback(async () => {
    //     try{
    //         const snapshot = query(collection(firestore, 'pantry'));
    //         const docs = await getDocs(snapshot);
    //         const pantryList = [];
    //         docs.forEach((doc) => {
    //             pantryList.push({
    //                 name: doc.id,
    //                 ...doc.data(),
    //             });
    //         });
    //         setPantry(pantryList);

    //     } catch (error) {
    //         console.error("Error fetching pantry data: ", error.message);
    //     }
    // }, [isSignedIn]);

    
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        {
            id: 'category',
            label: 'Category',
            minWidth: 170,
            align: 'right',
            // format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'quantity',
            label: 'Quantity',
            minWidth: 170,
            align: 'right',
            // format: (value) => value.toFixed(2),
        },
        {
            id: 'name',
            label: 'Update',
            align: 'right',
            minWidth: 50,
        },
    ];
    
    
    const addItem = async (item) => {
        // const docRef = doc(collection(firestore, 'pantry'), item);
        const pantryRef = collection(firestore, 'Pantry');
        const userRef = doc(pantryRef, user?.id);
        const itemsRef = collection(userRef, 'Items');
        const itemRef = doc(itemsRef, item); 
        const itemSnap = await getDoc(itemRef);
        
        
        if( itemSnap.exists() ){
            const {quantity, category} = itemSnap.data();
            const newData = {
                quantity: quantity + 1,
                category: category,
            }
            await setDoc(itemRef, newData);
        } else {
            if(!(isNaN(itemQuantity)) && itemQuantity !== ''){
                console.log("passed as a number");
                await setDoc(itemRef, {
                    quantity: parseInt(itemQuantity),
                    category: itemCategory,
                });

            } else {
                console.log("itemQuantity not number")
            }
        }
        setItemQuantity(0);
        
        await updateInventory();
    }
    
    const removeItem = async (item) => {
        const pantryRef = collection(firestore, 'Pantry');
        const userRef = doc(pantryRef, user?.id);
        const itemsRef = collection(userRef, 'Items');
        const itemRef = doc(itemsRef, item); 
        const itemSnap = await getDoc(itemRef);
        
        
        if( itemSnap.exists() ){
            const {quantity, category} = itemSnap.data();
            if (quantity === 1) {
                await deleteDoc(itemRef);
            } else {
                await setDoc(itemRef, {
                    quantity: quantity - 1,
                    category: category,
                });
            }
        }
        
        await updateInventory();
    }
    
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    
    const filterHandleOpen = () => setFilterModelOpen(true);
    const filterHandleClose = () => setFilterModelOpen(false);
    
    const handleSortByHandleOpen = () => setSortByModalOpen(true);
    const handleSortByHandleClose = () => setSortByModalOpen(false);
    
    const handleQuantityChange = (event, newValue) => setMinMaxQuantity(newValue);
    const handleCaloriesChange = (event, newValue) => setMinMaxCalories(newValue);
    
    const setNameOrder = () => {
        const newPantryAsc = pantry.sort((a,b) => a.name.localeCompare(b.name));
        
        
        const newPantryObj = []
        for(const item in newPantryAsc){
            newPantryObj.push({
                name: newPantryAsc[item].name,
                quantity: newPantryAsc[item].quantity,
                category: newPantryAsc[item].category,
            });
            
        }
        
        setPantry(newPantryObj);
    }
    
    useEffect(() => {
        var min = null;
        var max = null;
        
        pantry.map((pantryItem) => {
            if(min == null || max == null){
                min = pantryItem.quantity;
                max = pantryItem.quantity;
            }else {
                min = Math.min(min, pantryItem.quantity);
                max = Math.max(max, pantryItem.quantity);
            }
        })
        
        setMinMaxQuantity([min, max]);
    }, [pantry, isSignedIn]);
    
    const handleCategoryFilterChange = (categoryName) => {
        const filters = categoryListFilters;
        
        if(filters.includes(categoryName)){
            const newFilters = filters.filter(function(e) {
                return e !== categoryName;
            });
            setCategoryListFilters(newFilters);
        } else {
            const newFilters = [...filters, categoryName];
            setCategoryListFilters(newFilters);
            
        }
    }
    
    useEffect(() => {
        var newCategoryListSet = new Set([]);
        
        pantry.map((pantryItem) => {
            if(!newCategoryListSet.has(pantryItem.category)){
                newCategoryListSet.add(pantryItem.category);
            }
        })
    
        const newCategoryList = Array.from(newCategoryListSet);
        // for(const item in newCategoryListSet.keys()){
            //     console.log('for loop: ' + item);
            //     newCategoryList.push(item);
            // }
            // console.log();
            
            setCategoryList(newCategoryList);
    },[pantry])
        

        // if (loading) {
        //     return (
        //     <Box
        //         display='flex'
        //         flexDirection='column'
        //         justifyContent='center'
        //         alignItems='center'
        //         width='100vw'
        //         height='100vh'
        //         bgcolor='#E3E2DF'
        //     >
        //         <Typography
        //             variant='h2'
        //             sx= {{
        //                 fontFamily: ranchers.style.fontFamily
        //             }}
        //             color='#9A1750'
        //             >
        //         Loading...
        //         </Typography>
        //     </Box>
        //     );
        // }

        
        // useEffect(() => {
            //     if(isSignedIn){
                //         createUser();
                //         updateInventory();
                //     }
                
                // },[createUser, isSignedIn]);
                
    return(
       
            <Box
                        width='100vw'
                        height='100vh'
                        bgcolor='#E3E2DF'
                        display='flex'
                        flexDirection='column'
                        padding={10}
                        gap={4}
                        >
                <Stack
                    width='100%'
                    height='20%'
                    direction='row'
                    display='flex'
                    sx={{
                        justifyContent:'space-between'

                    }}
                >
                    <Typography
                        variant='h2'
                        sx= {{
                                fontFamily: ranchers.style.fontFamily
                            }}
                        color='#9A1750'
                    >
                        Welcome, { user?.firstName}
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
                        <MenuIcon/>
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
                <Stack
                    direction='row'
                    sx={{

                        justifyContent:'space-between'
                    }}
                    width='100%'
                    height='30%'
                >
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
                                sx = {{
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
                    <Box
                        display='flex'
                        flexDirection='row'
                        gap={3}
                    >
                        <Modal
                            open={sortByModalOpen}
                            onClose={handleSortByHandleClose}
                        >
                            <Box
                                position={"absolute"}
                                top="50%"r
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
                                {/* <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label" >Sort By</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <Stack
                                        direction='row'                            
                                    >
                                        <Stack
                                            direction='column'
                                        >
                                            <FormControlLabel value='nameAsc' control={ <Radio
                                                onChange={() => {
                                                    console.log('radio pressed');
                                                    // setNameOrder();
                                                }}
                                            />} label='Name Asc'/>
                                            <FormControlLabel value='catAsc' control={ <Radio/>} label='Category Asc'/>
                                            <FormControlLabel value='quantAsc' control={ <Radio/>} label='Quantity Asc'/>

                                        </Stack>
                                        <Stack
                                            direction='column'
                                        >
                                            <FormControlLabel value='nameDesc' control={ <Radio/>} label='Name Desc'/>
                                            <FormControlLabel value='catDesc' control={ <Radio/>} label='Category Desc'/>
                                            <FormControlLabel value='quantDesc' control={ <Radio/>} label='Quantity Desc'/>
                                            
                                        </Stack>
                                    </Stack>
                                </RadioGroup>

                                </FormControl> */}

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
                                            control ={
                                                <Checkbox
                                                    checked={categoryListFilters.includes(categoryName)}
                                                    onChange={() => {
                                                        console.log("checkbox pressed")
                                                        handleCategoryFilterChange(categoryName);
                                                    }}
                                                    sx = {{
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
                            onClick={() =>{
                                filterHandleOpen();
                            }}
                        >
                            <Typography>Filter By</Typography>
                        </Button>

                        <TextField
                            id='searchFieldTextField'
                            variant='standard'
                            sx={{
                                height:'10px'
                            }}
                            label='Search by Name...'
                            onChange={(e) => {
                                setItemSearchName(e.target.value);
                            }}
                        />
                        <Box
                            display='flex'
                            sx={{

                                justifyContent:'center'
                            }}
                            alignItems='start'
                            padding={2}
                        >
                            <SearchIcon
                                // color='#5D001E'
                                sx={{
                                    color: '#5D001E',
                                    
                                    justifyContent:'center'
                                }}
                                
                            />

                        </Box>
                        <IconButton
                            
                            sx={{
                                width:'10px',
                                height:'10px'
                            }}
                        >
                        </IconButton>

                    </Box>
                </Stack>
                <Box
                >
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow
                                        bgcolor='#E3AFBC'
                                    >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                            <TableBody>
                                {pantry
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    if((itemSearchName === '' || row.name.includes(itemSearchName)) && (categoryListFilters.length === 0 || categoryListFilters.includes(row.category)) && (row.quantity >= minMaxQuantity[0] && row.quantity <= minMaxQuantity[1] )){
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    if (column.label === 'Update'){
                                                        return (
            
                                                            <TableCell key={column.id} align={column.align}>
                                                                <Stack
                                                                    direction='row'
                                                                >
                                                                    <Button
                                                                        variant="contained"
                                                                        sx = {{
                                                                            background: '#5D001E',
                                                                            '&:hover': {
                                                                                backgroundColor: '#9A1750'
                                                                            }
                                                                        }}
                                                                        onClick={() => {
                                                                            addItem(value);
                                                                        }}
                                                                        
                                                                    >+</Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        sx = {{
                                                                            background: '#5D001E',
                                                                            '&:hover': {
                                                                                backgroundColor: '#9A1750'
                                                                            }
                                                                        }}
                                                                        onClick={() => {
                                                                            removeItem(value);
                                                                        }}
                                                                    >-</Button>
            
                                                                </Stack>
                                                            </TableCell>
                                                        );
                                                    } else {
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                            {/* {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value} */}
                                                            {value}
                                                            </TableCell>
                                                        );
            
                                                    }
                                                })}
                                            </TableRow>
                                        );
                                    }
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={pantry.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </Box>
        
    )
}