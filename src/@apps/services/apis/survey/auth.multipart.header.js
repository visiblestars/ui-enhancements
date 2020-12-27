export default function authMultipartHeader() {
  const user = JSON.parse(sessionStorage.getItem('currentUser'));

  if (user && user.accessToken) {
    return {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + user.accessToken,
    }; // for Spring Boot back-end
  } else {
    return {'Content-Type': 'multipart/form-data'};
  }
}
