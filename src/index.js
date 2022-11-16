import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import styles from './App.scss';

const appElement = document.getElementById('app');

render(<App />, appElement);