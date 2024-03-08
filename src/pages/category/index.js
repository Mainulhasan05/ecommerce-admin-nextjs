

import { Box, Button, ListItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import Link from 'next/link';
import { fetchCategories } from 'features/category/categorySlice';
import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const index = () => {
  const dispatch = useDispatch()
  const {categories}= useSelector((state) => state.category)
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
      if(categories.length===0)
      dispatch(fetchCategories())
    }, [dispatch])
  

    return (
        <div>
            {/* SHOW Category text and add a Add button and the end of the screen */}
            <div style={headerStyle}>
                <Typography variant="h6" style={categoryTextStyle}>
                    Category Text
                </Typography>
                <Link href="/category/create">
                    <Button variant="contained" color="primary">
                        Add Category
                    </Button>
                </Link>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              
                <TableCell sx={{ minWidth: 100 }}>
                    Name
                  
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                    Description
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                    Parent
                </TableCell>
                
                <TableCell sx={{ minWidth: 100 }}>
                    Actions
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
                {
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        {category.name}
                      </TableCell>
                      <TableCell>
                        {category.description}
                      </TableCell>
                      <TableCell>
                        {category.parent}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <Link href={`/category/edit/${category.id}`}>
                            <Button variant="contained" color="primary">
                              Edit
                            </Button>
                          </Link>
                          <Button variant="contained" color="error">
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
