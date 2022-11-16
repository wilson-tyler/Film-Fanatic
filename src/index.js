import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import styles from './App.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const appElement = document.getElementById('app');

render(<App />, appElement);