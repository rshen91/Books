import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
    position: 'top center',
    timeout: 3000,
    offset: '30px',
    transition: 'scale'
  }

ReactDOM.render(
<AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</AlertProvider>, document.getElementById('root'));
registerServiceWorker();
