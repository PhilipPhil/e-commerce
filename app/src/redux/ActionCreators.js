import * as ActionTypes from './ActionTypes';

import { DEALS } from '../shared/deals';

export const addReview = (dealId, rating, comment, user) => ({
    type: ActionTypes.ADD_REVIEW,
    payload: {
        dealId: dealId,
        rating: rating,
        comment: comment,
        user: user
    }
});


export const fetchDeals = () => (dispatch) => {
    dispatch(dealsLoading(true));
    setTimeout(() => {
        dispatch(addDeals(DEALS))
    }, 2000)
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