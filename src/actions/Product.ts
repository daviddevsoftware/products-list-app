// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Interface's
export interface ProductData {
    id: string,
    createdAt: string,
    product: string,
    points: number, 
    image: string,
    is_redemption : boolean,
}

interface ProductState {
  products: ProductData[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Slice
const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
        state.products = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Actions
export const { setProducts, setLoading, setError } = ProductSlice.actions;

// Export
export default ProductSlice.reducer;
