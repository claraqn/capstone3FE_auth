import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  getAll,
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return (
    fetch(`http://localhost:4000/users/authenticate`, requestOptions)
      //`${config.apiUrl}/users/authenticate`, requestOptions
      .then(handleResponse)
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));

        return user;
      })
  );
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`http://localhost:4000/users`, requestOptions).then(
    handleResponse
  );
  //`${config.apiUrl}/users`, requestOptions
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

// function isUserLoggedIn() {
//   //let user = sessionStorage.getItem('authenticatedUser')
//   const token = localStorage.getItem('token');
//   console.log('===UserloggedInCheck===');
//   console.log(token);

//   if (token) {
//     return true;
//   }
//   //if(user===null) return false
//   return false;
// }
