import { configureStore  } from "@reduxjs/toolkit";
import menuToogleReducer from "./menutoogle/menutoogle";
import userReducer from "./user/user";
import signUpReducer from "./authenticate/authenticate.js";
import optionsReducer from "./queueOption/options";

const store = configureStore({
    reducer: {
        menuToogle: menuToogleReducer,
        signUp: signUpReducer,
        user: userReducer,
        options: optionsReducer
    }
});

export default store;