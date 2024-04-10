import { createStore } from 'redux';
import rootReducer from './combineReducer';

const store = createStore(rootReducer);

export default store;