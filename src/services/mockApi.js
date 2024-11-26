
const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor' },
  { id: 3, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Viewer' },
];

const roles = [
  { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
  { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
  { id: 2, name: 'Viewer', permissions: ['Read','Write'] },
];



export const fetchUsers = () => Promise.resolve(users);
export const fetchRoles = () => Promise.resolve(roles);
export const addUser = (user) => Promise.resolve([...users, user]);
export const addRole = (role) => Promise.resolve([...roles, role]);
