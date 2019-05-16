import { GET_PROFILE, SAVE_PROFILE } from '../actions/profile'

export default function profile (state={}, action) {
    switch(action.type) {
        case GET_PROFILE:
            return {
                ...state,
                ...action.profile
            }
        case SAVE_PROFILE:
            return {
                ...state,
                ...action.profile
            }
        default:
            return state
    }
}