'use client'
import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, CardMedia, TextField, Button, Modal,Card,CardContent,Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText,PaperProps,Popover, } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'8px'
};



const AllArticles = () => {

  const route = useRouter()

  const [card,setCard] = useState([])
  const [card1,setCard1] = useState([])
  const [user1Id,setuserid] = useState()
  const [useeffect,setuseffect] = useState()
  const [myProfile,setMYProfile] = useState(false)
  useEffect(()=>{
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/articleapi',
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      setCard(response.data.data.reverse())
      setCard1(response.data.data.reverse())
      setuserid(localStorage.getItem('user'))

    })
    .catch((error) => {
      console.log(error);
    });
  },[])

  // this is popup

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  // this is modal

  const [open1, setOpen1] = React.useState(false);
  const handleOpenModal = () => setOpen1(true);
  const handleCloseModal = () => setOpen1(false);

  // this is input modal

  const [title,setTitle] = useState('')
  const [discription,setDiscription] = useState('')
  const [url,setUrl] = useState('')
  
  const handlesaveArticle = () => {
    let useruid1=localStorage.getItem("user")
console.log(useruid1)
if(useruid1==""|| title==""|| discription==""||url==""){
  alert("Plese Filled all input")
}else{



  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/savearticle',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : {
      uid:useruid1,
       title:title,
      discription:discription,
      image:url
    }
  };
  
  axios.request(config)
  .then((response) => {
    // console.log(JSON.stringify(response.data));
    setOpen1(false)
    setuseffect(useeffect+1)
    setTitle('')
    setDiscription('')
    setUrl('')
    console.log(response.data.data)
    setCard1(response.data.data.reverse())
  

  })
  .catch((error) => {
    console.log(error);
  });
  


}


  }

  const handleProfile = ()=>{
    // console.log(myProfile)
    if(myProfile) {
      setMYProfile(false)
      setCard(card1)
      // handleClick()
    }else{
      let useruid1=localStorage.getItem("user")
      setMYProfile(true)
      let profileCard = card.filter((v,i) => {
        return v.uid === useruid1
      })
      setCard(profileCard)
      // handleClick()
    }
  }

  const handleDelete = (e) => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/userEdit/${e}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  const handleEdit = () => {

  }

  return (
    <>
    <Box align='center' className='background' sx={{height:'100vh',width:'!00%'}}>
      <Box sx={{display:'flex',justifyContent:'space-around',py:1,alignItems:"center"}}>
        <Box>
        <div>
 <Button aria-describedby={id} variant="contained" sx={{backgroundColor:'blue !important'}} onClick={handleClick}>
          {myProfile?'My Profile': 'Articles'}
      </Button>
      

        <Popover
       id={id}
       open={open}
       anchorEl={anchorEl}
       onClose={handleClose}
       anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'left',
       }}
      >
        <Box  sx={{ p: 1, bgcolor: 'background.paper' }}>
        <Button fullWidth onClick={handleProfile} >{myProfile ? 'All Articles':'MyProfile'}</Button>
        <Button fullWidth onClick={()=> route.push('/')}>logout</Button>
        </Box>
      </Popover>
    </div>
       {/* <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div> */}
        </Box>
        <Box>
          {
            myProfile &&
        <Button onClick={handleOpenModal}>Add Your Title</Button>
          }

        </Box>
        <Box>
        <TextField id="standard-basic" label="Standard" variant="standard" />
        </Box>

      </Box>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="col-auto"></div>
  <div class="col-auto ">
    <Box className='scroll' sx={{ width: '80%', height: '500px', overflow: 'auto', mt: 2 }}>


    {
      card.map((v,i)=>{
        return(

        <Card key={i} sx={{ maxWidth: 345,mt:4 }}>
      <CardMedia
        component="img"
        alt="Image not found"
        height="140"
        image={v.image}
      />
      <CardContent>
        <Box display='flex' justifyContent='center'>
        <Typography gutterBottom variant="h5" component="div">
          {v.title}
        </Typography>
        
        {/* <CiMenuKebab/> */}

        </Box>
        <Typography variant="body2" color="text.secondary">
          {v.discription}
        </Typography>
        {
          myProfile &&
        <Box sx={{display:'flex',justifyContent:'center'}}>
          <Button variant='contained' color='error' sx={{mr:2,backgroundColor:'red !important'}} onClick={()=>handleDelete(v._id)}>Delete</Button>
          <Button variant='contained' sx={{backgroundColor:'blue !important'}} onClick={handleEdit}>Edit</Button>
        </Box>
        }
      </CardContent>
 
    </Card>
        )
      })
    }
        </Box>

  </div>
</div>

    </Box>

      <Box>
      <div>
      <Modal
        open={open1}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Your Title
          </Typography>
      
          <TextField id="standard-basic"value={title} onChange={(e)=>setTitle(e.target.value)} fullWidth label="Title" variant="standard" required />
          <TextField id="standard-basic" value={discription} onChange={(e)=>setDiscription(e.target.value)} sx={{mt:2}} fullWidth label="Discription" variant="standard" required/>
          <TextField id="standard-basic" value={url} sx={{mt:2}} onChange={(e)=>setUrl(e.target.value)} fullWidth label="Image" variant="standard" required/>
          <Box sx={{display:'flex',justifyContent:'center',mt:2}}>
          <Button color='error' sx={{mr:2}} variant='outlined' onClick={handleClose}>
          close
      </Button>
          <Button color='primary' sx={{backgroundColor:'blue !important'}} variant='contained' onClick={handlesaveArticle}>
          Save
      </Button>

          </Box>
      

        </Box>
      </Modal>
    </div>
      </Box>
    </>
  )
}

export default AllArticles
