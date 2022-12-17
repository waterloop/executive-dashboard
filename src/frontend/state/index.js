import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const state = configureStore({reducer, devTools: process.env.NODE_ENV !== 'production'});

export default state;
