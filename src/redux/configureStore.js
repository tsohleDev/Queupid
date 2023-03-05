import { configureStore  } from "@reduxjs/toolkit";
import menuToogleReducer from "./menutoogle/menutoogle";
import queueReducer from "./queue/queue";
import authReducer from "./authenticate/authenticate.js";
import optionsReducer from "./queueOption/options";

const store = configureStore({
    reducer: {
        menuToogle: menuToogleReducer,
        auth0: authReducer,
        options: optionsReducer,
        queue: queueReducer
    }
});

export default store;