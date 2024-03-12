import { Box, Button, ListItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import Link from 'next/link';
import { fetchBanners,removeBanner, setBanner } from 'features/banner/bannerSlice';

import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddBanner from 'components/banner/add_banner';
import EditBanner from 'components/banner/edit_banner';

const index = () => {
  const dispatch = useDispatch()
  const [openAddBanner, setOpenAddBanner] = useState(false);
  const [openEditBanner, setOpenEditBanner] = useState(false);
  
  const {banners}= useSelector((state) => state.banner)

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
      if(banners.length===0)
      dispatch(fetchBanners())
    }, [dispatch])

    const handleDelete = (id) => {
      dispatch(removeBanner(id))
    }


    return (
        <div>
            {/* SHOW Category text and add a Add button and the end of the screen */}
            <div style={headerStyle}>
                <Typography variant="h6" style={categoryTextStyle}>
                    Banners {banners.length}
                </Typography>
                <div>
                <AddBanner open={openAddBanner} setOpen={setOpenAddBanner}/>
                <EditBanner open={openEditBanner} setOpen={setOpenEditBanner}/>
                </div>
                
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
            <TableCell sx={{ minWidth: 100 }}>
                    Image
                  
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                    Page URL
                  
                </TableCell>
                <TableCell sx={{ minWidth: 100 }}>
                    Button Text
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
                  banners.map((banner) => (
                    <TableRow key={banner.id}>
                      <TableCell>
                        <img src={process.env.API_URL+banner.imageUrl} alt={banner.name} style={{ width: '50px' }} />
                      </TableCell>
                      <TableCell>
                        {banner.pageUrl}
                      </TableCell>
                      <TableCell>
                        {banner.buttonText}
                      </TableCell>
                      <TableCell>
                        {banner.status}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          
                            <Button
                            onClick={() => {
                              dispatch(setBanner(banner))
                              setOpenEditBanner(true)
                            }
                            }

                             variant="contained" color="primary">
                              Edit
                            </Button>
                          
                          <Button onClick={()=>{
                            handleDelete(banner.id)
                            console.log("huss")
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
