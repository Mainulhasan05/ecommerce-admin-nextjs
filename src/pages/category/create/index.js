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
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import { useTheme } from '@mui/material/styles';
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { fetchCategories,addCategory } from 'features/category/categorySlice'
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { CloudUploadOutline } from 'mdi-material-ui'
import axiosInstance from 'utils/axiosInstance'
import toast from 'react-hot-toast'

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
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    if (categories.length === 0)
      dispatch(fetchCategories())
  }, [dispatch])
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  // ** States
  const [file, setFile] = useState(null)
  const [categoryObj, setcategoryObj] = useState({
    name:"",
    description:"",
    parentId:null,
    sortValue:0,
    image:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setcategoryObj({ ...categoryObj, [name]: value })
    
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('name', categoryObj.name)
    formData.append('description', categoryObj.description)
    formData.append('parentId', categoryObj.parentId)
    formData.append('sortValue', categoryObj.sortValue)
    formData.append('image', file)
    try {
      // dispatch(addCategory(categoryObj))
      const response=await dispatch(addCategory(formData))
      if(response.payload.success){
        toast.success(response?.payload?.message)
      }
      else{
        toast.error(response?.payload?.message)
      }
      
    }
    catch (error) {
      toast.error('Category Creation Failed')
    }
  }

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };


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

  const handleConfirmPassChange = prop => event => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickConfirmPassShow = () => {
    setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
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
      <CardHeader title='Create Category' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField name='name' onChange={handleChange} fullWidth label='Category Name' placeholder='Leonard Carter' />
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
        {/* Optional: Show selected image preview */}
        {file && (
          <img src={URL.createObjectURL(file)} alt="Selected file" style={{ maxWidth: '100%' }} />
        )}
      </div>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-multiple-chip-label">Parent Category</InputLabel>
              <Grid item xs={12}>
                <select className='form-control' onChange={handleChange} name="parentId" id="">
                  <option value="">Select Parent Category</option>
                  {categories.map((cat) => (
                    <option key={cat?.id} value={cat?.id}>
                      {cat?.name}
                    </option>
                  ))}
                </select>
                {/* <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange2}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {categories.map((cat) => (
                    <MenuItem
                      key={cat?.id}
                      value={cat?.name}
                      style={getStyles(name, personName, theme)}
                    >
                      {cat?.name}
                    </MenuItem>
                  ))}
                </Select> */}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>

                <TextField
                  fullWidth
                  multiline
                  name='description'
                  onChange={handleChange}
                  minRows={3}
                  label='Description (Optional)'
                  placeholder='Description...'
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position='start'>
                //       <MessageOutline />
                //     </InputAdornment>
                //   )
                // }}
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
                  Create
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 2 }}>Already have an account?</Typography>
                  <Link href='/' onClick={e => e.preventDefault()}>
                    Log in
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default index
