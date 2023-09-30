import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './styles/index.scss'
import { Provider } from 'react-redux'
import store from './redux/store'
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";
import {DndProvider} from "react-dnd";
import isTouchDevice from "is-touch-device";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const options = {
    enableMouseEvents: true
}
const isMobile = isTouchDevice()

root.render(
    <Provider store={store}>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend} options={isMobile ? options : {}}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </DndProvider>
    </Provider>
);

