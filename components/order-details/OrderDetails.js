// ** React Imports
import { forwardRef, useState } from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import ProductInfo from './ProductInfo'


// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { useSelector } from 'react-redux'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const OrderDetails = () => {
    const {order}=useSelector(state=>state.order)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  return (
    <Card>
      <CardHeader title='Order Details' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Customer Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor='form-layouts-separator-email'>Customer Name</InputLabel>
              <TextField fullWidth   value={order?.customerName}  />
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='form-layouts-separator-email'>Customer Phone</InputLabel>
              <TextField fullWidth type='text'  value={order?.customerPhoneNumber} />
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='form-layouts-separator-email'>Customer Address</InputLabel>
              <TextField fullWidth type='text'  value={order?.customerAddress} />
            </Grid>

            <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='form-layouts-separator-email'>Customer Note</InputLabel>
              <TextField fullWidth type='text'  value={order?.note} />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            
            {/* Product Info */}
            {
              order?.orderItems?.map((item, index) => (
                <ProductInfo key={index} item={item} />
              ))
            }
          </Grid>
          
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default OrderDetails
