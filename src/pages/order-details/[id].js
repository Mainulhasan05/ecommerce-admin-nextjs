import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import OrderDetails from 'components/order-details/OrderDetails'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchOrder } from 'features/orders/orderSlice'

const index = () => {
    const dispatch=useDispatch()
    const router=useRouter()
    useEffect(() => {
        
        if(router.query.id){
            dispatch(fetchOrder(router.query.id))
        }
    }, [dispatch, router.query.id])
    
  return (
    <div>
      <Grid item xs={12}>
          <OrderDetails />
        </Grid>
    </div>
  )
}

export default index
