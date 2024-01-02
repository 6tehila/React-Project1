import {createStore, applyMiddleware} from "redux"
import Reducer from "./reducer"
// import thunk from "react-thunk"


const store = createStore(Reducer);
export default store;