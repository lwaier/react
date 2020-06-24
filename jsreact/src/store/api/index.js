import {combineReducers} from 'redux';
import work from './work';
import learn from './learn';

const reducer = combineReducers({
    
    work,
    learn,
    // sleep,
});
export default reducer