import { useState, React } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';


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

export default function AddBanner() {
  const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
  const [bannerObj, setBannerObj] = useState({
    type: '',
    sortValue: 0,
    pageUrl: '/',
    buttonText: '',
    status: 'inactive'
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
// wants to show the selected image
    const handleFileChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    };
    const handleInputChange = (e) => {
        setBannerObj({ ...bannerObj, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bannerObj);
    }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
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
          {/* imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'home'
    },
    sortValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    pageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '/'
    },
    buttonText:{
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'inactive'
    }, */}
    {/* create form for the above fields */}
    <FormControl>
    {/* change to file upload and show the selected file here */}
    <input type="file" onChange={handleFileChange} />
    {file && <img src={file} alt="banner" style={{ width: '100px' }} />}

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
