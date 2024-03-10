// ** React Imports
import { useEffect, useState } from 'react'
import axiosInstance from 'utils/axiosInstance'
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
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { fetchShop } from 'features/user/userSlice'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

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

const TabShopDetails = () => {
  const dispatch=useDispatch()
  const {shop}=useSelector(state=>state.user)
  const [shopObj, setShopObj] = useState({
    name: '',
    description:'',
    status: 'inactive',
    deliveryChargeInsideChapai: 0,
    deliveryChargeOutsideChapai: 0,
  })
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/shop_logo.png')

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }
  useEffect(() => {
    if(shop){
      setShopObj(shop)
      setImgSrc(process.env.API_URL+shop.image)
    }
    else{
      dispatch(fetchShop())
    }
  }, [dispatch,shop])

  const handleChange= (e) => {
    setShopObj({...shopObj,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // convert the inputs into form data
      const formData = new FormData()
      for (const key in shopObj) {
        formData.append(key, shopObj[key])
      }
      // take the image from the state and append it to the form data
      const imageFile = document.querySelector('input[type="file"]').files[0];
      formData.append('image', imageFile);
      // /seller/shop, post request
      const response = await axiosInstance.post('/seller/shop', formData)
      console.log(response)
      if(response.status===201){
        toast.success('Shop Created Successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    alert("under construction")
    return
    try {
      // convert the inputs into form data
      const formData = new FormData()
      for (const key in shopObj) {
        formData.append(key, shopObj[key])
      }
      // take the image from the state and append it to the form data
      const imageFile = document.querySelector('input[type="file"]').files[0];
      formData.append('image', imageFile);
      // /seller/shop, put request
      const response = await axiosInstance.put('/seller/shop', formData)
      console.log(response)
      if(response.status===200){
        toast.success('Shop Updated Successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='shop_logo' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Shop Logo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K. {"(Optional)"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField value={shopObj.name} name="name" onChange={handleChange} fullWidth label='Shop Name' placeholder='Oloser Karukaj' defaultValue='johnDoe' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={shopObj.description} name='description' onChange={handleChange} fullWidth label='Short Description' placeholder='I make delicious and tasty cake'  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              value={shopObj.deliveryChargeInsideChapai}
              name='deliveryChargeInsideChapai'
              onChange={handleChange}
              type='number'
              label='Delivery Charge Inside Chapai'
              placeholder='20'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              value={shopObj.deliveryChargeOutsideChapai}
              name='deliveryChargeOutsideChapai'
              type='number'
              onChange={handleChange}
              label='Delivery Charge Outside Chapai'
              placeholder='20'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
              value={shopObj.status}
                label='Status'  inputProps={{ readOnly: true }}>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button onClick={(e)=>{
              if(shopObj.id){
                console.log("update")
                handleUpdate(e)
              }
              else{
                console.log("submit")
                handleSubmit(e)
              }
            }} variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
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

export default TabShopDetails
