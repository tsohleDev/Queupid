import { configureStore  } from "@reduxjs/toolkit";
import menuToogleReducer from "./menutoogle/menutoogle";
import userReducer from "./user/user";

const store = configureStore({
    reducer: {
        menuToogle: menuToogleReducer,
        // signUp: signUpReducer,
        user: userReducer
    }
});

export default store;