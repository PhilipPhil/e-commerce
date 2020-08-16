import * as ActionTypes from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';

export const addReview = (dealId, rating, comment, user) => ({
    type: ActionTypes.REVIEW_ADD,
    payload: {
        dealId: dealId,
        rating: rating,
        comment: comment,
        user: user
    }
});


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