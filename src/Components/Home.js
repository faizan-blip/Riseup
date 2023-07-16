import { Box , TextField , InputAdornment, Button, IconButton, Skeleton, Typography,Dialog, DialogTitle, DialogContent, DialogActions, Tooltip,} from '@mui/material'
import React , {useEffect, useState} from 'react'
import logo from '../Components/Images/logo (2).png'
import {FcSearch} from 'react-icons/fc'
import {TbDetails} from 'react-icons/tb'
import {AiOutlineLink ,AiOutlineDownload} from 'react-icons/ai'
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [resultdata , setResultData] = useState([])
    const[alwaysdata , setAlwaysdata] = useState([])
    const[but , seBut] = useState([])
    const [loading , setLoading] = useState(true)
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const types =[
    "Mountaines" , "Flowers" , "Beaches" , "Cities"
  ]

  const search = async()=>{
    try{
         setLoading(true)
        const response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=jcLmHN40dCmP7jCYj-vnimZtysVN91NVdnqW4t44xdU&query=${searchTerm}`);
        console.log(response.data);
        setResultData(response.data.results)
        setLoading(false)
    } catch(err){
       toast.error(err.message)
    }
       
  }

  const always = async()=>{
    try{
        setLoading(true)
        const response = await axios.get(`https://api.unsplash.com/photos/?client_id=jcLmHN40dCmP7jCYj-vnimZtysVN91NVdnqW4t44xdU`);
        console.log(response.data);
        setAlwaysdata(response.data)
        setLoading(false)
    } catch(err){
        toast.error(err.message)
    }
  }

  const show = async(type)=>{
    try{
        const response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=jcLmHN40dCmP7jCYj-vnimZtysVN91NVdnqW4t44xdU&query=${type}`);
        console.log(response.data);
        seBut(response.data.results)
    } catch(err){
        toast.error(err.message)
    }
  }

  useEffect(()=>{
    always()
  },[])

  const skl=[
    "1" , "2" ,"3" , "4",
  ]


  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const openinfo = (id) => {
    setSelectedImage(alwaysdata[id]);
    setOpen(true);
  };

  const openinfo1 = (id) => {
    setSelectedImage(but[id]);
    setOpen(true);
  };
  
  const openinfo2 = (id) => {
    setSelectedImage(resultdata[id]);
    setOpen(true);
  };
  const closeInfo = () => {
    setSelectedImage(null);
    setOpen(false);
  };
  return (
    <>
    <Toaster/>
        <Box sx={{width:"100%" , minHeight:"100vh" , height:"100%"  , background:"#d1e0db" , display:"flex" , justifyContent:"center" , padding:"2em 0"}}>
            <Box sx={{display:"flex" , flexDirection:"column" , gap:"2em" , alignItems:"center"}}>
             <motion.div
              initial={{y:-100 , opacity:0}}
              animate={{y:0 , opacity:1}}
              transition={{duration:0.5 , delay:"0.5"}}
             >
             <Box>
             <img src={logo} alt='logo.png' width={100} height={50} />
             </Box>
             </motion.div>
             <motion.div
             initial={{y:-100 , opacity:0}}
             animate={{y:0 , opacity:1}}
             transition={{duration:0.5}}
             >
             <TextField
        id="search"
        type="search"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width:{sm:600 , xs:300}, background:"#ebf4f1" ,boxShadow:" inset 20px 20px 60px #b2beba,inset -20px -20px 60px #f0fffc"}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
             <Box sx={{padding:"0.3em 0.3em" , background:"#32d3e7" , boxShadow:"inset 20px 20px 60px #2bb3c4,inset -20px -20px 60px #3af3ff"}}> <IconButton onClick={search}><FcSearch size={30} /></IconButton> </Box>
            </InputAdornment>
          ),
        }}
      />
         
         </motion.div>
         <Box sx={{display:"flex" , alignItems:"center", flexWrap:"wrap" , justifyContent:{sm:"start" , xs:"center"} }}>
            {
                types.map((type , index)=>(
                    <Button onClick={()=> show(type)} variant='outlined' key={index} sx={{margin:{sm:"0 2em" , xs:"1em 1em"} , borderColor:"#0c133b !important" , color:"#0c133b" , width:"10em" , fontWeight:"700",borderRadius:"7px" }}>
                      {type}
                    </Button>
                ))
            }
         </Box>
         {
            loading && (
                <Box sx={{display:"flex" , gap:"1.2em"}}>
                {skl.map((idd) => (
                    <Skeleton
                      key={idd}
                      height={400}
                      sx={{ minWidth: "300px", flexGrow: "1" }}
                    />
                  ))}
                  </Box>
            )
         }
     
     <Box sx={{ display: "flex", flexDirection: "column", margin: { md: "1.2em 7em", xs: "1.2em 0em" } }}>
        <Box sx={{display:"flex" , gap:"1.2em" , flexWrap:"wrap" , justifyContent:{sm:"start" , xs:"center"}}}>
        {
  resultdata.length > 0 ? (
    null
  ) : (
    but.map((result, id) => (
      <motion.div
        key={id}
        whileHover={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className='hover'
      >
        <img
          src={result.urls.full}
          alt={result.alt_description}
          style={{ minWidth: "300px", height: "200px", flexGrow: "1", borderRadius: "10px" }}
          className='img'
        />
         <Box className="overlay" sx={{display:"flex" , flexDirection:"column"}}>
   <IconButton onClick={()=>openinfo1(id)}><TbDetails size={30} color='#0c133B'/></IconButton> 
  <Typography color='#ebf4f1'>Click Here</Typography> 
  </Box>
      </motion.div>
    ))
  )
}{
  resultdata.length > 0 ? (
    null
  ) : (
    alwaysdata.map((all, id1) => (
      <motion.div
        key={id1}
        whileHover={{ scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className='hover'
      >
        <img
          src={all.urls.full}
          alt={all.alt_description}
          style={{ minWidth: "300px", height: "200px", flexGrow: "1", borderRadius: "10px" }}
          className='img'
        />
         <Box className="overlay" sx={{display:"flex" , flexDirection:"column"}}>
   <IconButton onClick={()=>openinfo(id1)}><TbDetails size={30} color='#0c133B'/></IconButton> 
  <Typography color='#ebf4f1'>Click Here</Typography> 
  </Box>
      </motion.div>
    ))
  )
}
      {resultdata.length > 0  && (
        resultdata.map((result, id) => (
          <motion.div
            key={id}
            whileHover={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className='hover'
          >
            <img
              src={result.urls.full}
              alt={result.alt_description}
              style={{ minWidth: "300px", height: "200px", flexGrow: "1", borderRadius: "10px" }}
              className='img'
            />
             <Box className="overlay" sx={{display:"flex" , flexDirection:"column"}}>
   <IconButton onClick={()=>openinfo2(id)}><TbDetails size={30} color='#0c133B'/></IconButton> 
  <Typography color='#ebf4f1'>Click Here</Typography> 
  </Box>
          </motion.div>
        ))
      ) 
        }
    </Box>
    </Box> 
             </Box>
             {selectedImage && (
        <Dialog open={open} onClose={closeInfo} PaperProps={{sx:{background:"#d1e0db"}}}>
          <DialogTitle sx={{fontWeight:"700" , fontSize:"20px"}} >Details</DialogTitle>
          <DialogContent>
            <img src={selectedImage.urls.full} alt={selectedImage.alt_description} style={{ width: "100%" }} />
            <Box sx={{display:"flex" , flexDirection:"column" , gap:"0.7em" , marginTop:"0.8em"}}>
            <Typography sx={{display:"flex" , width:"100%" , fontWeight:"700" }}>Name : {selectedImage.user.first_name}</Typography>
            <Typography sx={{display:"flex" , width:"100%" }}>Bio : {selectedImage.user.bio}</Typography>
            <Box sx={{display:"flex" , gap:"0.2em"}}>
                <Tooltip placement='bottom' title='Portfolio' >
         <IconButton sx={{alignSelf:"flex-start" , background:"#0c133b !important"}}><AiOutlineLink color='#ebf4f1' onClick={()=>{
         const href = `${selectedImage.user.portfolio_url}`
         window.location.href = href;
         }}/></IconButton>
         </Tooltip>
         <Tooltip placement='bottom' title='Download here' >
           <IconButton sx={{alignSelf:"flex-start" , background:"#0c133b !important"}}><AiOutlineDownload color='#ebf4f1' onClick={()=>{
         const href = `${selectedImage.links.download}`
         window.location.href = href;
         }}/></IconButton>
         </Tooltip>
</Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeInfo} sx={{color:"#0c133b" , borderColor:"#0c133b !important"}} variant='outlined'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
             </Box>
        </>
  )
}
