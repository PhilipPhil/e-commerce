import { REVIEWS } from '../shared/reviews';
import * as ActionTypes from './ActionTypes'

export const Reviews = (state = REVIEWS, action) => {
    switch (action.type) {
        case ActionTypes.REVIEW_ADD:
            var review = action.payload
            review.id = state.length
            review.date = new Date().toISOString();
            return state.concat(review)
        default:
          return state;
      }
};