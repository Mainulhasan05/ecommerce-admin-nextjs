// ** React Imports
import { useEffect, useState } from 'react'
import axiosInstance from 'utils/axiosInstance'
import { useRef } from 'react'


// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import TextEditor from '../text_editor/TextEditor';
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { addProduct } from 'features/product/productSlice'
// ** Icons Imports
import Chip from '@mui/material/Chip';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from 'features/category/categorySlice'
import { OutlinedInput } from '@mui/material'
import { useTheme } from '@emotion/react'
import Multiselect from 'multiselect-react-dropdown';
import { Editor } from '@tinymce/tinymce-react'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

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

const ProductBasicInfo = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.category)
  const editorRef = useRef(null);
  useEffect(() => {
    if (categories.length === 0)
      dispatch(fetchCategories())
  }, [dispatch])

  const [productObj, setProductObj] = useState({
    name: '',
    description: '',
    quantity: 10,
    status: 'active',
    old_price: 80,
    new_price: 60,
    categoryIds: [],
  })
  const [openAlert, setOpenAlert] = useState(true)
  const [files, setFiles] = useState([])
  const [imgSrc, setImgSrc] = useState('/images/placeholder.jpg')

  const handleDescriptionChange = (content, editor) => {
    setProductObj({ ...productObj, description: content })
  }

  const onChange = (event) => {
    // Handle file selection here
    const files = Array.from(event.target.files);
    // only take maximum of 5 images, and check if the file is an image, and the size is less than 800K
    const filteredFiles = files.filter((file) => file.type.includes('image') && file.size < 800000);
    // if length of filteredFiles and files are not the same, then some files are not images or are too large, show a toast
    if (filteredFiles.length !== files.length) {
      toast.error('Only images are allowed, and the size of the image should be less than 800K');
    }
    if (filteredFiles.length > 5) {
      toast.error('You can only upload 5 images at a time');
      return;
    }

    setFiles(filteredFiles);
  };


  const handleChange = (e) => {
    setProductObj({ ...productObj, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // convert the inputs into form data, send all images and other data to the server
    try {
      const formData = new FormData()
      for (const key in productObj) {
        formData.append(key, productObj[key])
      }
      formData.set('categoryIds', JSON.stringify(productObj.categoryIds))
      files.forEach((file) => {
        formData.append('images', file);
      });
      const response=await dispatch(addProduct(formData))
      console.log(response)
      if(response.payload.success){
        toast.success(response?.payload?.message)
      }
      else{
        if(!response?.payload?.message.includes('404')){
          toast.error(response?.payload?.message)
        }
        
      }
    } catch (error) {
      console.log(error)
      // toast.error(error.response.data.message)
    }
  }
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange2 = (event) => {
    if(event.target.value.length>3){
      toast.error('You can only select 3 categories at a time')
      return
    }
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );

    setProductObj({...productObj, categoryIds: value.map((val)=>val.id)})
    
  };

  
  

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              {
                files.length > 0 ?
                  files.map((file, index) => (
                    <ImgStyled key={index} src={URL.createObjectURL(file)} alt='user-avatar' />
                  ))
                  :
                  <ImgStyled src={imgSrc} alt='user-avatar' />
              }
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Product Photos
                  <input
                    hidden
                    type='file'
                    multiple={true}
                    onChange={onChange}
                    max={5}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setFiles([])}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K. <b>"Max: 5 images, 800K each."</b>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField value={productObj.name} name="name" onChange={handleChange} fullWidth label='Product Name' placeholder='Cotton Panjabi for men' defaultValue='' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={productObj.quantity} name='quantity' onChange={handleChange} fullWidth label='Product Quantity' placeholder='10' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              value={productObj.new_price}
              name='new_price'
              onChange={handleChange}
              type='number'
              label='New Price'
              placeholder='60'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              value={productObj.deliveryChargeOutsideChapai}
              name='old_price'
              type='number'
              onChange={handleChange}
              label='Old Price'
              placeholder='80'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name='status'
                onChange={handleChange}
                value={productObj.status}
                label='Status' >
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
              <InputLabel>Product Category</InputLabel>
              <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  placeholder='Select Category'
                  label='Select Category'
                  
                  value={personName}
                  onChange={handleChange2}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value.name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {categories.map((cat) => (
                    <MenuItem
                      key={cat?.id}
                      value={cat}
                      style={getStyles(name, personName, theme)}
                    >
                      {cat?.name}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
          </Grid>
          

          <Grid item xs={12} sm={12}>
            <Typography variant='h6' sx={{ marginBottom: 2.5 }}>
              Product Description
            </Typography>
            
      {/* <Editor apiKey={process.env.TINY_MCE_API}/> */}
            <TextEditor initialValue={productObj.description} onChange={handleDescriptionChange} />
          </Grid>



          <Grid item xs={12}>
            <Button onClick={(e) => {
              if (productObj.id) {

                handleUpdate(e)
              }
              else {

                handleSubmit(e)
              }
            }} variant='contained' sx={{ marginRight: 3.5 }}>
              Add Product
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default ProductBasicInfo
