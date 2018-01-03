import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import { AppCurrentState, CurrentLocation, Places, CurrentUser } from './reducers';

const rootReducer = combineReducers({
    AppCurrentState,
    CurrentLocation,
    Places,
    CurrentUser
});

export default Store = createStore(rootReducer, undefined, compose(applyMiddleware(thunk), autoRehydrate()));
