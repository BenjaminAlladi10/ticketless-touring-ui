import {configureStore} from "@reduxjs/toolkit";
import { cartReducer } from "@/store/cartSlice";
import { monumentsReducer } from "@/store/monumentsSlice";

const appStore= configureStore({
    reducer:{
        "cart": cartReducer,
        "monuments": monumentsReducer
    }
});

export default appStore;