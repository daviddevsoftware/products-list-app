import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '@src/actions/Product';

// Store
const store = configureStore({
    reducer: {
        product: ProductReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;