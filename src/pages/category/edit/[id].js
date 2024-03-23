// ** React Imports
import { useEffect, useState } from 'react'
import React from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { useTheme } from '@mui/material/styles';
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import {  editCategory, fetchCategory, fetchParentCategories } from 'features/category/categorySlice'
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { Checkbox, MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { CloudUploadOutline } from 'mdi-material-ui'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const index = () => {
  const dispatch = useDispatch();
  const { parentCategories,category } = useSelector((state) => state.category)
  const router=useRouter()
  const [categoryObj, setcategoryObj] = useState({
    name:"",
    description:"",
    parentId:'',
    sortValue:0,
    image:"",
    isFeatured:false
  })
  useEffect(() => {
    if(router.query.id)
      dispatch(fetchCategory(router.query.id)
    )
    if(category){
      setcategoryObj(category)
    }
  }, [router.query])
  useEffect(() => {
    
    if(category){
      setcategoryObj(category)
    }
  }, [category])
  useEffect(() => {
    if (parentCategories.length === 0)
      dispatch(fetchParentCategories())
  }, [dispatch])
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  // ** States
  const [file, setFile] = useState(null)
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setcategoryObj({ ...categoryObj, [name]: value })
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('id', categoryObj.id)
    formData.append('name', categoryObj.name)
    formData.append('description', categoryObj.description)
    formData.append('parentId', categoryObj.parentId)
    formData.append('sortValue', categoryObj.sortValue)
    formData.append('isFeatured', categoryObj.isFeatured=="on"?true:false)
    formData.append('image', file)
    try {
      
      const response=await dispatch(editCategory(formData))
      if(response.payload.success){
        toast.success(response?.payload?.message)
        router.push('/category')
      }
      else{
        toast.error(response?.payload?.message)
      }
      
    }
    catch (error) {
      toast.error('Category Creation Failed')
    }
  }



  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Optional: if you want to show the selected image on UI
    const reader = new FileReader();
    reader.onload = () => {
      // Do something with the uploaded image data
      const imageDataUrl = reader.result;
      // Here, you can set imageDataUrl to state or directly display it in UI
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <Card>
      <CardHeader title='Edit Category' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid spacing={5}>
          
            <Grid item xs={12}>
              <TextField value={categoryObj?.name} name='name' onChange={handleChange} fullWidth label='Category Name' placeholder='Leonard Carter' />
            </Grid>
            <Grid item xs={12}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}              
              startIcon={<CloudUploadOutline />}
            >
              Upload file
              <VisuallyHiddenInput  onChange={handleFileChange} type="file" />
            </Button>
            <div>
        <img src={process.env.API_URL+categoryObj?.image} width={100} height={100} alt="" />
        {file && (
          <img src={URL.createObjectURL(file)} alt="Selected file" style={{ maxWidth: '20%' }} />
        )}
      </div>
            </Grid>
            <br />
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Parent Category</InputLabel>
              <Select
                name='parentId'
                onChange={handleChange}
                value={categoryObj.parentId}
                label='Product Type' >
                  {
                    parentCategories.map((cat) => (
                      <MenuItem
                        key={cat?.id}
                        value={cat.id}
                        style={getStyles(cat, personName, theme)}
                      >
                        {cat?.name}
                      </MenuItem>
                    ))

                  }
              </Select>
            </FormControl>
          </Grid>

            <br />
            <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              value={categoryObj.sortValue}
              name='sortValue'
              type='number'
              onChange={handleChange}
              label='Sort Value'
              placeholder='0'
            />
            <Grid item xs={12}>
            <Checkbox name='isFeatured' value={categoryObj.isFeatured} onChange={handleChange} />
            Is Featured
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>

                <TextField
                  fullWidth
                  multiline
                  name='description'
                  value={categoryObj.description}
                  onChange={handleChange}
                  minRows={3}
                  label='Description (Optional)'
                  placeholder='Description...'
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                />
              </FormControl>
            </Grid>
           
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button onClick={handleSubmit} type='submit' variant='contained' size='large'>
                  Update
                </Button>
                
              </Box>
            </Grid>
          </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default index
