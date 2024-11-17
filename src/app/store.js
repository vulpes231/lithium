import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "../features/coinSlice";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";
import userReducer from "../features/userSlice";
import walletReducer from "../features/walletSlice";
import trnxReducer from "../features/trnxSlice";
import alertReducer from "../features/alertSlice";

const store = configureStore({
  reducer: {
    coin: coinReducer,
    login: loginReducer,
    register: registerReducer,
    user: userReducer,
    wallet: walletReducer,
    trnx: trnxReducer,
    alert: alertReducer,
  },
});

export default store;
