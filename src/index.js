import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

import CardsApp from './components/CardsApp.jsx';

ReactDOM.render(
        <CardsApp />
    , document.getElementById('root'));
registerServiceWorker();
