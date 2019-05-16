import { combineReducers } from 'redux'
import profile from './profile'
import activity from './activity'
import meal from './meal'
import sleep from './sleep'
import mindfulness from './mindfulness'

export default combineReducers({
    profile,
    activity,
    meal,
    sleep,
    mindfulness
})