import { REVIEWS } from '../shared/reviews';
import * as ActionTypes from './ActionTypes'

export const Reviews = (state = REVIEWS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REVIEW:
            var review = action.payload
            review.dealId = state.length
            review.date = new Date().toISOString
            return state.concat(review)
        default:
          return state;
      }
};