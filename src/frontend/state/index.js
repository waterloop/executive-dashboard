import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

const state = createStore(reducer, composeWithDevTools());

export default state;
