import React, {Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getStore } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from 'react-i18next';
import i18next from './translation/i18n';


ReactDOM.render((
        <Provider store={getStore()}>
            <Router>
                <Suspense fallback={<h2>Timer is loading...</h2>}>
                    <I18nextProvider i18n={i18next}>
                        <App i18n={i18next}/>
                    </I18nextProvider>
                </Suspense>
            </Router>
        </Provider>
    ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
