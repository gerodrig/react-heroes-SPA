import { types } from '../types/types';

const state = {
    name: 'Gerardo',
    isAuthenticated: true,
}

export const authReducer = (state = {}, action) => {

    switch (action.type) {

        case types.login:
            return {
                ...action.payload,
                isAuthenticated: true
            }
        case types.logout:
            return {
                isAuthenticated: false
            }

        default:
            return state;
    }
}