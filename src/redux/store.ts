import { createStore, compose } from "redux";
import rootReducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// получаем стор из localStorage
const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState') as string)
    : {}

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(),
)

// записываем стор в localStorage
store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

window.store = store;

export default store;

export type RootState = ReturnType<typeof store.getState>