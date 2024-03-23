

import { Box, Button, ListItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import Link from 'next/link';
import { fetchCategories,removeCategory } from 'features/category/categorySlice';
import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from 'features/product/productSlice';
const index = () => {
  const dispatch = useDispatch()
  const {categories}= useSelector((state) => state.category)
  const {products} = useSelector((state) => state.product)
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
      if(products.length===0)
      dispatch(fetchProducts())
    }, [dispatch])

    const handleDelete = (id) => {
      
      dispatch(removeCategory(id))
    }


    return (
        <div>
            {/* SHOW Category text and add a Add button and the end of the screen */}
            <div style={headerStyle}>
                <Typography variant="h6" style={categoryTextStyle}>
                    Products
                </Typography>
                <Link href="/products/create">
                    <Button variant="contained" color="primary">
                        Add Product
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
                    Image
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                    Name
                  
                </TableCell>
                
                <TableCell sx={{ minWidth: 100 }}>
                    New Price
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                    Views
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                    Status
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                    Actions
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
                {
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.id}
                      </TableCell>
                      <TableCell>
                        <img src={process.env.API_URL+product.image} alt={product.name} style={{ width: '50px' }} />
                      </TableCell>
                      <TableCell>
                        {product.name}
                      </TableCell>
                      
                      <TableCell>
                        {product?.new_price}
                      </TableCell>
                      <TableCell>
                        {product?.views}
                      </TableCell>
                      <TableCell>
                        {product?.status}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <Link href={`/products/edit/${product.id}`}>
                            <Button variant="contained" color="primary">
                              Edit
                            </Button>
                          </Link>
                          <Button onClick={()=>{
                            handleDelete(product.id)
                            
                          }} variant="contained" color="error">
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
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
