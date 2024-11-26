import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import RoleDialog from './RoleDialog';
import { fetchUsers, addUser } from '../services/mockApi';

function RoleManagement() {
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleSave = async (user) => {
    let updatedUsers;

    if (user.id) {
      // Update the existing user
      updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    } else {
      // Add new user
      const newUser = { ...user, id: users.length + 1 };
      updatedUsers = [...users, newUser];
      await addUser(newUser); // Simulate API call
    }

    setUsers(updatedUsers); // Update state with modified users list
    setDialogOpen(false); // Close dialog
    setSelectedUser(null); // Reset selected user
  };

  const handleAdd = () => {
    setSelectedUser(null); // Open dialog with no user selected
    setDialogOpen(true); // Open dialog
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Set selected user for editing
    setDialogOpen(true); // Open dialog
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Role Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginBottom: '1rem' }}>
        Add User
      </Button>

      {/* Render user list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <div>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2">{user.email}</Typography>
              <Typography variant="body2">{`Role: ${user.role}`}</Typography>
            </div>
            <div>
              <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* RoleDialog for adding/editing users */}
      {dialogOpen && (
        <RoleDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          user={selectedUser} // Pass the selected user (or null for new)
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default RoleManagement;
