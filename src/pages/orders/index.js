

import { Box, Button, ListItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import Link from 'next/link';
import { fetchOrders } from 'features/orders/orderSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const index = () => {
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.order)
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f0f0f0',
  };

  const categoryTextStyle = {
    marginLeft: '8px',
  };

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    if(orders.length === 0)
      dispatch(fetchOrders())
      
  }, [dispatch])

  

  return (
    <div>
      
      <div style={headerStyle}>
        <Typography variant="h6" style={categoryTextStyle}>
          Your Orders
        </Typography>
        <Link href="/category/create">
          <Button variant="contained" color="primary">
            Add Order
          </Button>
        </Link>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
              <TableCell sx={{ minWidth: 100 }}>
                  Id
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                  Actions
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                  Customer Name
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                  Customer Phone

                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                  Date
                </TableCell>
                {/* <TableCell sx={{ minWidth: 100 }}>
                  Total Amount
                </TableCell> */}

                
              </TableRow>
            </TableHead>
            <TableBody>

              {
                orders.map((order) => (
                  <TableRow key={order.id}>
                     <TableCell>
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        
                          <Link href={`/order-details/${order.id}`}>
                            <Button variant="contained" color="primary">
                              View 
                            </Button>
                          </Link>
                        
                      </Stack>
                    </TableCell> 
                    <TableCell>
                      {order?.customerName}
                    </TableCell>
                    <TableCell>
                      {order?.customerPhoneNumber}
                    </TableCell>
                    <TableCell>
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </TableCell>
                    {/* <TableCell>
                      {order?.totalAmount}
                    </TableCell> */}
                    
                  </TableRow>
                ))
              }

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={5}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

    </div>
  )
}

export default index
