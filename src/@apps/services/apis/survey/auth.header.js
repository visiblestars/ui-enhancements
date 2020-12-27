export default function authHeader() {
  const user = JSON.parse(sessionStorage.getItem('currentUser'));

  if (user && user.accessToken) {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.accessToken,
    }; // for Spring Boot back-end
  } else {
    return {};
  }
}
