import { createSlice } from "@reduxjs/toolkit"

const productsSlice = createSlice({
    name: "productsSlice",
    initialState: {
        products: [
            { id: 1, name: "Luxury Pet Bet", price: 120, rating: 5, imageSrc: "images/products/product-01.png", isHide: false, category: "Furniture", for: "cats" },
            { id: 2, name: "Cat Food", price: 20, rating: 4, imageSrc: "images/products/product-02.png", isHide: false, category: "Food & Treats", for: "cats" },
            { id: 3, name: "Dog Food", price: 30, rating: 5, imageSrc: "images/products/product-03.png", isHide: false, category: "Food & Treats", for: "dogs" },
            { id: 4, name: "Treat For Dog", price: 60, rating: 3, imageSrc: "images/products/product-04.png", isHide: false, category: "Food & Treats", for: "dogs" },
            { id: 5, name: "Scratching Toy For Cat", price: 200, rating: 5, imageSrc: "images/products/product-05.png", isHide: false, category: "Toys", for: "cats" },
            { id: 6, name: "Teddy Bear For Dog", price: 80, rating: 4, imageSrc: "images/products/product-06.png", isHide: false, category: "Toys", for: "dogs" },
            { id: 7, name: "Treats Knot Bone", price: 8, rating: 3, imageSrc: "images/products/product-07.png", isHide: false, category: "Food & Treats", for: "dogs" },
            { id: 8, name: "Dog Bowls", price: 70, rating: 5, imageSrc: "images/products/product-08.png", isHide: false, category: "Furniture", for: "dogs" },
            { id: 9, name: "Hooded Plush Pup", price: 15, rating: 4, imageSrc: "images/products/product-09.png", isHide: true, category: "Toys", for: "dogs" },
            { id: 10, name: "Cuddly Teddy", price: 10, rating: 5, imageSrc: "images/products/product-10.png", isHide: true, category: "Toys", for: "dogs" },
        
            { id: 11, name: "Cuddly Teddy", price: 195, rating: 4, imageSrc: "images/products/product-11.png", isHide: true, category: "Furniture", for: "dogs" },
            { id: 12, name: "Cuddly Teddy", price: 30, rating: 5, imageSrc: "images/products/product-12.png", isHide: true, category: "Furniture", for: "cats" },
        ],
        cartItems: [],
    },
    reducers: {
        addCartItem: (state, action) => {
            const index = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.cartItems[index].quantity += 1
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 })
            }
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
        },
        decreaseCartItem: (state, action) => {
            const index = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.cartItems[index].quantity -= 1
            }
        },
        changeItemQuantity: (state, action) => {
            const index = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.cartItems[index].quantity = action.payload.newProductQuantity
            }
        },
    },
})

export const { addCartItem, removeCartItem, decreaseCartItem, changeItemQuantity } = productsSlice.actions

export default productsSlice.reducer
