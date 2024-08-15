import { SignUp } from "@clerk/nextjs";
import { Box } from "@mui/material";

export default function Page() {
  return(
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='100vw'
      height='100vh'
    >
      <SignUp />
    </Box>
  );
}