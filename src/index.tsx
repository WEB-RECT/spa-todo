import isTouchDevice from "is-touch-device";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const options = {
    enableMouseEvents: true,
};
const isMobile = isTouchDevice();

root.render(
    <Provider store={store}>
        <DndProvider
            backend={isMobile ? TouchBackend : HTML5Backend}
            options={isMobile ? options : {}}
        >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </DndProvider>
    </Provider>,
);
