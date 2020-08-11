import { DEALS } from '../shared/deals';
import { USERS } from '../shared/users';
import { REVIEWS } from '../shared/reviews';

export const initialState = {
    users: USERS,
    deals: DEALS,
    reviews: REVIEWS
}

export const Reducer = (state = initialState, action) => {
    return state;
}