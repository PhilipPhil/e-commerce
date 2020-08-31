import * as ActionTypes from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';

export const addReview = (review) => ({
  type: ActionTypes.REVIEW_ADD,
  payload: review
});

export const postReview = (dealId, rating, comment) => (dispatch) => {
  const newReview = {
    deal: dealId,
    rating: rating,
    comment: comment
  }

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'reviews', {
    method: 'post',
    body: JSON.stringify(newReview),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: 'same-origin'
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(response => dispatch(addReview(response)))
    .catch(error => console.log('Post comments', error.message))
}

export const fetchDeals = () => (dispatch) => {
  dispatch(dealsLoading());
  return fetch(baseUrl + 'deals')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(deals => dispatch(addDeals(deals)))
    .catch(error => dispatch(dealsFailed(error.message)));
}

export const dealsLoading = () => ({
  type: ActionTypes.DEALS_LOADING
})

export const dealsFailed = (errmess) => ({
  type: ActionTypes.DEALS_FAILED,
  payload: errmess
})

export const addDeals = (deals) => ({
  type: ActionTypes.DEALS_ADD,
  payload: deals
})

export const fetchReviews = () => (dispatch) => {
  dispatch(reviewsLoading());
  return fetch(baseUrl + 'reviews')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(reviews => dispatch(addReviews(reviews)))
    .catch(error => dispatch(reviewsFailed(error.message)));
}

export const reviewsLoading = () => ({
  type: ActionTypes.REVIEWS_LOADING
})

export const reviewsFailed = (errmess) => ({
  type: ActionTypes.REVIEWS_FAILED,
  payload: errmess
})

export const addReviews = (reviews) => ({
  type: ActionTypes.REVIEWS_ADD,
  payload: reviews
})

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds
  }
}

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token
  }
}

export const loginError = (message) => {
  alert("Login Failed")
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message
  }
}

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds))

  return fetch(baseUrl + 'users/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('creds', JSON.stringify(creds));
        // Dispatch the success action
        // dispatch(fetchFavorites());
        dispatch(receiveLogin(response));
      }
      else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  // dispatch(favoritesFailed("Error 401: Unauthorized"));
  dispatch(receiveLogout())
}

export const registerUser = (user) => (dispatch) => {
  return fetch(baseUrl + 'users/signup', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('User', response); alert("Registered successfully"); dispatch(loginUser(user)); })
    .catch(error => { console.log('User', error.message); alert("Registration failed")});
};

export const postFavorite = (dealId) => (dispatch) => {

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites/' + dealId, {
      method: "POST",
      body: JSON.stringify({"_id": dealId}),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
  .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (dealId) => (dispatch) => {

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites/' + dealId, {
      method: "DELETE",
      headers: {
        'Authorization': bearer
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
  .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
  dispatch(favoritesLoading(true));

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites', {
      headers: {
          'Authorization': bearer
      },
  })
  .then(response => {
      if (response.ok) {
          return response;
      }
      else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
      }
  },
  error => {
      var errmess = new Error(error.message);
      throw errmess;
  })
  .then(response => response.json())
  .then(favorites => dispatch(addFavorites(favorites)))
  .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
  type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
  type: ActionTypes.FAVORITES_FAILED,
  payload: errmess
});

export const addFavorites = (favorites) => ({
  type: ActionTypes.FAVORITES_ADD,
  payload: favorites
});