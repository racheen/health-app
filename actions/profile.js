export const GET_PROFILE = 'GET_PROFILE'
export const SAVE_PROFILE = 'SAVE_PROFILE'

export function getProfile (profile) {
    return {
        type: GET_PROFILE,
        profile
    }
}

export function saveProfile (profile) {
    return {
        type: SAVE_PROFILE,
        profile
    }
}