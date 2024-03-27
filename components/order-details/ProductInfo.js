import React from 'react'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'

const ProductInfo = ({item}) => {
  return (
    <>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Product Info
              </Typography>
            </Grid>
            
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField value={item?.product?.name} name="name"  fullWidth label='Product Name' placeholder='Cotton Panjabi for men' defaultValue='' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField value={item?.quantity} name="quantity"  fullWidth label='Product Quantity' placeholder='Quantity' defaultValue='' />
          </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="unit-price">Unit Price</InputLabel>
          <TextField
            id="unit-price"
            fullWidth
            placeholder="Unit Price"
            value={item?.unitPrice}
          />
        </FormControl>
      </Grid>
    </Grid>
            </>
  )
}

export default ProductInfo
