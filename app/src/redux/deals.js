import * as ActionTypes from './ActionTypes'

export const Deals = (state = {
    isLoading: true,
    errMess: null,
    deals: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEAL:
            return { ...state, isLoading: false, errMess: null, deals: action.payload }
        case ActionTypes.DEAL_LOADING:
            return { ...state, isLoading: true, errMess: null, deals: [] }
        case ActionTypes.DEAL_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, deals: [] }

        default:
            return state;
    }
};