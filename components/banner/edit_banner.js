import { useState, React, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { editBanner } from 'features/banner/bannerSlice';

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

export default function EditBanner({ open, setOpen }) {
  const dispatch = useDispatch();
  const { banner } = useSelector((state) => state.banner);

  const [file, setFile] = useState(null);
  const [bannerObj, setBannerObj] = useState({
    type: 'home',
    sortValue: 0,
    pageUrl: '/',
    buttonText: '',
    status: 'inactive',
  });

  useEffect(() => {
    if (banner) {
      setBannerObj(banner);
    }
  }, [banner]);

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

    const formData = new FormData()
    for (const key in bannerObj) {
      formData.append(key, bannerObj[key])
    }
    const imageFile = document.querySelector('input[type="file"]').files[0];
    formData.set('image', imageFile);
    if (imageFile) {
      formData.set('image', imageFile);
  } else {
      
  }
    dispatch(editBanner(formData));
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Banner
          </Typography>

          <FormControl>
            <input type="file" onChange={handleFileChange} />
            {/* Display existing banner image if available */}
            {bannerObj.image && (
              <img
                src={bannerObj.imageUrl}
                alt="banner"
                style={{ width: '100px' }}
              />
            )}
            {/* Display selected file if available */}
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="banner"
                style={{ width: '100px' }}
              />
            )}
          </FormControl>
          <FormControl>
            <TextField
              id="type"
              label="Type"
              name="type"
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
              name="sortValue"
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
              name="pageUrl"
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
              name="buttonText"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={bannerObj.buttonText}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            {/* Select field for status */}
            <Select
              id="status"
              label="Status"
              variant="outlined"
              margin="normal"
              name="status"
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
              Update Banner
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
