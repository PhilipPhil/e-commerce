import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Deals } from './deals'
import { Reviews } from './reviews'
import { Auth } from './auth';
import { Favorites } from './favorites';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialEmailForm } from './forms';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            deals: Deals,
            reviews: Reviews,
            auth: Auth,
            favorites: Favorites,
            ...createForms({
                emailform: InitialEmailForm
            })
        }),
        composeEnhancers(applyMiddleware(thunk,logger))
    );

    return store;
}