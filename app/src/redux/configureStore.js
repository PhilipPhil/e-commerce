import {createStore, combineReducers} from 'redux';
import { Deals } from './deals'
import { Reviews } from './reviews'
import { Users } from './users'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            deals: Deals,
            reviews: Reviews,
            users: Users
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}