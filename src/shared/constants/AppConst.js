export const authRole = {
  admin: ['admin'],
  user: ['user', 'admin'],
  report: ['report'],
};
export const defaultUser = {
  displayName: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: 'user',
  photoURL: 'https://via.placeholder.com/150',
};
export const initialUrl = '/dashboards/survey'; // this url will open after login
