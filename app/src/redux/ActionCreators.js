import * as ActionTypes from './ActionTypes';

export const addReview = (dealId, rating, comment, user) => ({
    type: ActionTypes.ADD_REVIEW,
    payload: {
        dealId: dealId,
        rating: rating,
        comment: comment,
        user: user
    }
});