import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

function RoleDialog({ open, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  });
const [newUser,setnewUser]=useState({})
  useEffect(() => {
    if (user) {
      setFormData(user); // Populate the dialog fields with the selected user data
    }
  }, [user]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData); // Pass the updated user data back to the parent
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          value={formData.name}
          onChange={handleChange('name')}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={formData.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Role"
          value={formData.role}
          onChange={handleChange('role')}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoleDialog;
