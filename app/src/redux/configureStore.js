import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Deals } from './deals'
import { Reviews } from './reviews'
import { Users } from './users'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            deals: Deals,
            reviews: Reviews,
            users: Users
        }),
        composeEnhancers(applyMiddleware(thunk,logger))
    );

    return store;
}