import { useState, React } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addBanner } from 'features/banner/bannerSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddBanner({open,setOpen}) {
  const dispatch=useDispatch();
  
    const [file, setFile] = useState(null);
  const [bannerObj, setBannerObj] = useState({
    type: 'home',
    sortValue: 0,
    pageUrl: '/',
    buttonText: '',
    status: 'inactive'
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleInputChange = (e) => {
        setBannerObj({ ...bannerObj, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // use try catch and if there is image then use form data
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', bannerObj.type);
        formData.append('sortValue', bannerObj.sortValue);
        formData.append('pageUrl', bannerObj.pageUrl);
        formData.append('buttonText', bannerObj.buttonText);
        formData.append('status', bannerObj.status);
        dispatch(addBanner(formData));
        
        handleClose();
    }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">Add Banner</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Banner
          </Typography>
        
    <FormControl>
    <input type="file" onChange={handleFileChange} />
    {file && <img src={URL.createObjectURL(file)} alt="banner" style={{ width: '100px' }} />}

    </FormControl>
    <FormControl>
    <TextField
        id="type"
        label="Type"
        name='type'
        type="text"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={bannerObj.type}
        onChange={handleInputChange}
    />
    </FormControl>
    <FormControl>
    <TextField
        id="sortValue"
        name='sortValue'
        label="Sort Value"
        type="number"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={bannerObj.sortValue}
        onChange={handleInputChange}
    />
    </FormControl>
    <FormControl>
    <TextField
        id="pageUrl"
        label="Page URL"
        name='pageUrl'
        type="text"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={bannerObj.pageUrl}
        onChange={handleInputChange}
    />
    </FormControl>
    <FormControl>
    <TextField
        id="buttonText"
        label="Button Text"
        type="text"
        name='buttonText'
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={bannerObj.buttonText}
        onChange={handleInputChange}
    />
    </FormControl>
    <FormControl>
    {/* it will be a select field */}
    <Select
        id="status"
        label="Status"
        variant="outlined"
        margin="normal"
        name='status'
        fullWidth
        required
        value={bannerObj.status}
        onChange={handleInputChange}
    >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
    </Select>

    </FormControl>
    <br /> <br />
    <FormControl>
    <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
    >
        Add Banner
    </Button>
    </FormControl>


        </Box>
      </Modal>
    </div>
  );
}
