import Reducer from "./reducer";
import { legacy_createStore as createStore } from "redux";
const store = createStore(Reducer)
export default store