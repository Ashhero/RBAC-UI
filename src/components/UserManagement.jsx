import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import RoleDialog from './RoleDialog';
import { fetchUsers, addUser } from '../services/mockApi';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers().then(setUsers); // Load users on component mount
  }, []);

  const handleAdd = () => {
    setSelectedUser(null); // Open dialog with no user selected
    setDialogOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Open dialog with selected user
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    alert(`User with ID: ${id} deleted.`);
  };

  const handleSave = async (user) => {
    const updatedUsers = user.id
      ? users.map((u) => (u.id === user.id ? user : u)) // Update existing user
      : [...users, { ...user, id: users.length + 1 }]; // Add new user

    setUsers(updatedUsers); // Update state with the modified users list
    if (!user.id) await addUser(user); // Persist new user if it's a new entry
    setDialogOpen(false); // Close dialog
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => {
        const { row } = params;

        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleEdit(row)}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ marginLeft: 30,marginTop:20}}>
      <div style={{ marginBottom: 16 ,marginTop:20}}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add User
        </Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={users} columns={columns} pageSize={5} checkboxSelection sx={{width:"95%"}} />
      </div>
      {dialogOpen && (
        <RoleDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          user={selectedUser}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default UserManagement;
