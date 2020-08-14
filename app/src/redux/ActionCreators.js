import * as ActionTypes from './ActionTypes';

import { DEALS } from '../shared/deals';
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
    dispatch(dealsLoading(true));
    return fetch(baseUrl + 'deals')
        .then(response => response.json())
        .then(deals => dispatch(addDeals(deals)))
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


//  export const fetchReviews = () => (dispatch) => {
//     dispatch(dealsLoading(true));
//     return fetch(baseURL + 'reviews')
//         .then(response => response.json())
//         .then(reviews => dispatch(addReviews(reviews)))
// }