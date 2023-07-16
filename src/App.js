import { useState } from "react";
import Home from "./Components/Home";
import { PuffLoader } from "react-spinners";
import { Box } from "@mui/material";
function App() {

const[loading , setLoading] = useState(true)

setTimeout(() => {
  setLoading(false)
}, 2000);

  return (
    <>
    {
      loading ? (
        <Box sx={{background:"#d1e0db" , minHeight:"100vh" , display:"flex" , justifyContent:"center" , alignItems:"center"}}>
         <PuffLoader color="#32d3e7" />
        </Box> 
      ) : (
        <Home/>
      )
    }
    </>
  );
}

export default App;
