import { REVIEWS } from '../shared/reviews';
import * as ActionTypes from './ActionTypes'

export const Reviews = (state = {
    isLoading: true,
    errMess: null,
    reviews: []
}, action) => {
    switch (action.type) {
        case ActionTypes.REVIEW_ADD:
            var review = action.payload
            review.id = state.length
            review.date = new Date().toISOString();
            return { ...state, reviews: state.reviews.concat(review)}
        case ActionTypes.REVIEWS_ADD:
            return { ...state, isLoading: false, errMess: null, reviews: action.payload }
        case ActionTypes.REVIEWS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, reviews: [] }
        case ActionTypes.REVIEWS_LOADING:
            return { ...state, isLoading: true, errMess: null, reviews: [] }
        default:
            return state;
    }
};