import { combineReducers } from "redux";
import bookTickets from "./reducerFunction";

const rootReducer = combineReducers({
    bookTicket: bookTickets
});

export default rootReducer;
