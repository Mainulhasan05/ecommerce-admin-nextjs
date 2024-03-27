import React from 'react'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import { Divider } from '@mui/material'

const ProductInfo = ({ item }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant='body2' sx={{ fontWeight: 600 }}>
          2. Product Info
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ marginBottom: 0 }} />
      </Grid>
      <br />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          
          <img src={process.env.API_URL+ item?.product?.image} alt={item?.product?.name} style={{ width: '100%', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField value={item?.product?.name} name="name" fullWidth label='Product Name' placeholder='Cotton Panjabi for men' defaultValue='' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField value={item?.quantity} name="quantity" fullWidth label='Product Quantity' placeholder='Quantity' defaultValue='' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField value={item?.unitPrice} name="unit_price" fullWidth label='Unit Price' placeholder='Quantity' defaultValue='' />
        </Grid>

        {/* Give a summary, totalPrice, */}
        <Grid item xs={12}>
          <Divider sx={{ marginBottom: 0 }} />
        </Grid>

        <Grid item xs={12} sm={6}>
        <Typography variant="h6" >
          Total Price
        </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography variant="h6" >
        ৳{item?.totalAmount}
        </Typography>
        </Grid>
        
      </Grid>
    </>
  )
}

export default ProductInfo
