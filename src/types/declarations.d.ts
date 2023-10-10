import { compose } from "redux";
import store from "../redux/store";

declare module "*.scss";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        store?: typeof store;
    }
}
